"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  Calendar,
  MessageCircle,
  FileText,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Shield,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { setDemoRoleAction } from "@/lib/actions/auth";

export function StudentDashboard({
  studentName = "Priya Sundaram",
  studentEmail = "priya.sundaram@example.com",
}: {
  studentName?: string;
  studentEmail?: string;
}) {
  const [activeTab, setActiveTab] = useState<"courses" | "certificate" | "schedule">("courses");
  const [isPending, startTransition] = useTransition();

  const handleSwitchAdmin = () => {
    startTransition(async () => {
      await setDemoRoleAction("admin");
    });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await setDemoRoleAction("logout");
    });
  };

  const whatsappDirectNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917397526669";
  const facultyWhatsApp = `https://wa.me/${whatsappDirectNumber}?text=${encodeURIComponent(
    `Hello Suguna Ma'am! I am ${studentName} (Student ID: FA-2026-0842). I would like to submit my blouse drafting pattern for review.`
  )}`;

  return (
    <div className="space-y-8">
      {/* Student Authentication Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-white rounded-2xl border border-[#4A2511]/10 text-xs shadow-sm">
        <div className="flex items-center gap-2.5 text-[#7A6458]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Student Portal: <strong className="text-[#4A2511]">{studentName}</strong> ({studentEmail})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            className="flex items-center gap-1 text-xs font-semibold text-[#8F6C07] hover:text-[#4A2511] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#E8B520]" />
            <span>Enrolled Courses</span>
          </Link>
          <span className="text-[#4A2511]/20">•</span>
          <Link
            href="/sign-in"
            className="flex items-center gap-1 font-semibold text-[#4A2511] hover:text-[#E8B520] transition-colors"
          >
            <span>Clerk Student Account</span>
          </Link>
        </div>
      </div>
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-[#4A2511] via-[#351A0C] to-[#4A2511] rounded-3xl p-8 sm:p-10 text-white border border-[#E8B520]/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8B520]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#E8B520] text-[#4A2511] font-heading font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-white shrink-0">
              {studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold">
                  Welcome back, {studentName}!
                </h1>
                <Badge variant="gold" className="text-[10px]">
                  Active Student
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-[#F4DCD6]/85">
                Student ID: <span className="font-mono text-[#E8B520]">FA-2026-0842</span> • {studentEmail}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-[#E8B520]">
                <Award className="w-4 h-4" />
                <span>Central Govt Vocational Certification Enrolled</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={facultyWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20b858] transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Doubt Clearing with Faculty
            </a>
            <Link href="/contest" className="w-full sm:w-auto">
              <Button variant="gold" size="sm" className="w-full gap-1.5 shadow-gold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Contest</span>
              </Button>
            </Link>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white hover:text-[#4A2511]">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#4A2511]/10 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7A6458] font-medium uppercase tracking-wider">
              Enrolled Courses
            </span>
            <BookOpen className="w-4 h-4 text-[#E8B520]" />
          </div>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2511]">
            2 Active
          </span>
          <p className="text-[11px] text-[#7A6458] mt-1">Self Designing & Aari</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#4A2511]/10 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7A6458] font-medium uppercase tracking-wider">
              Step Progress
            </span>
            <Layers className="w-4 h-4 text-[#E8B520]" />
          </div>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2511]">
            48 / 74
          </span>
          <p className="text-[11px] text-[#7A6458] mt-1">65% Curriculum Done</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#4A2511]/10 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7A6458] font-medium uppercase tracking-wider">
              Govt Certificate
            </span>
            <Award className="w-4 h-4 text-[#E8B520]" />
          </div>
          <span className="font-heading text-xl sm:text-2xl font-bold text-[#8F6C07]">
            Stage 2 of 4
          </span>
          <p className="text-[11px] text-[#7A6458] mt-1">Syllabus Review Active</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#4A2511]/10 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7A6458] font-medium uppercase tracking-wider">
              Next Class
            </span>
            <Calendar className="w-4 h-4 text-[#E8B520]" />
          </div>
          <span className="font-heading text-xl sm:text-2xl font-bold text-[#4A2511]">
            Tomorrow, 10 AM
          </span>
          <p className="text-[11px] text-[#7A6458] mt-1">Princess Cut Blouse Demo</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#4A2511]/10 pb-3">
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-colors ${
            activeTab === "courses"
              ? "bg-[#4A2511] text-[#E8B520] shadow-sm"
              : "text-[#4A2511] hover:bg-[#F4DCD6]/40"
          }`}
        >
          My Enrolled Modules
        </button>
        <button
          onClick={() => setActiveTab("certificate")}
          className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-colors ${
            activeTab === "certificate"
              ? "bg-[#4A2511] text-[#E8B520] shadow-sm"
              : "text-[#4A2511] hover:bg-[#F4DCD6]/40"
          }`}
        >
          Certificate Tracker
        </button>
      </div>

      {/* Tab 1: Enrolled Courses */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          {/* Course 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#4A2511]/10 shadow-soft hover:shadow-soft-lg transition-all space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">In Progress</Badge>
                  <span className="text-xs text-[#7A6458]">Hybrid Mode</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#4A2511]">
                  Self Designing Course (74 Practical Steps)
                </h3>
                <p className="text-xs text-[#7A6458]">
                  Mentor: Suguna Shanmugam • Batch: Weekdays Morning
                </p>
              </div>

              <Link href="/courses/self-designing-course">
                <Button variant="gold" size="sm" className="gap-2">
                  <span>Continue Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#4A2511] font-semibold">
                <span>Progress (48 / 74 steps completed)</span>
                <span>65%</span>
              </div>
              <div className="w-full h-3 bg-[#FBF6EE] rounded-full overflow-hidden border border-[#4A2511]/10">
                <div className="h-full bg-gradient-to-r from-[#E8B520] to-[#dfa711] rounded-full w-[65%]" />
              </div>
            </div>

            {/* Next Upcoming Lesson */}
            <div className="p-4 bg-[#FBF6EE] rounded-2xl border border-[#4A2511]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F6C07]">
                  Next Practical Step
                </span>
                <p className="font-bold text-[#4A2511]">
                  Step 49: Princess Cut Padded Cup Drafting & Armhole Balance
                </p>
              </div>
              <a
                href={facultyWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8B520] font-semibold hover:underline flex items-center gap-1"
              >
                Submit Assignment Draft →
              </a>
            </div>
          </div>

          {/* Course 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#4A2511]/10 shadow-soft hover:shadow-soft-lg transition-all space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="blush">Active</Badge>
                  <span className="text-xs text-[#7A6458]">Online Video Access</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#4A2511]">
                  Advanced Aari Embroidery (79 Stitches)
                </h3>
                <p className="text-xs text-[#7A6458]">
                  Zardozi Gold Wire & 3D Organza Cutwork
                </p>
              </div>

              <Link href="/courses/advanced-aari-embroidery">
                <Button variant="primary" size="sm" className="gap-2">
                  <span>Resume Learning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#4A2511] font-semibold">
                <span>Progress (23 / 92 steps completed)</span>
                <span>25%</span>
              </div>
              <div className="w-full h-3 bg-[#FBF6EE] rounded-full overflow-hidden border border-[#4A2511]/10">
                <div className="h-full bg-gradient-to-r from-[#4A2511] to-[#7A6458] rounded-full w-[25%]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Certificate Tracker */}
      {activeTab === "certificate" && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#4A2511]/10 shadow-soft space-y-8">
          <div className="space-y-2">
            <h3 className="font-heading text-2xl font-bold text-[#4A2511]">
              Central Government Certificate Status
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6458]">
              Your vocational diploma is tracked under the National Skill Qualification Framework.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#25D366]/20 text-[#128C7E] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading text-base font-bold text-[#4A2511]">
                  Stage 1: Enrolment & Document Verification
                </h4>
                <p className="text-xs text-[#7A6458]">
                  Aadhaar, photo submission, and batch registration completed on 12-Feb-2026.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#E8B520]/20 text-[#8F6C07] flex items-center justify-center shrink-0 animate-pulse">
                <Clock className="w-5 h-5 text-[#E8B520]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading text-base font-bold text-[#4A2511]">
                  Stage 2: Practical Pattern Submissions (In Progress)
                </h4>
                <p className="text-xs text-[#7A6458]">
                  8 of 12 garments audited by Suguna Shanmugam. Remaining: Princess cut blouse and umbrella gown.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 opacity-50">
              <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold">3</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-heading text-base font-bold text-[#4A2511]">
                  Stage 3: Examination & Evaluator Clearance
                </h4>
                <p className="text-xs text-[#7A6458]">
                  Scheduled following completion of all 74 practical steps.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 opacity-50">
              <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold">4</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-heading text-base font-bold text-[#4A2511]">
                  Stage 4: Certificate Dispatch & Graduation
                </h4>
                <p className="text-xs text-[#7A6458]">
                  Physical hard copy certificate and digital verification QR code issue.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
