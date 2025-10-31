import { fetchData } from "@/actions/getdata";
import Carousel from "@/components/Carousel";
import { slides } from "@/Data/data";
import { ExamDate, Routine } from "@/types/allTypes";
import { Sparkles, TrendingUp, User2 } from "lucide-react";
import Countdown from "../(dashboard)/dashboardComponents/CountDown";
import ExamRoutine from "./Components/ExamRoutine";
import Image from "next/image";

export const revalidate = 345600;

export default async function Home() {
  const examDate = await fetchData<ExamDate>("exams");
  const fetchRoutine = await fetchData<Routine>("routine");
  return (
    <div className="min-h-screen">
      <Carousel images={slides} />

      {/* //manage exam Count down */}
      {examDate.map((d) => {
        const examDateISO = d.date.toDate
          ? d.date.toDate().toISOString()
          : new Date(d.date.seconds * 1000).toISOString();
        return (
          <div key={d.date.toString()}>
            <Countdown reslut={d.reslut} date={examDateISO} examName={d.name} />
          </div>
        );
      })}

      {/* mange exam routine  */}
      <ExamRoutine />
 <div className="flex justify-center">
   {fetchRoutine.map((R) => (
              <div key={R.id}>
                <h1 className=" capitalize text-center text-3xl md:text-5xl my-2 font-semibold text-transparent bg-linear-to-r from-blue-600 to-green-500 bg-clip-text">{R.title}</h1>
                <Image
                  className="h-full w-full"
                  src={R.url}
                  width={1000}
                  height={1000}
                  alt={R.title}
                />
               
              </div>
            ))}
 </div>
      

      {/* <!-- About Us Section --> */}
      <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            আমরা কারা?
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            আমরা শুধু একটি ব্যাচ নই, আমরা একটি পরিবার। জ্ঞান, বন্ধুত্ব এবং
            অসংখ্য স্মৃতি নিয়ে আমাদের পথচলা।
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Card 1 */}
          <div className="bg-slate-50 p-8 rounded-lg shadow-md hover:-translate-y-2 transition duration-300">
            <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <User2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ঐক্য</h3>
            <p className="text-slate-600">
              আমাদের সবচেয়ে বড় শক্তি হলো আমাদের একতা। বিপদে-আপদে আমরা সবাই
              সবার পাশে থাকি।
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 p-8 rounded-lg shadow-md hover:-translate-y-2 transition duration-300">
            <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">স্মৃতি</h3>
            <p className="text-slate-600">
              ক্যাম্পাসের প্রতিটা কোণায় ছড়িয়ে আছে আমাদের হাসি-কান্নার অসংখ্য
              রঙিন স্মৃতি।
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 p-8 rounded-lg shadow-md hover:-translate-y-2 transition duration-300">
            <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">সাফল্য</h3>
            <p className="text-slate-600">
              শিক্ষা জীবন শেষে আমরা সবাই নিজ নিজ কর্মক্ষেত্রে সাফল্যের পথে
              এগিয়ে চলেছি।
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* <!-- Events Section --> */}
      <section id="events" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              আসন্ন ইভেন্টস
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              একসাথে আবারও মিলিত হওয়ার পালা।
            </p>
          </div>

          {/* Event Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
              <img
                src="https://placehold.co/600x400/3b82f6/ffffff?text=Reunion"
                alt="Reunion"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-blue-600 font-semibold">
                  ডিসেম্বর ২৫, ২০২৫
                </p>
                <h3 className="text-xl font-bold my-2">বার্ষিক পুনর্মিলনী</h3>
                <p className="text-slate-600 mb-4">
                  স্মৃতির ক্যাম্পাসে আবারও একসাথে হওয়ার সুযোগ।
                </p>
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  বিস্তারিত জানুন &rarr;
                </a>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
              <img
                src="https://placehold.co/600x400/10b981/ffffff?text=Picnic"
                alt="Picnic"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-emerald-600 font-semibold">
                  ফেব্রুয়ারী ১০, ২০২৬
                </p>
                <h3 className="text-xl font-bold my-2">বার্ষিক বনভোজন</h3>
                <p className="text-slate-600 mb-4">
                  প্রকৃতির মাঝে একদিনের জন্য হারিয়ে যাওয়ার আয়োজন।
                </p>
                <a
                  href="#"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  বিস্তারিত জানুন &rarr;
                </a>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
              <img
                src="https://placehold.co/600x400/f59e0b/ffffff?text=Workshop"
                alt="Workshop"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-amber-600 font-semibold">
                  মার্চ ১৫, ২০২৬
                </p>
                <h3 className="text-xl font-bold my-2">ক্যারিয়ার কর্মশালা</h3>
                <p className="text-slate-600 mb-4">
                  সিনিয়রদের অভিজ্ঞতা থেকে নতুনদের জন্য দিকনির্দেশনা।
                </p>
                <a
                  href="#"
                  className="text-amber-600 font-semibold hover:underline"
                >
                  বিস্তারিত জানুন &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
