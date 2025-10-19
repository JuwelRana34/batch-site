"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, db } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [redirectToProfileSetup, setRedirectToProfileSetup] =
    useState<boolean>(false);

  const router = useRouter();

  // 🔹 Email/Password Login
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        const token = await user.getIdToken();

        await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        setIsLoggedIn(true);
        setEmail("");
        setPassword("");
        toast.success("Login successful!");
        router.push("/");
      } else {
        await auth.signOut();
        toast.error("Please verify your email before logging in.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();

      await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "",
            isNewGoogleUser: true,
            role: "user",
            googleSignIn: true,
          });
          setRedirectToProfileSetup(true);
          toast.success(`Welcome ${user.displayName || "new user"}!`);
        } else if (docSnap.data()?.isNewGoogleUser) {
          setRedirectToProfileSetup(true);
          toast.success(`Welcome back ${user.displayName}!`);
        } else {
          toast.success(`Welcome ${user.displayName || "user"}!`);
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google.");
    }
  };

  // 🔹 Redirect after successful login
  if (isLoggedIn) {
    router.push("/");
  }
  // TODO:add route

  if (redirectToProfileSetup) {
    router.push("/profile/setup");
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-10 md:py-0 bg-gradient-to-b from-gray-50 to-gray-100 px-4 max-w-7xl mx-auto">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome Back 👋
          </CardTitle>
          <CardDescription className="text-gray-500">
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Login
            </Button>

            <div className="text-right">
              {/* TODO:add a route */}
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgotten password?
              </Link>
            </div>
          </form>

          <div className="my-4 flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/128/2504/2504914.png"
              alt="Google"
              width={20}
              height={20}
            />
            Sign in with Google
          </Button>

          <div className="text-center mt-6">
            <Link
              href="/registration"
              className="text-sm text-primary hover:underline"
            >
              Create a new account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
