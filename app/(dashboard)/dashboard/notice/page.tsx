import { fetchData } from "@/actions/getdata";
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
import { Notice } from "@/types/allTypes";
import { Calendar, Notebook, RefreshCcwIcon, School } from "lucide-react";
import DelteeNoticeBtn from "../../dashboardComponents/DeleteNoticeBtn";
import PostNotice from "../../dashboardComponents/PostNotice";
export const revalidate = 345600;
export default async function Page() {
  const notices = await fetchData<Notice>("notices");
  return (
    <>
      <PostNotice />

      <div className="min-h-screen  py-12 px-4 md:px-20 max-w-7xl mx-auto">
        <h1 className=" text-3xl md:text-4xl font-bold mb-10 text-center text-textColor">
          Manage Notices-{" "}
          <span className="text-orange-500 capitalize">
            total notices : {notices.length}
          </span>
        </h1>
        {notices?.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia className="bg-white text-gray-500" variant="icon">
                <Notebook />
              </EmptyMedia>
              <EmptyTitle>No Notices </EmptyTitle>
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
          <div className="notice grid gap-0 grid-cols-1 pb-5 ">
            {notices?.map((post: Notice) => (
              <Card
                key={crypto.randomUUID()}
                className="shadow-md rounded-none hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-4 flex flex-col justify-between gap-0 m-0 first:rounded-t-md last:rounded-b-2xl"
              >
                <div className="">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-primary capitalize">
                      {post?.title}
                    </h2>
                    {post?.isPublished ? (
                      <Badge variant="default" className="text-sm px-2 py-1">
                        Published
                      </Badge>
                    ) : (
                      <Badge className="text-sm bg-gray-500 px-2 py-1">
                        Draft
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-center md:justify-start flex-wrap  gap-3 md:gap-5 items-center text-gray-500 text-xs border-gray-200 pt-2">
                  <Badge variant={"green"} className="rounded-full p-2">
                    {" "}
                    <School /> Dept: IHC
                  </Badge>
                  <Badge variant={"orange"} className="rounded-full p-2">
                    {" "}
                    <Calendar className="inline" size={100} />
                    {formatDate(post?.createdAt)}
                  </Badge>

                  {/* Read More Modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-0 grow md:grow-0 w-fit ">
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-primary">
                          {post?.title}
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription className="mt-2 text-gray-700">
                        <div
                          className="tiptap-content mb-3"
                          dangerouslySetInnerHTML={{ __html: post?.text }}
                        ></div>
                      </DialogDescription>
                      <div className="mt-4 flex justify-between text-gray-500 text-xs">
                        <span>Posted By: {post?.authorName}</span>
                        <span>{formatDate(post?.createdAt)}</span>
                      </div>
                      <DialogClose asChild>
                        <Button className="mt-4 bg-rose-100 hover:bg-rose-200 text-rose-500 w-full">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>

                  <DelteeNoticeBtn id={post.id} />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
