"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DeleteNotice } from "@/actions/getdata";

// Shadcn UI Dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteNoticeBtn({ id }: { id: string }) {
  const [isPending, startTransition ] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete =() => {
    startTransition(async () => {
      try {
        const res = await DeleteNotice(id);
        if (res.success) {
          toast.success("Notice deleted successfully!");
        } else {
          toast.error("Failed to delete notice!");
        }
        setOpen(false); // close dialog after delete
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={isPending} className=" disabled:opacity-65 disabled:cursor-not-allowed" variant="destructive">{isPending ? "Deleting..." : "Delete"}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this notice? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
