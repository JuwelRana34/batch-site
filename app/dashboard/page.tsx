"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import { Card } from "@/components/ui/card";
import RoleDropdown from "./dashboardComponents/RoleDropdown";

interface User {
  uid: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const list: User[] = querySnapshot.docs.map(doc => ({
        uid: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        role: doc.data().role || "user",
      }));
      setUsers(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">User Management</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        users.map(user => (
          <Card key={user.uid} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <RoleDropdown uid={user.uid} currentRole={user.role} />
          </Card>
        ))
      )}
    </div>
  );
}
