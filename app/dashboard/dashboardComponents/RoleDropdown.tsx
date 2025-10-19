"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";


interface Props {
  uid: string;
  currentRole: string;
}

export default function RoleDropdown({ uid, currentRole }: Props) {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  const handleChangeRole = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger />
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="moderator">Moderator</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleChangeRole} disabled={loading}>
        {loading ? "Updating..." : "Update Role"}
      </Button>
    </div>
  );
}
