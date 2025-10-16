import { firebaseAdmin } from "@/lib/firebase.admin";


export async function POST(req: Request) {
  try {
    const { uid } = await req.json(); 

    // 🔥 Add custom claim to user's token
  const res = await firebaseAdmin.auth().setCustomUserClaims(uid, { admin: true });

    return Response.json({ success: true, message: "Admin role added successfully!", test: res });
  } catch (error) {
    console.error(error);
    const errorMessage = typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error);
    return Response.json({ success: false, error: errorMessage });
  }
}
