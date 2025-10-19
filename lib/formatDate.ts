// import { format } from "date-fns";

// export const formatDate = (value, fmt: string = "dd MMM yyyy, hh:mm a") => {
//   if (!value) return "Unknown date";

//   let date: Date;

//   // Firestore Timestamp object
//   if (value.toDate && typeof value.toDate === "function") {
//     date = value.toDate();
//   }
//   // Raw Firestore JSON (_seconds + _nanoseconds)
//   else if (value._seconds !== undefined && value._nanoseconds !== undefined) {
//     date = new Date(value._seconds * 1000 + value._nanoseconds / 1000000);
//   }
//   // JS Date or string
//   else {
//     date = new Date(value);
//   }

//   // check valid date
//   if (isNaN(date.getTime())) return "Invalid date";

//   return format(date, fmt);
// };


import { format } from "date-fns";
import type { Timestamp as AdminTimestamp } from "firebase-admin/firestore";

type FirestoreDateValue = AdminTimestamp | Date | string | null | undefined;

export const formatDate = (
  value: FirestoreDateValue,
  fmt: string = "dd MMM yyyy, HH:mm"
): string => {
  if (!value) return "Unknown date";

  let date: Date;

  // Admin SDK Timestamp
  if ((value as AdminTimestamp)?.toDate instanceof Function) {
    date = (value as AdminTimestamp).toDate();
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
