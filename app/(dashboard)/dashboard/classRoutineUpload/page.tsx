import { fetchData } from "@/actions/getdata";
import { Routine } from "@/types/allTypes";
import Image from "next/image";
import RoutineDeleteBtn from "../../dashboardComponents/RoutineDeleteBtn";
import UploadRoutine from "../../dashboardComponents/UploadExamRoutine";

export const revalidate = 345600;
export default async function Page() {
  const fetchRoutine = await fetchData<Routine>("routine");

  return (
    <>
      <UploadRoutine />

      <div className="flex justify-center">
        {fetchRoutine.map((R) => (
          <div key={R.id}>
            <h1 className=" capitalize text-center text-3xl md:text-5xl my-2 font-semibold text-transparent bg-linear-to-r from-blue-600 to-green-500 bg-clip-text">
              {R.title}
            </h1>
            <Image
              className="h-full w-full"
              src={R.url}
              width={1000}
              height={1000}
              alt={R.title}
            />
            {R.publicId && <RoutineDeleteBtn publicId={R.publicId} />}
          </div>
        ))}
      </div>
    </>
  );
}
