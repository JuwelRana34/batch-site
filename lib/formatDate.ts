// import { format } from "date-fns";
// import type { Timestamp as AdminTimestamp } from "firebase-admin/firestore";
// import type { Timestamp as FirestoreTimestamp } from "firebase/firestore";

// type FirestoreDateValue = AdminTimestamp| FirestoreTimestamp| Date | string | null | undefined;

// export const formatDate = (
//   value: FirestoreDateValue,
//   fmt: string = "dd MMM yyyy"
// ): string => {
//   if (!value) return "Unknown date";

//   let date: Date;

//    // JS SDK Timestamp
//   else if ((value as FirestoreTimestamp)?.toDate instanceof Function) {
//     date = (value as FirestoreTimestamp).toDate();
//   }

//   // JS Date
//   else if (value instanceof Date) {
//     date = value;
//   } 
//   // string
//   else if (typeof value === "string") {
//     date = new Date(value);
//   } 
//   else {
//     // Should never happen, fallback
//     return "Invalid date";
//   }

//   if (isNaN(date.getTime())) return "Invalid date";

//   return format(date, fmt);
// };


import { format } from "date-fns";
import type { Timestamp as AdminTimestamp } from "firebase-admin/firestore";
import type { Timestamp as FirestoreTimestamp } from "firebase/firestore";

type FirestoreDateValue = AdminTimestamp | FirestoreTimestamp | Date | string | null | undefined;

export const formatDate = (
  value: FirestoreDateValue,
  fmt: string = "dd MMM yyyy"
): string => {
  if (!value) return "Unknown date";

  let date: Date;

  // Admin SDK Timestamp
  if ((value as AdminTimestamp)?.toDate instanceof Function) {
    date = (value as AdminTimestamp).toDate();
  } 
  // JS SDK Timestamp
  else if ((value as FirestoreTimestamp)?.toDate instanceof Function) {
    date = (value as FirestoreTimestamp).toDate();
  }
  // JS Date
  else if (value instanceof Date) {
    date = value;
  } 
  // string
  else if (typeof value === "string") {
    date = new Date(value);
  } 
  else {
    // Should never happen, fallback
    return "Invalid date";
  }

  if (isNaN(date.getTime())) return "Invalid date";

  return format(date, fmt);
};
