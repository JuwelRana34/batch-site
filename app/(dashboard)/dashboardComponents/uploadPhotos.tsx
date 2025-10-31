"use client";

import { deleteImage, uploadImage } from "@/actions/cloudinaryActions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function UploadPhotos() {
  const [image, setImage] = useState<File | null>(null);
  const [heading, setHeading] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isPending, startTransition] = useTransition();
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Select an image first");
    if (!heading.trim()) return alert("Enter a heading for the image");
    if (!selectedDate) return alert("Select a date");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("heading", heading);
    formData.append("uploadDate", selectedDate.toISOString());
    startTransition(async () => {
      const res = await uploadImage(formData);
      if (res.success) {
        setHeading("");
        toast.success("Uploaded successfully!");
      } else {
        toast.error("Upload failed");
      }
    });
  };

  return (
    <div className="  flex flex-col items-center gap-6 py-6 px-2">
     
   <Card className="p-4 md:px-10"> 
     <h1 className="text-3xl text-center text-textColor font-semibold">Upload Photos</h1>
      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <Label htmlFor="heading">Image Heading</Label>
        <Input
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Enter heading"
        />

        <Label htmlFor="date">Select Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full text-left">
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </PopoverContent>
        </Popover>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border bg-green-100 text-green-700 p-2 rounded w-full"
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Uploading..." : "Upload"}
        </Button>
      </form>
</Card>
    </div>
  );
}
