"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
 const {logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success("👋 Logged out successfully!");
      router.push("/"); // redirect to homepage
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(`Failed to logout: ${(error as Error).message || error}`);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      disabled={loading}
      className="flex items-center gap-2 font-medium text-white shadow"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          Logout
        </>
      )}
    </Button>
  );
}
