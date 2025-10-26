import { fetchData } from "@/actions/getdata";
import { formatDate } from "@/lib/formatDate";
import { ExamDate, ExamTable } from "@/types/allTypes";
import Countdown from "../../dashboardComponents/CountDown";
import { ExamToggle } from "../../dashboardComponents/ExamToggle";

export const revalidate = 345600; // disable caching
export default async function page() {
  const examDate = await fetchData<ExamDate>("exams");
  const examList = await fetchData<ExamTable>("examTables");

  return (
    <div className="h-screen">
      users manage page
      {examDate.map((d) => {
        const examDateISO = d.date.toDate
          ? d.date.toDate().toISOString()
          : new Date(d.date.seconds * 1000).toISOString();
        return (
          <div key={d.date.toString()}>
            {formatDate(d.date)} <br />
            {d.name}
            <Countdown reslut={d.reslut} date={examDateISO} examName={d.name} />
          </div>
        );
      })}
      {examList.length > 0 &&
        examList.map((exam) => (
          <div
            key={exam.id}
            className="mt-8 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden transition hover:shadow-xl"
          >
            <div className="bg-gradient-to-r from-lime-600 to-emerald-500 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-wide">
                {exam.examName}
              </h2>
              <ExamToggle examId={exam.id} defaultActive={exam.isCompleted} />
            </div>

            <div className="p-4">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-gray-100 text-gray-800 border-b">
                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {exam?.exams?.map((ex, i) => {
                    // Convert exam.date to Date object
                    const examDate = new Date(ex.date);
                    const isPast = examDate < new Date();

                    return (
                      <tr
                        key={i}
                        className={`border-b hover:bg-blue-50 ${
                          isPast
                            ? "bg-red-100 text-red-600"
                            : i % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-3 font-medium">{ex.course}</td>
                        <td className="px-6 py-3">{ex.date}</td>
                        <td className="px-6 py-3">
                          {new Date(
                            `1970-01-01T${ex.time}:00`
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  );
}
