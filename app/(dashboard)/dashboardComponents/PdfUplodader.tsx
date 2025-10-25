"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState("");
  const [year, setYear] = useState("1st Year");
  const [isPending, startTransition] = useTransition();
  const { user } = useAuth();
  const router = useRouter();
  const uploadFile = async () => {
    if (!file) return toast.error("Please select a PDF file");
    if (!customName.trim())
      return toast.error("Please enter a name for the file");
    if (!user) return toast.error("User not logged in");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", customName);
    formData.append("year", year);
    formData.append("addedBy", user?.displayName || "Admin");

    startTransition(async () => {
      try {
        const res = await fetch("/api/pdf", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          toast.success(`Uploaded! Name: ${data.name}`);
          setFile(null);
          setCustomName("");
          router.refresh();
        } else {
          toast.error(`Upload failed: ${data.error}`);
        }
      } catch (err) {
        console.error(err);
        toast.error("Upload failed, check console for details");
      }
    });
  };

  return (
    <div className="max-w-xl mt-5 mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className=" text-2xl md:text-4xl font-semibold text-textColor">
        Upload Qustion/Note PDF
      </h2>

      <div>
        <Label htmlFor="customName">File Name</Label>
        <Input
          id="customName"
          placeholder="Enter a name for your PDF"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="year">Year</Label>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1st Year">1st Year</SelectItem>
            <SelectItem value="2nd Year">2nd Year</SelectItem>
            <SelectItem value="3rd Year">3rd Year</SelectItem>
            <SelectItem value="4th Year">4th Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="file">Select PDF</Label>
        <Input
          id="file"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file && (
          <p className="text-sm mt-1 text-gray-600">Selected: {file.name}</p>
        )}
      </div>

      <Button disabled={isPending} onClick={uploadFile} className="w-full">
        {isPending ? (
          <span className="flex items-center gap-2 animate-pulse">
            <Loader className="animate-spin inline" /> Uploading...
          </span>
        ) : (
          "Upload PDF"
        )}
      </Button>
    </div>
  );
}
