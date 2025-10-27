import { fetchData } from "@/actions/getdata";
import Carousel from "@/components/Carousel";
import { slides } from "@/Data/data";
import { ExamDate } from "@/types/allTypes";
import Countdown from "../(dashboard)/dashboardComponents/CountDown";
import ExamRoutine from "./Components/ExamRoutine";

export const revalidate = 345600;

export default async function Home() {
  const examDate = await fetchData<ExamDate>("exams");

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
    </div>
  );
}
