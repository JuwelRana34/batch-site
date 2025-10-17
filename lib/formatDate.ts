import { format } from "date-fns";

export const formatDate = (value: any, fmt: string = "dd MMM yyyy, hh:mm a") => {
  if (!value) return "Unknown date";

  let date: Date;

  // Firestore Timestamp object
  if (value.toDate && typeof value.toDate === "function") {
    date = value.toDate();
  }
  // Raw Firestore JSON (_seconds + _nanoseconds)
  else if (value._seconds !== undefined && value._nanoseconds !== undefined) {
    date = new Date(value._seconds * 1000 + value._nanoseconds / 1000000);
  }
  // JS Date or string
  else {
    date = new Date(value);
  }

  // check valid date
  if (isNaN(date.getTime())) return "Invalid date";

  return format(date, fmt);
};
