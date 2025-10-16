import { db } from "@/lib/firebase.admin";


export async function GET() {
  try {
    // Try to read one collection from Firestore
    const snapshot = await db.collection("users").get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json({ success: true, users });
  } catch (error) {
    console.error("Firestore test failed:", error);
    const errorMessage = typeof error === "object" && error !== null && "message" in error
      ? (error as { message?: string }).message
      : String(error);
    return Response.json({ success: false, error: errorMessage });
  }
}
