import { fetchData } from "@/actions/getdata";
import { Photos } from "@/types/allTypes";
import DeletePhotos from "../../dashboardComponents/DeletePhotos";
import UploadPhotos from "../../dashboardComponents/uploadPhotos";

export const revalidate = 345600;
export default async function Page() {
  const rawPhotos = await fetchData<Photos>("images");
  const photos = rawPhotos.map((p) => ({
    ...p,
    createdAt: p.createdAt.toDate().toISOString(),
    timestamp: p.timestamp.toDate().toISOString(),
  }));

  return (
    <>
      <UploadPhotos />

      <DeletePhotos photos={photos} />
    </>
  );
}
