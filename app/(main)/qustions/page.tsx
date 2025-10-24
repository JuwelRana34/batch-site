import { fetchData } from "@/actions/getdata";
import PdfList from "@/components/PdfList";
import { Pdf } from "@/types/allTypes";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

export const revalidate = 345600; // 4 days

export default async function Page() {
  const rawpdfs = await fetchData<Pdf>("pdfs");
  const pdfs = rawpdfs.map((pdf) => ({
    ...pdf,
    createdAt: pdf.createdAt.toDate().toISOString(),
  }));

  const CookieStore = await cookies();
  const Session = CookieStore.get("session")?.value;

  if (!Session) {
    throw new Error("No session cookie found");
  }
  // 🔹 Firebase Admin দিয়ে session verify করুন
  const decodedClaims = await getAuth().verifySessionCookie(Session, true);
  // 🔹 শুধু admin role আছে কিনা চেক করুন
  const isAdmin = decodedClaims.admin || decodedClaims.moderator;

  return (
    <div className="min-h-screen py-12 px-4 md:px-20 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-textColor">
        Previous years qustions PDFs
      </h1>

      {/* Client component handles toggle/filter */}
      <PdfList pdfs={pdfs} isAdmin={isAdmin} />
    </div>
  );
}
