"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquareText,
  BookOpen,
  Image as ImageIcon,
  Trophy,
  ExternalLink,
  LogOut,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { setDemoRoleAction } from "@/lib/actions/auth";

interface AdminHeaderProps {
  adminName: string;
  adminEmail: string;
}

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquareText },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/contest", label: "Contest", icon: Trophy },
];

export function AdminHeader({ adminName, adminEmail }: AdminHeaderProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await setDemoRoleAction("logout");
    });
  };

  return (
    <header className="bg-[#4A2511] text-white border-b border-[#E8B520]/20 shadow-md">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="bg-[#FBF6EE] px-2.5 py-1.5 rounded-xl shadow-sm border border-[#E8B520]/40 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Fashion Art Institute"
              width={140}
              height={45}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base tracking-wide text-[#FBF6EE]">
                Director Control Center
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E8B520]/20 text-[#E8B520] border border-[#E8B520]/40">
                Admin Console
              </span>
            </div>
            <p className="text-xs text-[#FBF6EE]/70">
              Gandhipuram, Coimbatore &bull; Central Govt Accredited
            </p>
          </div>
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-[#FBF6EE]">
              {adminName}
            </div>
            <div className="text-[11px] text-[#E8B520]">{adminEmail}</div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-[#FBF6EE]/80 hover:text-[#E8B520] px-3 py-1.5 rounded-xl border border-white/10 hover:border-[#E8B520]/40 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={isPending}
            className="text-white/80 hover:text-white hover:bg-white/10 text-xs gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="border-t border-white/10 bg-[#381B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto py-1.5 scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[#E8B520] text-[#4A2511] font-semibold shadow-gold"
                    : "text-[#FBF6EE]/70 hover:text-[#FBF6EE] hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#4A2511]" : "text-[#E8B520]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export function AdminUnauthorizedCard() {
  const [isPending, startTransition] = useTransition();

  const handleSwitchToAdmin = () => {
    startTransition(async () => {
      await setDemoRoleAction("admin");
    });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-soft border border-[#4A2511]/10 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center border border-amber-200 shadow-sm">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading text-2xl font-bold text-[#4A2511]">
            Administrator Access Required
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6458] leading-relaxed">
            The Admin Console is restricted to institute faculty and directors (verified via Clerk role or local admin session).
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Button
            variant="gold"
            size="lg"
            className="w-full shadow-gold gap-2"
            disabled={isPending}
            onClick={handleSwitchToAdmin}
          >
            <Sparkles className="w-4 h-4" />
            <span>Enter as Admin (Director Suguna)</span>
          </Button>

          <Link href="/sign-in" className="block text-xs text-[#7A6458] hover:text-[#4A2511]">
            Return to Login Options &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
