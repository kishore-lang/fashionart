"use client";

import React, { useState, useTransition } from "react";
import { SignIn } from "@clerk/nextjs";
import { Sparkles, Shield, GraduationCap, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { setDemoRoleAction } from "@/lib/actions/auth";

interface SignInClientProps {
  hasClerkKey: boolean;
}

export function SignInClient({ hasClerkKey }: SignInClientProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedRole, setSelectedRole] = useState<"student" | "admin">("student");

  const handleRoleLogin = (role: "student" | "admin") => {
    setSelectedRole(role);
    startTransition(async () => {
      await setDemoRoleAction(role);
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#4A2511] text-[#E8B520] font-heading font-bold text-2xl flex items-center justify-center mx-auto shadow-gold border border-[#E8B520]/40">
            FA
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2511]">
            Portal Authentication
          </h1>
          <p className="text-sm text-[#7A6458]">
            Fashion Art Institute for Creative Skills &bull; Gandhipuram, Coimbatore
          </p>
        </div>

        {/* Live Clerk Login when configured */}
        {hasClerkKey && (
          <div className="flex justify-center">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-[#4A2511] hover:bg-[#381B0C] text-[#E8B520] font-semibold",
                  card: "shadow-soft rounded-3xl border border-[#4A2511]/10 bg-white",
                },
              }}
            />
          </div>
        )}

        {/* Instant Access & Role Switcher */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-[#4A2511]/10 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-[#4A2511]/10">
            <Sparkles className="w-4 h-4 text-[#E8B520]" />
            <h2 className="text-sm font-semibold text-[#4A2511] uppercase tracking-wider">
              Instant One-Click Login
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* Student Login Card */}
            <button
              onClick={() => handleRoleLogin("student")}
              disabled={isPending}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                selectedRole === "student"
                  ? "border-[#E8B520] bg-[#FBF6EE]/70 shadow-sm"
                  : "border-[#4A2511]/10 hover:border-[#E8B520]/60 bg-white"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8B520]/20 text-[#8F6C07] flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#4A2511]">
                    Student Portal
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </div>
                <p className="text-xs text-[#7A6458] mt-1 leading-relaxed">
                  Access enrolled courses, drafting assignments, and Central Govt certification pipeline.
                </p>
                <div className="mt-2 text-xs font-semibold text-[#8F6C07] flex items-center gap-1">
                  <span>Sign in as Priya Sundaram (Student)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>

            {/* Admin Login Card */}
            <button
              onClick={() => handleRoleLogin("admin")}
              disabled={isPending}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                selectedRole === "admin"
                  ? "border-[#4A2511] bg-[#4A2511]/5 shadow-sm"
                  : "border-[#4A2511]/10 hover:border-[#4A2511]/50 bg-white"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#4A2511] text-[#E8B520] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#4A2511]">
                    Admin & Faculty Panel
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Admin Role
                  </span>
                </div>
                <p className="text-xs text-[#7A6458] mt-1 leading-relaxed">
                  Manage student enquiries, add/edit courses, upload gallery photos & review voting contest.
                </p>
                <div className="mt-2 text-xs font-semibold text-[#4A2511] flex items-center gap-1">
                  <span>Sign in as Suguna Shanmugam (Director)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          </div>

          {isPending && (
            <div className="flex items-center justify-center gap-2 py-2 text-xs text-[#8F6C07] font-medium animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin text-[#E8B520]" />
              <span>Authenticating session securely...</span>
            </div>
          )}

          <div className="pt-2 text-center border-t border-[#4A2511]/10 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#7A6458]">
              <Lock className="w-3.5 h-3.5 text-[#E8B520]" />
              <span>Role authorization verified strictly on the server</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
