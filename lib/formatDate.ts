import { format } from "date-fns";

// Convert Firestore Timestamp to formatted string
export const formatDate = (timestamp: any) => {
  const date = timestamp.toDate(); // Firestore Timestamp → JS Date
  return format(date, "dd MMM yyyy, hh:mm a"); // e.g. 17 Oct 2025, 07:30 AM
};
