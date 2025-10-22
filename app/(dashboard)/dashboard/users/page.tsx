import { fetchData } from "@/actions/getdata";
import { formatDate } from "@/lib/formatDate";
import { ExamDate, ExamTable } from "@/types/allTypes";

export default async function page() {
  const examDate = await fetchData<ExamDate>("exams");
  console.log("examDate:", examDate);
  const examList = await fetchData<ExamTable>("examTables");
  console.log("examTable:", examList);

  return (
    <div className="h-screen">
      users manage page
      {examDate.map((d) => (
        <div key={d.date.toString()}>
          {formatDate(d.date)} <br />
          {d.name}
        </div>
      ))}
      {examList.length > 0 &&
        examList.map((exam) => (
          <div key={exam.id} className="mt-6">
            <h2 className="text-lg font-semibold mb-2">{exam.examName}</h2>
            <table
              className="w-full border border-gray-800"
              style={{ borderCollapse: "collapse" }}
            >
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Course</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {exam?.exams?.map((ex, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">{ex.course}</td>
                    <td className="border px-4 py-2">{ex.date}</td>
                    <td className="border px-4 py-2">
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

            {/* <Button
               
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                <Grid3x3 className="inline mr-2" />
                {isPending ? <LoaderIcon /> : "Submit All"}
              </Button> */}
          </div>
        ))}
    </div>
  );
}
