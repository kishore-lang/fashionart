import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#4A2511] text-[#E8B520] font-heading font-extrabold text-2xl flex items-center justify-center mx-auto shadow-md border border-[#E8B520]/40">
          FA
        </div>
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E8B520]">
            Error 404
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2511]">
            Page Not Found
          </h1>
          <p className="text-sm text-[#7A6458] leading-relaxed">
            The page you are looking for might have been moved or is currently
            being tailored. Let&apos;s guide you back to our institute courses.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="gold" size="md" className="w-full gap-2 shadow-gold">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link href="/courses" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
