"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Lock, KeyRound, ArrowRight, ShieldCheck, LogOut, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { loginWithAdminPasswordAction, logoutAdminAction } from "@/lib/actions/auth";

export function AdminPasswordAuth({
  children,
  isAuthenticatedInitially,
}: {
  children: React.ReactNode;
  isAuthenticatedInitially: boolean;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedInitially);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const res = await loginWithAdminPasswordAction(password.trim());
      if (res.success) {
        document.cookie = `fashionart_admin_session=authenticated; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
        setIsAuthenticated(true);
      } else {
        setError(res.error || "Incorrect admin password. Please try again.");
      }
    });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAdminAction();
      document.cookie = `fashionart_admin_session=; path=/; max-age=0; SameSite=Lax`;
      setIsAuthenticated(false);
      setPassword("");
    });
  };

  if (isAuthenticated) {
    return (
      <div className="relative">
        {/* Floating Logout Button */}
        <div className="bg-[#4A2511] text-white px-4 py-2 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Director Admin Session Active</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-red-500 text-white transition-colors text-[11px]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Admin Panel</span>
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#E8B520]/40 shadow-2xl space-y-6 text-center">
        {/* Header Logo & Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#4A2511] text-[#E8B520] flex items-center justify-center mx-auto shadow-md border border-[#E8B520]/40">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C6A46C]">
            Restricted Access
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2511]">
            Director Admin Portal
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6458]">
            Enter your predefined administrative password to manage courses,
            gallery uploads, and doll contest votes.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#4A2511] uppercase tracking-wider block">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. fashionart2026)"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#4A2511]/20 focus:border-[#E8B520] focus:ring-2 focus:ring-[#E8B520]/30 outline-none text-sm text-[#4A2511] transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6458] hover:text-[#4A2511]"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-600 font-medium mt-1">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            disabled={isPending}
            className="w-full justify-center gap-2 text-sm shadow-md"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <KeyRound className="w-4 h-4" />
            )}
            <span>{isPending ? "Verifying..." : "Unlock Admin Panel"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="pt-2 border-t border-[#4A2511]/10 text-[11px] text-[#7A6458]">
          <span>Protected with Director credentials.</span>
        </div>
      </div>
    </div>
  );
}
