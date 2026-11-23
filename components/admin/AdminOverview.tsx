"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import {
  MessageSquareText,
  BookOpen,
  Image as ImageIcon,
  Trophy,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AdminEnquiry } from "@/data/seedAdmin";
import { updateEnquiryStatusAction } from "@/lib/actions/admin";

interface AdminOverviewProps {
  stats: {
    totalEnquiries: number;
    newEnquiries: number;
    totalCourses: number;
    publishedCourses: number;
    totalGalleryItems: number;
    totalContestEntries: number;
    totalVotes: number;
    recentEnquiries: AdminEnquiry[];
  };
}

export function AdminOverview({ stats }: AdminOverviewProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id: string, status: "new" | "contacted" | "enrolled" | "closed") => {
    startTransition(async () => {
      await updateEnquiryStatusAction(id, status);
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome & Banner */}
      <div className="bg-gradient-to-r from-[#4A2511] via-[#5C2E15] to-[#381B0C] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-[#E8B520]/30">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B520]/20 border border-[#E8B520]/40 text-[#E8B520] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Director Suguna &bull; Institute Control Center</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#FBF6EE]">
            Fashion Art Institute Administration
          </h1>
          <p className="text-xs sm:text-sm text-[#FBF6EE]/80 leading-relaxed">
            Manage course curriculum, student admission enquiries from Gandhipuram & across Tamil Nadu, media gallery, and the annual student designer voting showcase.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
          <Link href="/admin/enquiries">
            <Button variant="gold" size="sm" className="gap-2 shadow-gold text-xs">
              <MessageSquareText className="w-4 h-4" />
              <span>Review Enquiries ({stats.newEnquiries} New)</span>
            </Button>
          </Link>
          <Link href="/admin/courses">
            <Button variant="secondary" size="sm" className="gap-2 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20">
              <PlusCircle className="w-4 h-4 text-[#E8B520]" />
              <span>Manage Courses</span>
            </Button>
          </Link>
          <Link href="/contest" target="_blank">
            <Button variant="ghost" size="sm" className="gap-2 text-xs text-[#FBF6EE]/80 hover:text-white hover:bg-white/10">
              <span>View Live Contest</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#E8B520]/10 blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Enquiries Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#4A2511]/10 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#7A6458] uppercase tracking-wider">
              Student Enquiries
            </span>
            <div className="font-heading text-3xl font-bold text-[#4A2511]">
              {stats.totalEnquiries}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>{stats.newEnquiries} awaiting response</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
            <MessageSquareText className="w-5 h-5" />
          </div>
        </div>

        {/* Courses Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#4A2511]/10 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#7A6458] uppercase tracking-wider">
              Active Courses
            </span>
            <div className="font-heading text-3xl font-bold text-[#4A2511]">
              {stats.totalCourses}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{stats.publishedCourses} published live</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        {/* Gallery Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#4A2511]/10 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#7A6458] uppercase tracking-wider">
              Gallery Media
            </span>
            <div className="font-heading text-3xl font-bold text-[#4A2511]">
              {stats.totalGalleryItems}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#8F6C07] font-medium">
              <span>Bridal & Aari Showcase</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#FBF6EE] text-[#8F6C07] flex items-center justify-center border border-[#E8B520]/30">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>

        {/* Contest Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#4A2511]/10 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#7A6458] uppercase tracking-wider">
              Contest Votes
            </span>
            <div className="font-heading text-3xl font-bold text-[#4A2511]">
              {stats.totalVotes}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-purple-700 font-medium">
              <Trophy className="w-3.5 h-3.5 text-purple-600" />
              <span>{stats.totalContestEntries} student entries</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
            <Trophy className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#4A2511]/10 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4A2511]/10">
          <div>
            <h2 className="font-heading text-xl font-bold text-[#4A2511]">
              Recent Student Enquiries
            </h2>
            <p className="text-xs text-[#7A6458]">
              Prospective students asking for syllabus, fee structure, and offline batch timings.
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8F6C07] hover:text-[#4A2511]"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#4A2511]/10 text-[#7A6458] font-semibold">
                <th className="py-3 px-3">Student</th>
                <th className="py-3 px-3">Course / Interest</th>
                <th className="py-3 px-3">Message</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4A2511]/5">
              {stats.recentEnquiries.map((enq) => {
                const whatsappMsg = encodeURIComponent(
                  `Vanakkam ${enq.name}! Thank you for enquiring about Fashion Art Institute, Gandhipuram, Coimbatore. Regarding your interest in ${enq.courseTitle}, our next batch starts soon. Would you like to visit our campus or join a demo session?`
                );

                return (
                  <tr key={enq.id} className="hover:bg-[#FBF6EE]/40 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-[#4A2511]">{enq.name}</div>
                      <div className="text-xs text-[#7A6458] flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#E8B520]" />
                          {enq.phone}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-medium text-[#4A2511]">{enq.courseTitle}</span>
                    </td>
                    <td className="py-3.5 px-3 max-w-xs truncate text-[#7A6458]">
                      {enq.message}
                    </td>
                    <td className="py-3.5 px-3">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          handleStatusChange(
                            enq.id,
                            e.target.value as "new" | "contacted" | "enrolled" | "closed"
                          )
                        }
                        disabled={isPending}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          enq.status === "new"
                            ? "bg-amber-50 text-amber-800 border-amber-300"
                            : enq.status === "contacted"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : enq.status === "enrolled"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <a
                        href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-sm"
                      >
                        <MessageSquareText className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
