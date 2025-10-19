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
import { Timestamp } from "firebase/firestore";

type FirestoreDateValue = Timestamp | Date | string | null | undefined;

export const formatDate = (
  value: FirestoreDateValue,
  fmt: string = "dd MMM yyyy, hh:mm a"
): string => {
  if (!value) return "Unknown date";

  let date: Date;

  if (value instanceof Timestamp) {
    date = value.toDate();
  } else if (value instanceof Date) {
    date = value;
  } else {
    date = new Date(value);
  }

  if (isNaN(date.getTime())) return "Invalid date";

  return format(date, fmt);
};

