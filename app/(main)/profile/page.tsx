"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Edit, Facebook, Mail, Phone, ShieldUser } from "lucide-react";
export default function UserProfile() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex justify-center">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl border border-gray-100">
        <CardHeader className="flex flex-col items-center text-center bg-[url('/jnu.jpg')] bg-center bg-cover relative overflow-hidden py-5">
          {/* White overlay BEHIND content */}
          <div className="absolute inset-0 bg-white/70 z-0" />

          {/* All content above overlay */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-28 h-28 border-4 border-emerald-100 shadow">
                <AvatarImage
                  src={user?.photoURL || ""}
                  alt={user?.displayName || ""}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="text-2xl font-semibold bg-blue-500 text-white">
                  {user?.displayName?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-1 right-1 bg-orange-100 p-1 rounded-full text-orange-500">
                <ShieldUser />
              </span>
            </div>

            <CardTitle className="mt-4 text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text">
              {user?.displayName || "User Name"}
            </CardTitle>

            <p className="text-gray-500 text-sm">{"Member"}</p>

            <Button
              variant="outline"
              size="sm"
              className="mt-4 flex items-center gap-2"
            >
              <Edit size={16} />
              Edit Profile
            </Button>
          </div>
        </CardHeader>

        <Separator className="my-4" />

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem
              icon={<Mail size={18} />}
              label="Email"
              value={user?.email || "Not provided"}
            />
            <InfoItem
              icon={<Phone size={18} />}
              label="Phone"
              value={"Not provided"}
            />
            <InfoItem
              icon={<Facebook size={18} />}
              label="Facebook"
              value={"Not provided"}
            />
            <InfoItem label="Batch" value={"N/A"} />
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">About</h3>
            <p className="text-gray-600 leading-relaxed">
              {
                "This user hasn't added a bio yet. You can share information about your background, interests, or achievements here."
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
      {icon && <div className="text-blue-500">{icon}</div>}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-base font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
