"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { user, loading, isAdmin, isModerator } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/notice", label: "Notices" },
    { href: "/qustions", label: "Qustions" },
    { href: "/profile", label: "Profile" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/50 backdrop-blur-sm shadow-sm border-b z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Classic<span className="text-blue-600">Navbar</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={` ${
                pathname === link.href
                  ? "text-blue-500 underline underline-offset-4 decoration-2 decoration-blue-400"
                  : "hover:text-blue-600 text-gray-700"
              } text-md font-medium  transition-colors`}
            >
              {link.label}
            </Link>
          ))}
          {loading ? (
            <Skeleton className="h-6 w-14" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {" "}
                  <span className="text-md font-semibold bg-clip-text bg-linear-to-l from-blue-500 to-violet-500 text-transparent">
                    {user.displayName}{" "}
                  </span>{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="lg" className="ml-2">
              <Link href={"/login"}>Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg">
                <Menu className="w-10 h-10" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-4">
              <h2 className="text-lg font-semibold mb-3">
                Classic<span className="text-blue-600">Navbar</span>
              </h2>
              <Separator className="mb-4" />

              <div className="flex flex-col space-y-4">
                {links.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      
                      href={link.href}
                      className={` ${
                        pathname === link.href
                          ? "text-blue-500 underline underline-offset-4 decoration-2 decoration-blue-400"
                          : "hover:text-blue-600 text-gray-700"
                      } text-md font-medium  transition-colors`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                 {loading ? (
            <Skeleton className="h-6 w-14" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {" "}
                  <span className="text-md font-semibold bg-clip-text bg-linear-to-l from-blue-500 to-violet-500 text-transparent">
                    {user.displayName}{" "}
                  </span>{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="lg" className="ml-2">
              <Link href={"/login"}>Login</Link>
            </Button>
          )}
          <LogoutButton />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
