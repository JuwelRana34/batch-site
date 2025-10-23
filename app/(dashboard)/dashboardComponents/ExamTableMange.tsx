import { DeleteExamTable, fetchData } from "@/actions/getdata";
import { ExamTable } from "@/types/allTypes";
import { ExamToggle } from "./ExamToggle";
import { Button } from "@/components/ui/button";

export default async function ExamTableManage() {
  const examList = await fetchData<ExamTable>("examTables");
  return (
    <div className="p-2">
      <h2 className="text-3xl text-center font-bold  capitalize text-transparent bg-clip-text bg-linear-to-l to-blue-600 from-green-500">Manage tables</h2>
      {examList.length > 0 &&
        examList.map((exam) => (
          <div
            key={exam.id}
            className="mt-8 bg-white rounded-2xl shadow-lg border  overflow-hidden transition hover:shadow-xl"
          >
            <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-wide">
                {exam.examName}
              </h2>
              <ExamToggle examId={exam.id} defaultActive={exam.isCompleted} />
              <Button variant={"destructive"} size="sm">Delete</Button>
            </div>

            {/* <div className="p-4">
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
                  {exam?.exams?.map((ex, i) => (
                    <tr
                      key={i}
                      className={`border-b hover:bg-blue-50 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
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
                  ))}
                </tbody>
              </table>
            </div> */}
          </div>
        ))}
    </div>
  );
}
