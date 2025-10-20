import { db } from "@/lib/firebase.admin";
import { Timestamp } from "firebase/firestore";

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
