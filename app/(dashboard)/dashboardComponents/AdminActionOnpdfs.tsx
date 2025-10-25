"use client";

import { Calendar, FileText, LinkIcon, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { formatDate } from "@/lib/formatDate";
import { Pdf } from "@/types/allTypes";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import PdfDeleteBtn from "./DeletePdfBtn";

export default function AdminActionOnPdfs() {
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("1st Year");

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  useEffect(() => {
    const q = query(collection(db, "pdfs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pdfList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.() || "",
      })) as Pdf[];
      setPdfs(pdfList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredPdfs = pdfs.filter((pdf) => pdf.year === selectedYear);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-600 animate-pulse">
        Loading PDFs...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-20 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-textColor">
        Previous Years Question PDFs
      </h1>

      {/* Year Toggle Buttons */}
      <div className="flex gap-3 mb-6 justify-center flex-wrap">
        {years.map((year) => (
          <Button
            key={year}
            variant={selectedYear === year ? "default" : "outline"}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </Button>
        ))}
      </div>

      {/* PDF List */}
      {filteredPdfs.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <FileText className="w-10 h-10 mx-auto mb-4 opacity-50" />
          <p>No PDFs uploaded for {selectedYear}.</p>
        </div>
      ) : (
        <ul className="border rounded-lg">
          {filteredPdfs.map((pdf) => (
            <li
              key={pdf.id}
              className="flex justify-between items-center p-3 border-b"
            >
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/128/4726/4726010.png"
                    height={40}
                    width={40}
                    alt="pdf icon"
                    className="w-10 h-10"
                  />
                  {pdf.name}
                </h3>
                <div className="md:flex gap-2">
                  <p className="text-gray-500 text-sm flex items-center gap-2 mt-1 pl-1">
                    <Calendar size={16} /> Uploaded: {formatDate(pdf.createdAt)}
                  </p>
                  <Badge
                    variant="green"
                    className="text-textColor items-center my-2 md:my-0 gap-2 pl-0.5 inline"
                  >
                    <UserCircle className="inline w-5 h-5 text-gray-600" />
                    AddedBy: {pdf.addedBy || "Admin"}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  className="bg-orange-100 text-orange-500 hover:bg-orange-200"
                >
                  <Link
                    href={pdf.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <LinkIcon size={16} /> View
                  </Link>
                </Button>
                <PdfDeleteBtn id={pdf.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
