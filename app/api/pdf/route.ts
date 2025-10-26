import { db } from "@/lib/firebase.admin";
import { getAuth } from "firebase-admin/auth";
import { google } from "googleapis";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Readable } from "stream";

// OAuth2 Client using refresh token
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oauth2Client });

// Disable default body parser
export const config = {
  api: { bodyParser: false },
};

// POST method
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: No session" },
      { status: 401 }
    );
  }

  // 🔹 Firebase Admin দিয়ে session verify করুন
  const decodedClaims = await getAuth().verifySessionCookie(session, true);

  // 🔹 শুধু admin role আছে কিনা চেক করুন
  if (!decodedClaims.admin && !decodedClaims.moderator) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Only admin/moderator" },
      { status: 403 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("name")?.toString() || "Qustions.pdf";
    const year = formData.get("year")?.toString() || "1st Year";
    const addedBy = formData.get("addedBy")?.toString() || "Admin";

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const driveRes = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: process.env.GOOGLE_DRIVE_FOLDER_ID
          ? [process.env.GOOGLE_DRIVE_FOLDER_ID]
          : undefined,
        mimeType: "application/pdf",
      },
      media: {
        mimeType: "application/pdf",
        body: stream,
      },
      fields: "id, webViewLink",
    });

    const fileId = driveRes.data.id;
    if (!fileId) {
      return NextResponse.json(
        { error: "Failed to get Drive file ID" },
        { status: 500 }
      );
    }

    await drive.permissions.create({
      fileId,
      requestBody: { role: "reader", type: "anyone" },
    });

    // Save to Firestore
    const docRef = await db.collection("pdfs").add({
      name: fileName,
      driveId: driveRes.data.id,
      year,
      addedBy: addedBy,
      link: driveRes.data.webViewLink,
      createdAt: new Date(),
    });

    revalidatePath("/qustions");

    return NextResponse.json({
      success: true,
      id: docRef.id,
      name: fileName,
      link: driveRes.data.webViewLink,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: No session" },
      { status: 401 }
    );
  }

  // 🔹 Firebase Admin দিয়ে session verify করুন
  const decodedClaims = await getAuth().verifySessionCookie(session, true);

  // 🔹 শুধু admin role আছে কিনা চেক করুন
  if (!decodedClaims.admin && !decodedClaims.moderator) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Only admin/moderator" },
      { status: 403 }
    );
  }

  try {
    const { id } = await req.json(); // Firestore document ID
    if (!id)
      return NextResponse.json(
        { error: "No document ID provided" },
        { status: 400 }
      );

    // Get document from Firestore
    const docSnap = await db.collection("pdfs").doc(id).get();
    if (!docSnap.exists)
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );

    const data = docSnap.data();
    if (!data?.driveId)
      return NextResponse.json(
        { error: "No Drive ID found for this file" },
        { status: 400 }
      );

    // Delete from Google Drive
    await drive.files.delete({ fileId: data.driveId });

    // Delete from Firestore
    await db.collection("pdfs").doc(id).delete();

    revalidatePath("/qustions");
    return NextResponse.json({
      success: true,
      message: "File deleted from Drive and Firestore",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Delete failed", details: err },
      { status: 500 }
    );
  }
}


