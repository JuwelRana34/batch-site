"use client";

import { useTransition, useState } from "react";
import { Switch } from "@/components/ui/switch";

import { toast } from "sonner";
import { updateExamStatus } from "@/actions/getdata";

export function ExamToggle({
  examId,
  defaultActive,
}: {
  examId: string;
  defaultActive: boolean;
}) {
  const [isActive, setIsActive] = useState(defaultActive);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const newStatus = !isActive;
    setIsActive(newStatus);

    startTransition(async () => {
      try {
        await updateExamStatus(examId, newStatus);
        toast.success(
          `Exam marked as ${newStatus ? "active" : "inactive"} successfully!`
        );
      } catch{
        toast.error("Failed to update exam status!");
        setIsActive(!newStatus); // rollback
      }
    });
  };

  return (
    <Switch
      checked={isActive}
      onCheckedChange={handleToggle}
      disabled={isPending}
      className="data-[state=checked]:bg-blue-600 transition"
    />
  );
}
