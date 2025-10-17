import { collection, getDocs } from 'firebase/firestore';
import {db, NoticeCollection}from"@/lib/firebase"


export const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "notices"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
// export const fetchData = async (): Promise<Notice[]> => {
//   const querySnapshot = await getDocs(collection(db, NoticeCollection));
//   return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Notice[];
// };