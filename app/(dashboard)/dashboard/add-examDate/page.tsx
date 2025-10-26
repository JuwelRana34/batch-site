import { fetchData } from "@/actions/getdata";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/formatDate";
import { ExamDate } from "@/types/allTypes";
import AddExamDate from "../../dashboardComponents/AddExamDate";
import ExamDateDeletBtn from "../../dashboardComponents/ExamDateDeleteBtn";

export const revalidate = 345600;
export default async function Page() {
  const examDates = await fetchData<ExamDate>("exams");
  return (
    <div>
      <AddExamDate />
      {examDates.map((d) => {
        const examDateISO = d.date.toDate
          ? d.date.toDate().toISOString()
          : new Date(d.date.seconds * 1000).toISOString();
        return (
          <Card key={d.date.toString()} className="bg-blue-100 mb-4">
            <CardContent className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-semibold text-primary capitalize ">
                  {d.name}
                </h1>
                <p className="text-sm text-gray-500">{formatDate(d.date)}</p>
              </div>

              <ExamDateDeletBtn id={d.id} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
