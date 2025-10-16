import { firebaseAdmin } from "@/lib/firebase.admin";

import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { uid, role } = await req.json();
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized: No session" }),
        { status: 401 }
      );
    }

    // 🔹 Firebase Admin দিয়ে session verify করুন
    const decodedClaims = await firebaseAdmin
      .auth()
      .verifyIdToken(session, true);

    // 🔹 শুধু admin role আছে কিনা চেক করুন
    if (!decodedClaims.admin) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized: Only admin can update roles",
        }),
        { status: 403 }
      );
    }

    if (!uid || !role) {
      return Response.json(
        { success: false, error: "Missing uid or role" },
        { status: 400 }
      );
    }

    const claims: Record<string, boolean> = {};

    if (role === "moderator") {
      claims.moderator = true;
    } else if (role === "admin") {
      claims.admin = true;
    } else {
      return Response.json(
        { success: false, error: "Invalid role" },
        { status: 400 }
      );
    }

    // ✅ Set custom user claims
    await firebaseAdmin.auth().setCustomUserClaims(uid, claims);
    // 2️⃣ Update Firestore user document
    await firebaseAdmin.firestore().doc(`users/${uid}`).update({ role });

    return Response.json({
      success: true,
      message: `Role '${role}' updated successfully in both Auth and Firestore!`,
    });
  } catch (error) {
    console.error("❌ Error setting custom claim:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);

    return Response.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
