"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Trophy,
  Image as ImageIcon,
  PhoneCall,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/contest", label: "Contest", icon: Trophy },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/contact", label: "Enquire", icon: PhoneCall },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on admin routes so admin has full screen real estate
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF6EE]/95 backdrop-blur-lg border-t border-[#4A2511]/15 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1.5 px-2 rounded-xl transition-all duration-200 active:scale-95 touch-manipulation ${
                isActive
                  ? "text-[#E8B520] font-bold"
                  : "text-[#7A6458] hover:text-[#4A2511]"
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? "bg-[#4A2511] text-[#E8B520] shadow-sm" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
