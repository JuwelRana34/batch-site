"use server";

import { db } from "@/lib/firebase.admin";
import { getAuth } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function verifyAdminSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      return { success: false, message: "Unauthorized: No session" };
    }

    // ✅ Verify Firebase session
    const decodedClaims = await getAuth().verifySessionCookie(session, true);

    // ✅ Check admin/moderator role
    if (!decodedClaims.admin && !decodedClaims.moderator) {
      return {
        success: false,
        message: "Unauthorized: Only admin or moderator allowed",
      };
    }

    return { success: true, decodedClaims };
  } catch (err) {
    console.error("Session verification failed:", err);
    return { success: false, message: "Invalid or expired session" };
  }
}

// Generic function to fetch data from any collection
export async function fetchData<T extends { createdAt: Timestamp }>(
  collectionName: string
): Promise<T[]> {
  const snapshot = await db.collection(collectionName).get();
  // Map and sort newest first
  const data: T[] = snapshot.docs
    .map((doc) => {
      const docData = doc.data() as T;
      return {
        id: doc.id,
        ...docData,
      };
    })
    .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()); // newest first

  return data;
}

export async function saveExamDate(examDate: {
  reslut: string;
  name: string;
  date: Date;
  createdAt: Date;
  showCountdown: boolean;
}) {
  if (!examDate.date) throw new Error("Date is required");
  const { success, message } = await verifyAdminSession();
  if (!success) return { success, message };

  try {
    const docRef = db.collection("exams").doc("examDate");

    // setDoc will create if not exists, overwrite if exists
    await docRef.set(examDate);

    // REVIEW: revalidate the path where exam dates are displayed
    revalidatePath("/dashboard/users");
    revalidatePath("/dashboard/add-examDate");
    return { success: true, message: "Exam date saved successfully" };
  } catch (err) {
    console.error("Error saving exam date:", err);
    return { success: false, message: "Failed to save exam date" };
  }
}

export async function DeleteExamDate(id: string) {
  if (!id) throw new Error("id is required");
  const { success, message } = await verifyAdminSession();
  if (!success) return { success, message };

  try {
    await db.collection("exams").doc(id).delete();

    revalidatePath("/dashboard/users");
    revalidatePath("/dashboard/add-examDate");
    return { success: true, message: "Exam date Deleted successfully" };
  } catch (err) {
    console.error("Error Deleting exam date:", err);
    return { success: false, message: "Failed to Delete exam date" };
  }
}

export async function saveExamTable(examDate: {
  examName: string;
  isCompleted: boolean;
  createdAt: Date;
  exams: { course: string; date: string; time: string }[];
}) {
  if (!examDate.examName) throw new Error("examName is required");
  const { success, message } = await verifyAdminSession();
  if (!success) return { success, message };

  try {
    const docRef = db.collection("examTables").doc();

    // setDoc will create if not exists, overwrite if exists
    await docRef.set(examDate);

    // REVIEW: revalidate the path where exam dates are displayed
    revalidatePath("/");
    revalidatePath("/dashboard/add-examTable");
    return { success: true, message: "Exam Name saved successfully" };
  } catch (err) {
    console.error("Error saving exam date:", err);
    return { success: false, message: "Failed to save exam date" };
  }
}

export async function updateExamStatus(examId: string, isActive: boolean) {
  const { success, message } = await verifyAdminSession();
  if (!success) return { success, message };

  try {
    const ref = db.collection("examTables").doc(examId);
    await ref.update({ isCompleted: isActive });
    revalidatePath("/dashboard/add-examTable");
    console.log(`Exam ${examId} updated to: ${isActive}`);
  } catch (error) {
    console.error("Error updating exam status:", error);
    throw new Error("Failed to update exam status");
  }
}

export async function DeleteExamTable(examId: string) {
  if (!examId) throw new Error("id is required");
  const { success, message } = await verifyAdminSession();
  if (!success) return { success, message };

  try {
    await db.collection("examTables").doc(examId).delete();
    revalidatePath("/dashboard/add-examTable");
    revalidatePath("/");

    return { success: true, message: "Exam Table Deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to Delete Exam Table!" };
    throw new Error("Failed to update exam status");
  }
}
