"use server";

import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/firebase.admin";

interface ImageDoc {
  heading: string;
  timestamp: Timestamp;
  url: string;
  publicId: string;
  createdAt: Timestamp;
}

// ✅ Upload image and save to Firestore
export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  const heading = formData.get("heading")?.toString() || "Untitled";
  const timeStamp = formData.get("uploadDate")

  if (!file) return { success: false, message: "No file found" };
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Cloudinary in "eventsPhotos" folder
  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "eventsPhotos" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  // Save in Firestore
  const docData: ImageDoc = {
    heading,
    timestamp: Timestamp.fromDate(new Date()), // you can customize
    url: result.secure_url,
    publicId: result.public_id,
    createdAt: Timestamp.fromDate(new Date()),
  };

  await db.collection("images").add(docData);

  revalidatePath("/dashboard/upload-photos");
  revalidatePath("/photos");
  return { success: true, message:"photo Upload successfully!" };
}

// ✅ Delete image (both Cloudinary + Firestore)
export async function deleteImage(publicId: string) {
  // Delete from Cloudinary
  await cloudinary.uploader.destroy(publicId);
  // Delete Firestore doc
  const snap = await db.collection("images").where("publicId", "==", publicId).get();
  snap.forEach((doc) => doc.ref.delete());

  revalidatePath("/dashboard/upload-photos");
  revalidatePath("/photos");
  return { success: true };
}

// ✅ Update image (replace + Firestore update)
export async function updateImage(publicId: string, formData: FormData) {
  // Upload new image
  const newUpload = await uploadImage(formData);

  // Delete old one
  await deleteImage(publicId);

  return newUpload;
}
