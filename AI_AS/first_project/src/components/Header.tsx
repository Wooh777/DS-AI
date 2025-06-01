"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegMoon } from "react-icons/fa";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/calendar", label: "달력" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="text-blue-600">📝</span> Todo List
        </Link>
        <nav className="flex gap-2 md:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-2 py-1 rounded transition-colors text-sm font-medium ${pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="ml-2 p-2 rounded hover:bg-gray-100 text-gray-500" aria-label="테마 전환(미구현)"><FaRegMoon size={20} /></button>
      </div>
    </header>
  );
} 