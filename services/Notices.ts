import{NoticeCollection}from "@/lib/firebase"
import { Notice } from "@/types/allTypes";
import { DocumentData, Query, getDocs } from "firebase/firestore";

export async function index(query?: Query): Promise<Notice[]> {
  let querySnapshot = null;

  if (query) {
    querySnapshot = await getDocs(query);
  } else {
    querySnapshot = await getDocs(NoticeCollection);
  }

  const localPosts = querySnapshot.docs.map((doc: DocumentData) => {
    return { ...doc.data(), id: doc.id };
  });

  return localPosts as Notice[];
}