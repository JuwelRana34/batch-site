import { fetchData } from "@/actions/getdata";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/formatDate";
import { Photos } from "@/types/allTypes";
import Image from "next/image";

export const revalidate = 345600; // 4 days

export default async function Page() {
  const photos = await fetchData<Photos>("images");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-textColor">
          Photo Gallery
        </h1>
        <p className="text-gray-500 mt-2">
          Beautiful moments shared by our IHC members 💚
        </p>
        <Separator className="mt-4" />
      </div>

      {/* Grid Layout */}
      {photos && photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              className="overflow-hidden rounded shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 py-0"
            >
              <CardHeader className="p-0">
                <Image
                  src={photo.url}
                  alt={photo.heading}
                  className="w-full h-full object-cover"
                  height={1000}
                  width={1000}
                />
              </CardHeader>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                  {photo.heading}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(photo.createdAt)}
                </p>
              </CardContent>

              <CardFooter className="flex justify-end p-4 pt-0">
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  View full image →
                </a>
              </CardFooter>
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
    </div>
  );
}
