"use server";

import { db, firebaseAdmin } from "@/lib/firebase.admin";
import { ExamDate } from "@/types/allTypes";
import { getAuth } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function fetchData<T extends { createdAt: Timestamp }>(
  collectionName: string
): Promise<T[]> {
  const snapshot = await db.collection(collectionName).get();
  // Map and sort newest first
  const data: T[] = snapshot.docs
    .map((doc) => ({
      ...(doc.data() as T),
    }))
    .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()); // newest first

  return data;
}


export async function saveExamDate(examDate:{date:Date,createdAt:Date,showCountdown:boolean}) {
  if (!examDate.date) throw new Error("Date is required");
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return { success: false, message: "Unauthorized: No session" };
  }

  // 🔹 Firebase Admin দিয়ে session verify করুন
  // const decodedClaims = await firebaseAdmin.auth().verifyIdToken(session, true);
  const decodedClaims = await getAuth().verifySessionCookie(session, true);

  // 🔹 শুধু admin role আছে কিনা চেক করুন
  if (!decodedClaims.admin && !decodedClaims.moderator) {
    return {
      success: false,
      message: "Unauthorized: Only admin can update roles",
    };
  }

  try {
    const docRef = db.collection("exams").doc("examDate");

    // setDoc will create if not exists, overwrite if exists
    await docRef.set(examDate);
    
    // REVIEW: revalidate the path where exam dates are displayed
     revalidatePath("/");
    return { success: true, message: "Exam date saved successfully" };
  } catch (err) {
    console.error("Error saving exam date:", err);
    return { success: false, message: "Failed to save exam date" };
  }
}
