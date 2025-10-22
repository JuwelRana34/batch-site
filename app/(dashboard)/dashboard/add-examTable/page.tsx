"use client";

import { saveExamTable } from "@/actions/getdata";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Grid3x3, LoaderIcon, PlusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Exam {
  course: string;
  date: string;
  time: string;
}

export default function AddExamTablePage() {
  const [examName, setExamName] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [currentExam, setCurrentExam] = useState<Exam>({
    course: "",
    date: new Date().toISOString(),
    time: "",
  });
  const [examList, setExamList] = useState<Exam[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExam({ ...currentExam, [e.target.name]: e.target.value });
  };

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    const { course, date, time } = currentExam;
    if (!course || !date || !time) {
      toast.error("Please fill all fields");
      return;
    }
    setExamList([...examList, currentExam]);
    setCurrentExam({ course: "", date: "", time: "" });
    toast.success("Exam added!");
  };

  const handleSubmitAll = async () => {
    if (!examName) {
      toast.error("Please enter Exam Name");
      return;
    }

    const payload = {
      examName,
      isCompleted,
      exams: examList,
      createdAt: new Date(),
    };

    console.log("Payload to save:", payload);

    // 🔹 Firestore save example
    startTransition(async () => {
      await saveExamTable(payload);
      toast.success("All exams saved!");
      setExamName("");
      setIsCompleted(false);
      setExamList([]);
    });
  };


  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Add Exam Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Exam Name */}
          <div className="mb-4">
            <Label>Exam Name</Label>
            <Input
              placeholder="e.g. Midterm Exam"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
            />
          </div>

          {/* Exam Form */}
          <form onSubmit={handleAddExam} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Course</Label>
                <Input
                  name="course"
                  type="number"
                  placeholder="e.g. 1234"
                  value={currentExam.course}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Date</Label>
                <Input
                  name="date"
                  type="date"
                  value={currentExam.date}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Time</Label>
                <Input
                  name="time"
                  type="time"
                  value={currentExam.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-2">
              <PlusCircle className="inline mr-2" /> Add Exam
            </Button>
          </form>

          {/* isCompleted Switch */}
          <div className="flex items-center justify-between mt-4">
            <Label>Is Completed?</Label>
            <Switch checked={isCompleted} onCheckedChange={setIsCompleted} />
          </div>

          {/* Table */}
          {examList.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Added Exams</h2>
              <table
                className="w-full border border-gray-300"
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
                  {examList.map((exam, i) => (
                    <tr key={i}>
                      <td className="border px-4 py-2">{exam.course}</td>
                      <td className="border px-4 py-2">{exam.date}</td>
                      <td className="border px-4 py-2">
                        {" "}
                        {new Date(
                          `1970-01-01T${exam.time}:00`
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Button
                onClick={handleSubmitAll}
                disabled={isPending}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                <Grid3x3 className="inline mr-2" />
                {isPending ? <LoaderIcon /> : "Submit All"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
