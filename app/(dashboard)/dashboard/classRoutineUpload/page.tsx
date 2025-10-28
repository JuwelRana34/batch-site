"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Page() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);

    setLoading(true);
    try {
      // const res = await uploadRoutineAction(formData);
      toast.success("res.message");
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
          Class Routine Upload (Admin)
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="title">Routine Title</Label>
            <Input id="title" name="title" type="text" placeholder="Enter title" required />
          </div>

          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" name="image" type="file" accept="image/*" required />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Routine"}
          </Button>
        </form>
      </div>
    </section>
  );
}
