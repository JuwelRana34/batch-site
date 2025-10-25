import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PdfUploader from "../../dashboardComponents/PdfUplodader";
import AdminActionOnPdfs from "../../dashboardComponents/AdminActionOnpdfs";


export default async function UploadPage() {
  const CookieStore = await cookies();
  const Session = CookieStore.get("session")?.value;

  if (!Session) {
    throw new Error("No session cookie found");
  }
  // 🔹 Firebase Admin দিয়ে session verify করুন
  const decodedClaims = await getAuth().verifySessionCookie(Session, true);
  // 🔹 শুধু admin role আছে কিনা চেক করুন
  const isAdmin = decodedClaims.admin || decodedClaims.moderator;

  if (!isAdmin) {
    redirect("/");
  }
  return (
    <>
      <PdfUploader />
      <AdminActionOnPdfs />
    </>
  );
}
