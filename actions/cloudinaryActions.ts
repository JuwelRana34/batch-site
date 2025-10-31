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





export async function uploadRoutineAction(formData:FormData) {
  try {
    const file = formData.get("image") as File;
    const title = formData.get("title")?.toString() || "Untitled";
    if (!file) return { success: false, message: "No file found" };

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Upload to Cloudinary folder "routines"
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "IHCroutine" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    // ✅ Save info in Firestore
    const docData = {
      title,
      url: result.secure_url,
      publicId: result.public_id,
      createdAt: new Date(),
    };

    await db.collection("routine").add(docData);

    // ✅ Revalidate pages if needed
    revalidatePath("/dashboard/upload-routine");
    revalidatePath("/");

    return { success: true, message: "Routine uploaded successfully!" };
  } catch (error) {
    console.error("Upload failed:", error);
    return { success: false, message: "Upload failed!" };
  }
}


// Delete routine by publicId
export async function deleteRoutine(publicId: string) {
  try {
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from Firestore
    const snap = await db.collection("routine").where("publicId", "==", publicId).get();
    snap.forEach((doc) => doc.ref.delete());

    // Revalidate pages
    try {
      revalidatePath("/dashboard/upload-routine");
      revalidatePath("/");
    } catch (err) {
      console.warn("Revalidate skipped:", err);
    }

    return { success: true, message: "Routine deleted successfully!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Delete failed!" };
  }
}