"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  uid: string;
  currentRole: string;
}

export default function RoleDropdown({ uid, currentRole }: Props) {
  const [role, setRole] = useState(currentRole);
  const [isPending, startTransiton]=useTransition()

  const handleChangeRole = () => {
startTransiton(async ()=>{
try {
      const res = await fetch("/api/setRole", {
        method: "POST",
        body: JSON.stringify({ uid, role }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) toast.success(data.message);
      else toast.error(data.error);
    } catch (err) {
      toast.error((err as Error).message || "Failed to update role");
    }
})
    
  };

  return (
    <div className="flex gap-2 items-center">
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger>
          <span>{role}</span> {/* Show selected value */}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="moderator">Moderator</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleChangeRole} disabled={isPending}>
        {isPending ? "Updating..." : "Update Role"}
      </Button>
    </div>
  );
}
