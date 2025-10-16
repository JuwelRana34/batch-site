"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  name: string;
  href: string;
}

export default function NavLink({ name, href }: Props) {
  const pathname = usePathname();

  // check if this link is active
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-lg py-2 px-4 rounded transition-all ${
        isActive ? "bg-blue-500 text-white font-semibold" : ""
      }`}
    >
      {name}
    </Link>
  );
}
