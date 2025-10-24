"use client";

import PdfDeletebtn from "@/app/(dashboard)/dashboardComponents/DeletePdfBtn";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";
import { Calendar, FileText, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PdfWithStringDate {
  id: string;
  driveId?: string;
  name: string;
  link: string;
  addedBy?: string;
  year: string;
  createdAt: string; // string date
}

interface Props {
  pdfs: PdfWithStringDate[];
}

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function PdfList({ pdfs }: Props) {
  const [selectedYear, setSelectedYear] = useState<string>("1st Year");
  
  const filteredPdfs = pdfs.filter((pdf) => pdf.year === selectedYear);

  return (
    <div>
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
              key={pdf.name}
              className="flex justify-between items-center p-3 border-b"
            >
              <div>
                <h3 className="text-lg font-semibold flex items-center  text-primary">
                  {/* <FileText size={18} /> {pdf.name} */}
                  <Image
                    src={
                      "https://cdn-icons-png.flaticon.com/128/4726/4726010.png"
                    }
                    height={500}
                    width={500}
                    alt="pdf icon"
                    className="w-10 h-10 "
                  />
                  {pdf.name}
                </h3>
                <p className="text-gray-500 text-sm flex items-center gap-2 mt-1 pl-1">
                  <Calendar size={16} /> Uploaded: {formatDate(pdf.createdAt)}
                </p>
              </div>
            
            <div className=" flex flex-col gap-3 ">
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
              <PdfDeletebtn id={pdf.id}/>
            </div>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
