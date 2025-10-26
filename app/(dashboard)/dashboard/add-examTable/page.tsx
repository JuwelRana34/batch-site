import { fetchData } from "@/actions/getdata";
import { ExamTable } from "@/types/allTypes";
import AddExamTablePage from "../../dashboardComponents/AddExamTable";
import ExamTableDeleteBtn from "../../dashboardComponents/DeleteExamTableBtn";
import { ExamToggle } from "../../dashboardComponents/ExamToggle";
export const revalidate = 345600;

export default async function AddExamTable() {
  const examList = await fetchData<ExamTable>("examTables");

  return (
    <div className="py-5 min-h-screen bg-gray-50">
      <AddExamTablePage />

      {/* mange table  */}
      <div className="p-2">
        <h2 className="text-3xl text-center font-bold  capitalize text-transparent bg-clip-text bg-linear-to-l to-blue-600 from-green-500">
          Manage tables
        </h2>
        {examList.length > 0 &&
          examList.map((exam) => (
            <div
              key={exam.id}
              className="mt-8 bg-white shadow-blue-200 shadow rounded-md   overflow-hidden transition hover:shadow-md"
            >
              <div className=" bg-blue-100 px-6 py-4 flex items-center justify-between">
                <h2 className=" text-md md:text-xl font-semibold tracking-wide">
                  {exam.examName}
                </h2>
                <div className="space-x-3 flex justify-center items-center">
                  <ExamToggle
                    examId={exam.id}
                    defaultActive={exam.isCompleted}
                  />
                  <ExamTableDeleteBtn id={exam.id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
