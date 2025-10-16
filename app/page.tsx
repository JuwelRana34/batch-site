"use client";
import { checkAdmin } from "@/lib/firebaseAuth";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      const adminStatus = await checkAdmin();
      setIsAdmin(adminStatus);
    };
    fetchAdmin();
  }, []);

  return (
    <div>
      {isAdmin ? <p>You are Admin ✅</p> : <p>Normal user ❌</p>}
    </div>
  );
}
