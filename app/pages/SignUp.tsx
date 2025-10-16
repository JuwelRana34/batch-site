"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // shadcn toast alternative
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { batches, locations } from "@/Data/data";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    batch: "",
    fbLink: "",
    selectedLocation: "",
    gender: "",
    dob: new Date(),
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string | Date) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        ...form,
        role: "user",
      });

      await sendEmailVerification(user);
      toast.success("✅ Registration successful! Please verify your email.");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error("User already registered or invalid input!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
          role: "user",
          googleSignIn: true,
        });
      }

      toast.success(`🎉 Welcome, ${user.displayName || "User"}!`);
      router.push("/profile-setup");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in with Google!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
      <Card className="w-[90%] md:w-[420px] shadow-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-primary">
            Registration Form
          </h1>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="your name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="017XXXXXXXX"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>

            {/* Facebook Link */}
            <div>
              <Label htmlFor="fbLink">Facebook Profile</Label>
              <Input
                id="fbLink"
                type="url"
                placeholder="https://facebook.com/..."
                value={form.fbLink}
                onChange={(e) => handleChange("fbLink", e.target.value)}
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.dob ? format(form.dob, "dd MMM yyyy") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.dob}
                    onSelect={(date) => date && handleChange("dob", date)}
                    fromYear={1960}
                    toYear={2025}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <RadioGroup
                value={form.gender}
                onValueChange={(value) => handleChange("gender", value)}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {/* District */}
            <div>
              <Label>Home District</Label>
              <Select
                onValueChange={(value) => handleChange("selectedLocation", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Batch */}
            <div>
              <Label>Batch</Label>
              <Select onValueChange={(value) => handleChange("batch", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/128/2504/2504914.png"
                alt="Google"
                className="w-5 h-5"
                height={500}
                width={500}
              />
              Continue with Google
            </Button>

            <p className="text-sm text-center text-gray-500 mt-3">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
