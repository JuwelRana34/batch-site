"use client";

import { uploadRoutineAction } from "@/actions/cloudinaryActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

export default function UploadRoutine() {
  const [loading, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null); // ✅ form ref

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const res = await uploadRoutineAction(formData);

        if (res.success) {
          toast.success("Image uploaded successfully!");
          formRef.current?.reset();
        }
      } catch {
        toast.error("Upload failed!");
      }
    });
  }

  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
          Class Routine Upload (Admin)
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="title">Routine Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Routine"}
          </Button>
        </form>
      </div>
    </section>
  );
}
