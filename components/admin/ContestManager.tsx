"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Flame,
  User,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AdminContestEntry } from "@/data/seedAdmin";
import { toggleContestApprovalAction } from "@/lib/actions/admin";

interface ContestManagerProps {
  initialEntries: AdminContestEntry[];
}

export function ContestManager({ initialEntries }: ContestManagerProps) {
  const [entries, setEntries] = useState<AdminContestEntry[]>(initialEntries);
  const [isPending, startTransition] = useTransition();

  const handleToggleApproval = (id: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isApproved: !e.isApproved } : e))
    );
    startTransition(async () => {
      await toggleContestApprovalAction(id);
    });
  };

  const totalVotes = entries.reduce((sum, e) => sum + e.votesCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2511]">
            20-Day Student Designer Contest
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6458]">
            Annual student showcase where couturiers present original garments for public voting.
          </p>
        </div>

        <Link href="/contest" target="_blank">
          <Button variant="gold" size="sm" className="gap-2 shadow-gold text-xs">
            <Trophy className="w-4 h-4" />
            <span>Open Live Contest Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#4A2511]/10 shadow-sm">
          <span className="text-xs font-semibold text-[#7A6458] uppercase tracking-wider">
            Total Design Entries
          </span>
          <div className="font-heading text-3xl font-bold text-[#4A2511] mt-1">
            {entries.length}
          </div>
          <p className="text-xs text-[#8F6C07] mt-1">Across 4 fashion batches</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#4A2511]/10 shadow-sm">
          <span className="text-xs font-semibold text-[#7A6458] uppercase tracking-wider">
            Total Public Votes Cast
          </span>
          <div className="font-heading text-3xl font-bold text-[#4A2511] mt-1">
            {totalVotes}
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-700 mt-1">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Active voting window: Day 8 of 20</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#4A2511]/10 shadow-sm">
          <span className="text-xs font-semibold text-[#7A6458] uppercase tracking-wider">
            Leaderboard Top Rank
          </span>
          <div className="font-heading text-xl font-bold text-[#4A2511] mt-1 truncate">
            {entries[0]?.studentName || "N/A"}
          </div>
          <p className="text-xs text-emerald-700 font-medium mt-1">
            {entries[0]?.votesCount || 0} votes ({entries[0]?.title})
          </p>
        </div>
      </div>

      {/* Contest Submissions Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className="bg-white rounded-3xl border border-[#4A2511]/10 shadow-soft overflow-hidden p-5 flex flex-col sm:flex-row gap-5 items-start justify-between"
          >
            <div className="relative aspect-square w-full sm:w-36 rounded-2xl overflow-hidden shrink-0 bg-[#FBF6EE]">
              <Image
                src={entry.imageUrl}
                alt={entry.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#4A2511]/85 text-[#E8B520] text-[10px] font-bold">
                Rank #{index + 1}
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8B520]/20 text-[#8F6C07]">
                  {entry.category}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    entry.isApproved
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {entry.isApproved ? "Approved Live" : "Pending Review"}
                </span>
              </div>

              <h2 className="font-heading font-bold text-base text-[#4A2511]">
                {entry.title}
              </h2>
              <div className="text-xs text-[#7A6458] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#E8B520]" />
                <span>{entry.studentName}</span>
              </div>

              <p className="text-xs text-[#7A6458] line-clamp-2 leading-relaxed">
                {entry.description}
              </p>

              <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#4A2511]/10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A2511]">
                  <Flame className="w-4 h-4 text-[#E8B520]" />
                  <span>{entry.votesCount} Votes</span>
                </div>

                <button
                  onClick={() => handleToggleApproval(entry.id)}
                  disabled={isPending}
                  className={`text-xs font-medium px-3 py-1 rounded-xl border transition-colors flex items-center gap-1.5 ${
                    entry.isApproved
                      ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  {entry.isApproved ? (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Unpublish</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Live</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
