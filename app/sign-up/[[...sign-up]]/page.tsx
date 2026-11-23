import React from "react";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SignUpPage() {
  const hasClerkKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#4A2511] text-[#E8B520] font-heading font-bold text-xl flex items-center justify-center mx-auto shadow-md border border-[#E8B520]/40">
            FA
          </div>
          <h2 className="font-heading text-3xl font-bold text-[#4A2511]">
            Create Student Account
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6458]">
            Register to join our online & classroom creative fashion batches.
          </p>
        </div>

        {hasClerkKey ? (
          <div className="flex justify-center">
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-[#4A2511] hover:bg-[#381B0C] text-[#E8B520]",
                  card: "shadow-soft rounded-3xl border border-[#4A2511]/10 bg-white",
                },
              }}
            />
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-soft border border-[#4A2511]/10 text-center space-y-6">
            <div className="p-4 bg-[#FBF6EE] rounded-2xl border border-[#E8B520]/30 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8F6C07]">
                <Sparkles className="w-4 h-4 text-[#E8B520]" />
                <span>Instant Student Registration</span>
              </div>
              <p className="text-xs text-[#7A6458] leading-relaxed">
                Connect directly with admissions or view the student dashboard
                demo.
              </p>
            </div>

            <Link href="/dashboard" className="block w-full">
              <Button variant="gold" size="lg" className="w-full gap-2 shadow-gold">
                <span>Go to Student Dashboard Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <div className="pt-2 text-xs text-[#7A6458] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#E8B520]" />
              <span>Free student onboarding</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
