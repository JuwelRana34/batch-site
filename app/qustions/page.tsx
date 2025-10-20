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

import React from "react";
import { fetchData } from "@/actions/getdata";
import { Pdf } from "@/types/allTypes";
import PdfList from "@/components/PdfList";
import { formatDate } from "date-fns";


export const revalidate = 345600; // 4 days

export default async function Page() {
  const rawpdfs = await fetchData<Pdf>( "pdfs" );
const pdfs = rawpdfs.map(pdf => ({
  ...pdf,
  createdAt: pdf.createdAt.toDate().toISOString()
}));
  return (
    // <div className="min-h-screen py-12 px-4 md:px-20 max-w-5xl mx-auto">
    //   <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-textColor">
    //     Uploaded PDFs
    //   </h1>

    //   {pdfs.length === 0 ? (
    //     <div className="text-center text-gray-500 mt-20">
    //       <FileText className="w-10 h-10 mx-auto mb-4 opacity-50" />
    //       <p>No PDFs uploaded yet.</p>
    //     </div>
    //   ) : (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {pdfs.map((pdf) => (
    //         <Card
    //           key={pdf.name}
    //           className="shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300 rounded-2xl"
    //         >
    //           <CardHeader>
    //             <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
    //               <FileText size={18} />
    //               {pdf.name}
    //             </CardTitle>
    //           </CardHeader>

    //           <CardContent className="text-sm text-gray-600 space-y-2">
    //             <p className="flex items-center gap-2">
    //               <Calendar size={16} className="text-gray-400" />
    //               Uploaded:{" "}
    //               {formatDate(pdf.createdAt)}
    //             </p>
    //             <p className="text-gray-500">Year: {pdf.year}</p>

    //             <Button
    //               asChild
    //               className="w-full mt-3"
    //               variant="outline"
    //             >
    //               <a
    //                 href={pdf.link}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="flex items-center justify-center gap-2"
    //               >
    //                 <LinkIcon size={16} />
    //                 View PDF
    //               </a>
    //             </Button>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>
    //   )}
    // </div>

      <div className="min-h-screen py-12 px-4 md:px-20 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-textColor">
        Previous years qustions PDFs
      </h1>

      {/* Client component handles toggle/filter */}
      <PdfList pdfs={pdfs} />
    </div>
  );
}
