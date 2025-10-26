"use client";

import { saveExamDate } from "@/actions/getdata";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function AddExamDate() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showCountdown, setShowCountdown] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState<string>("");
  const [reslut, setReslut] = useState<string>("");
  const handleSubmit = async () => {
    if (!date) return toast.error("Please select a date");

    startTransition(async () => {
      try {
        const res = await saveExamDate({
          reslut,
          name,
          date, // JS Date → Timestamp
          showCountdown,
          createdAt: new Date(),
        });
        if (res?.success) {
          toast.success("Exam date saved successfully!");
          setDate(undefined);
          setName("");
          setShowCountdown(true);
        } else {
          toast.error(res.message || "Failed to save exam date");
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    });
  };

  return (
    <div className="min-h-screen p-2 md:p-10 bg-gray-50">
      <Card className="max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-textColor">
            Set Exam Date
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col ">
            <Label htmlFor="exam-date"> Exam Name</Label>
            <Input
              className="border m-2 rounded-md"
              placeholder="Exam Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col ">
            <Label htmlFor="exam-date">Reslut</Label>
            <Input
              className="border m-2 rounded-md"
              placeholder="Reslut"
              onChange={(e) => setReslut(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center">
            <Label htmlFor="exam-date">Select Exam Date</Label>
            <Calendar
              className="border m-2 rounded-md"
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-countdown">Show Countdown</Label>
            <Switch
              className=" cursor-pointer"
              id="show-countdown"
              checked={showCountdown}
              onCheckedChange={setShowCountdown}
            />
          </div>

          <Button onClick={handleSubmit} disabled={isPending} className="mt-4">
            {isPending ? "Saving..." : "Save Exam Date"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
