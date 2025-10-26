import { fetchData } from "@/actions/getdata";
import AdminActionOnPdfs from "../../dashboardComponents/AdminActionOnpdfs";
import PdfUploader from "../../dashboardComponents/PdfUplodader";
import { Pdf } from "@/types/allTypes";

export const revalidate = 345600; // 4 days

export default async function UploadPage() {
    const rawpdfs = await fetchData<Pdf>("pdfs");
    const pdfs = rawpdfs.map((pdf) => ({
      ...pdf,
      createdAt: pdf.createdAt.toDate().toISOString(),
    }));
  return (
    <>
      <PdfUploader />
      <AdminActionOnPdfs pdfs={pdfs} />
    </>
  );
}
