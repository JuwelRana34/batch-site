"use client";

import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user, loading, isAdmin, isModerator } = useAuth();
  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen">
      {user && isAdmin ? <p>Welcome, Admin!</p> : <p>Normal User</p>}
      {user && isModerator ? <p>Welcome, Moderator!</p> : <p>Normal User</p>}

      {user ? <LogoutButton /> : <Link href={"/login"}>login</Link>}
    </div>
  );
}
