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

// You can define a union type for possible Firestore/JS date inputs
type FirestoreTimestampLike =
  | Date
  | string
  | {
      toDate?: () => Date;
      _seconds?: number;
      _nanoseconds?: number;
    };

export const formatDate = (
  value: FirestoreTimestampLike,
  fmt: string = "dd MMM yyyy, hh:mm a"
): string => {
  if (!value) return "Unknown date";

  let date: Date;

  // Firestore Timestamp object
  if (typeof (value as any).toDate === "function") {
    date = (value as any).toDate();
  }
  // Raw Firestore JSON (_seconds + _nanoseconds)
  else if (
    (value as any)._seconds !== undefined &&
    (value as any)._nanoseconds !== undefined
  ) {
    const v = value as { _seconds: number; _nanoseconds: number };
    date = new Date(v._seconds * 1000 + v._nanoseconds / 1_000_000);
  }
  // JS Date or string
  else {
    date = new Date(value as string | number | Date);
  }

  // Check valid date
  if (isNaN(date.getTime())) return "Invalid date";

  return format(date, fmt);
};
