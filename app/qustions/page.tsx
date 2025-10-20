// import { fetchData } from '@/actions/getdata';
// import { Pdf } from '@/types/allTypes';
// import React from 'react';

// const revalidate = 345600; // 4 days
// export default async function Page() {
// const pdfs = await fetchData<Pdf>("pdfs");

//   return (
//     <div>
//       uploads pdf page
//     </div>
//   );
// }

import { fetchData } from "@/actions/getdata";
import PdfList from "@/components/PdfList";
import { Pdf } from "@/types/allTypes";

export const revalidate = 345600; // 4 days

export default async function Page() {
  const rawpdfs = await fetchData<Pdf>("pdfs");
  const pdfs = rawpdfs.map((pdf) => ({
    ...pdf,
    createdAt: pdf.createdAt.toDate().toISOString(),
  }));
  return (
    <div className="min-h-screen py-12 px-4 md:px-20 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-textColor">
        Previous years qustions PDFs
      </h1>

      {/* Client component handles toggle/filter */}
      <PdfList pdfs={pdfs} />
    </div>
  );
}
