import AddExamTablePage from "../../dashboardComponents/AddExamTable";
import ExamTableManage from "../../dashboardComponents/ExamTableMange";


export default function Page() {
  return (
    <div className="py-5 min-h-screen bg-gray-50">
     <AddExamTablePage/>
     <ExamTableManage/>
    </div>
  );
}
