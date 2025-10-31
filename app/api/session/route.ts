import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps, cert } from "firebase-admin/app";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
  // 5 days in milliseconds
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
     // Create long-lived session cookie
    const sessionCookie = await getAuth().createSessionCookie(token, { expiresIn });


    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error setting session:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
