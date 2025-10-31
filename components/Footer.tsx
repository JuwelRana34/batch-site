"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Facebook, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="w-full bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              IHC<span className="text-blue-600">18th</span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Always stay together, no matter what comes.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-700">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center justify-center space-x-4">
            <Link href="https://github.com" target="_blank">
              <Github className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            </Link>
            <Link href="mailto:hello@example.com">
              <Mail className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-6" />

        {/* Bottom section */}
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} IHC-18th. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
