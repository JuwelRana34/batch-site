"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { formatDate } from "@/lib/formatDate";
import { fetchData } from "@/services/Notices";
import { Notebook, RefreshCcwIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetchData();
      setPosts(data);
    };
    fetchPost();
  }, []);

  return (
    <div className="min-h-screen  py-12 px-4 md:px-20">
      <h1 className="text-4xl font-bold mb-10 text-center text-primay">
        Official Notices
      </h1>

      {posts.length === 0 ? (
        <Empty >
          <EmptyHeader>
            <EmptyMedia className="bg-white text-gray-500" variant="icon">
              <Notebook />
            </EmptyMedia>
            <EmptyTitle>No Notices</EmptyTitle>
            <EmptyDescription>
              You&apos;re all caught up. New notifications will appear here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" size="sm">
              <RefreshCcwIcon />
              Refresh
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-4 flex flex-col justify-between"
            >
              <div className="mb-3">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-primary">
                    {post.title}
                  </h2>
                  {post.isPublished ? (
                    <Badge variant="default" className="text-sm px-2 py-1">
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-sm px-2 py-1">
                      Draft
                    </Badge>
                  )}
                </div>

                <p className="text-gray-700 text-sm line-clamp-4">
                  {post.text}
                </p>
              </div>

              <div className="flex justify-between items-center text-gray-500 text-xs mt-4 border-t border-gray-200 pt-2">
                <span>Author : {post.authorId || "Admin"}</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>

              {/* Read More Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-3 w-full text-primary bg-blue-50"
                  >
                    Read More
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{post.title}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="mt-2 text-gray-700">
                    {post.text}
                  </DialogDescription>
                  <div className="mt-4 flex justify-between text-gray-500 text-xs">
                    <span>Author: {post.authorId}</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <DialogClose asChild>
                    <Button variant="destructive" className="mt-4 w-full">
                      Close
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
