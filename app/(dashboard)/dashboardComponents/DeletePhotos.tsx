"use client";

import { deleteImage } from "@/actions/cloudinaryActions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export interface Photo {
  id: string;
  heading: string;
  timestamp: string;
  url: string;
  publicId?: string;
  createdAt: string;
}

export default function DeletePhotos({ photos }: { photos: Photo[] }) {
  const [isPending, startTransition] = useTransition();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteConfirm = (publicId: string) => {
    if (!publicId) return toast.error("No publicId provided");
    setSelectedId(publicId);
    setOpenDialog(true);
  };

  const handleDelete = () => {
    if (!selectedId) return toast.error("No publicId provided");

    startTransition(async () => {
      try {
        const res = await deleteImage(selectedId);
        if (res.success) {
          toast.success("Photo deleted successfully!");
          setOpenDialog(false);
          setSelectedId(null);
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while deleting photo");
      }
    });
  };

  return (
    <>
      <h1 className="text-4xl font-semibold  text-textColor capitalize text-center my-4">
        manage photos
      </h1>
      {/* Grid Layout */}
      {photos && photos.length > 0 ? (
        <div className="gap-4">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              className="overflow-hidden rounded shadow-sm border transition-all duration-300 flex flex-row items-center gap-4 p-4"
            >
              {/* Image on the left */}
              <Image
                src={photo.url}
                alt={photo.heading}
                className="w-24 h-24 object-cover rounded"
                height={1000}
                width={1000}
              />

              {/* Content & Button on the right */}
              <div className="flex flex-col justify-between flex-1 h-full">
                <div>
                  <h3 className="font-semibold text-lg text-textColor capitalize line-clamp-2">
                    {photo.heading}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(photo.timestamp)}
                  </p>
                </div>

                <div className="flex justify-end mt-2">
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      if (!photo.publicId)
                        return toast.error("No publicId found!");
                      handleDeleteConfirm(photo.publicId);
                    }}
                    variant={"destructive"}
                  >
                    {isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-full h-72 rounded-2xl" />
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this photo? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              disabled={isPending}
              variant="destructive"
              onClick={handleDelete}
            >
              {isPending ? "Deleting.." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
