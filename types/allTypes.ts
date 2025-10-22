import { Timestamp } from "firebase/firestore";

export interface Notice {
  id: string;    // Firestore document ID
  title: string; // Post title
  text: string;            
  authorId?: string;          
  createdAt: Timestamp; // Firestore timestamp
  updatedAt?: Timestamp; // Optional updated time
  isPublished?: boolean;   // Status flag
}
// types/user.ts

export interface User {
  uid: string;                // Unique Firebase Auth user ID
  name: string;               // Full name of the user
  email: string;              // Email address
  phone: string;              // Contact number
  fbLink: string;             // Facebook profile link
  gender: "Male" | "Female"; // Gender (restricted values)
  batch: string;              // e.g., "18th"
  selectedLocation: string;   // e.g., "Faridpur"
  role: "user" | "admin" | "moderator";     // Role type
  dob: Timestamp; // Date of birth (Firestore timestamp → JS Date)
}

export interface Pdf { 
  id:string;            // Firestore document ID
  name: string;          // Name/title of the PDF
  link: string;          // Google Drive or file link
  year: string;          // e.g., "1st Year"
  createdAt: Timestamp;  // Firestore timestamp
}

export interface ExamDate {
  id: string;
  name: string;
  date:Timestamp;
  showCountdown: boolean;
  createdAt: Timestamp;
}

export interface ExamTable {
  id: string;
  examName: string;
  isCompleted: boolean;
  exams: {
    course: string;
    date: string;
    time: string;
  }[];
  createdAt: Timestamp;
}