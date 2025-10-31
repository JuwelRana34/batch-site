"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const PostNotice = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and text are required");
      return;
    }

    startTransition(async () => {
      try {
        if (!user) {
          toast.error("You must be logged in to post a notice!");
          return;
        }
        const newNotice = {
          title,
          text: description,
          authorName: user.displayName || "admin",
          createdAt: new Date(),
          isPublished,
        };
        await AddNotice(newNotice)
        setTitle("");
        setDescription("");
        toast.success("Notice posted successfully!");
      } catch {
        toast.error("Notice posted faild!");
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-card rounded-2xl shadow-lg border border-border flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-textColor text-center drop-shadow-md">
        Post a Notice
      </h2>
      <Separator className="bg-muted" />

      <div className="flex flex-col gap-5">
        {/* Title Input */}
        <div className="flex flex-col">
          <Label htmlFor="title" className="font-medium mb-1">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notice title"
            className="placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/60 transition-all rounded-lg"
          />
        </div>

        {/* Editor */}
        <div className="flex flex-col">
          <Label htmlFor="text" className="font-medium mb-1">
            Notice Text
          </Label>
          <SimpleEditor setDescription={setDescription} />
        </div>

        {/* Publish Switch */}
        <div className="flex items-center justify-between mt-2">
          <Label htmlFor="isPublished" className="font-medium">
            Publish Notice
          </Label>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {isPublished ? "Published" : "Draft"}
            </span>
            <Switch
              id="isPublished"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
        >
          {isPending ? "Posting..." : "Post Notice"}
        </Button>
      </div>
    </div>
  );
};

export default PostNotice;
