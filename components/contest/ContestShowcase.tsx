"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import {
  Trophy,
  Flame,
  Heart,
  Share2,
  Calendar,
  Sparkles,
  Medal,
  CheckCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AdminContestEntry } from "@/data/seedAdmin";
import { voteContestEntryAction } from "@/lib/actions/admin";

interface ContestShowcaseProps {
  initialEntries: AdminContestEntry[];
}

export function ContestShowcase({ initialEntries }: ContestShowcaseProps) {
  const [entries, setEntries] = useState<AdminContestEntry[]>(
    [...initialEntries].sort((a, b) => b.votesCount - a.votesCount)
  );
  const [votedIds, setVotedIds] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();

  const handleVote = (id: string) => {
    if (votedIds[id]) return;

    // Optimistic update
    setVotedIds((prev) => ({ ...prev, [id]: true }));
    setEntries((prev) =>
      prev
        .map((e) => (e.id === id ? { ...e, votesCount: e.votesCount + 1 } : e))
        .sort((a, b) => b.votesCount - a.votesCount)
    );

    startTransition(async () => {
      try {
        await voteContestEntryAction(id);
      } catch (err) {
        console.error("Failed to vote:", err);
      }
    });
  };

  const top3 = entries.slice(0, 3);
  const totalVotes = entries.reduce((acc, curr) => acc + curr.votesCount, 0);

  return (
    <div className="space-y-12 py-6">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#4A2511] via-[#5C2E15] to-[#381B0C] p-8 sm:p-12 text-white overflow-hidden shadow-2xl border border-[#E8B520]/30 text-center">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B520]/20 border border-[#E8B520]/40 text-[#E8B520] text-xs font-bold tracking-wide uppercase">
            <Trophy className="w-4 h-4 text-[#E8B520]" />
            <span>Annual Couture Exhibition &bull; 20-Day Contest</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#FBF6EE] leading-tight">
            Student Designer Showcase 2026
          </h1>

          <p className="text-sm sm:text-base text-[#FBF6EE]/80 max-w-2xl mx-auto leading-relaxed">
            Every year, graduating couturiers from Fashion Art Institute draft, pattern, cut, and stitch their signature bridal and couture masterpieces. Cast your vote daily to crown Coimbatore&apos;s Next Master Couturier!
          </p>

          {/* Countdown & Live Stats Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
              <span className="text-[11px] text-[#FBF6EE]/70 uppercase block font-semibold">
                Contest Window
              </span>
              <span className="font-heading font-bold text-lg text-[#E8B520]">
                Day 8 of 20
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
              <span className="text-[11px] text-[#FBF6EE]/70 uppercase block font-semibold">
                Days Left
              </span>
              <span className="font-heading font-bold text-lg text-[#FBF6EE]">
                12 Days
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
              <span className="text-[11px] text-[#FBF6EE]/70 uppercase block font-semibold">
                Total Votes
              </span>
              <span className="font-heading font-bold text-lg text-[#E8B520]">
                {totalVotes}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
              <span className="text-[11px] text-[#FBF6EE]/70 uppercase block font-semibold">
                Grand Prize
              </span>
              <span className="font-heading font-bold text-sm text-[#FBF6EE]">
                ₹25,000 + Trophy
              </span>
            </div>
          </div>
        </div>

        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#E8B520]/15 blur-3xl pointer-events-none" />
      </div>

      {/* Leaderboard Podium Top 3 */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8F6C07] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#E8B520]" />
            <span>Current Top Standings</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2511]">
            Leaderboard Podium
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {top3.map((entry, idx) => {
            const rankBadges = [
              { label: "1st Place (Gold)", bg: "bg-[#E8B520] text-[#4A2511]", height: "md:h-[420px]" },
              { label: "2nd Place (Silver)", bg: "bg-slate-300 text-slate-800", height: "md:h-[390px]" },
              { label: "3rd Place (Bronze)", bg: "bg-amber-600 text-white", height: "md:h-[360px]" },
            ];
            const badge = rankBadges[idx];

            return (
              <div
                key={entry.id}
                className={`bg-white rounded-3xl border border-[#4A2511]/15 shadow-soft p-5 flex flex-col justify-between hover:shadow-hover transition-all ${
                  idx === 0 ? "border-[#E8B520] ring-2 ring-[#E8B520]/30 order-first md:order-2" : idx === 1 ? "order-2 md:order-1" : "order-3"
                }`}
              >
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FBF6EE]">
                    <Image
                      src={entry.imageUrl}
                      alt={entry.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-md ${badge.bg}`}
                    >
                      {badge.label}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F6C07] px-2 py-0.5 rounded-full bg-[#E8B520]/15">
                      {entry.category}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[#4A2511] mt-1 line-clamp-1">
                      {entry.title}
                    </h3>
                    <p className="text-xs text-[#7A6458] flex items-center gap-1 mt-0.5">
                      <User className="w-3.5 h-3.5 text-[#E8B520]" />
                      <span>{entry.studentName}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#4A2511]/10 flex items-center justify-between gap-3 mt-3">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#4A2511]">
                    <Flame className="w-4 h-4 text-[#E8B520]" />
                    <span>{entry.votesCount} Votes</span>
                  </div>

                  <Button
                    variant={votedIds[entry.id] ? "secondary" : "gold"}
                    size="sm"
                    onClick={() => handleVote(entry.id)}
                    disabled={votedIds[entry.id]}
                    className="text-xs gap-1.5 shadow-sm"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        votedIds[entry.id] ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                    <span>{votedIds[entry.id] ? "Voted!" : "Vote Now"}</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Entries Grid */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#4A2511]/10 pb-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#4A2511]">
              All Contestant Creations
            </h2>
            <p className="text-xs text-[#7A6458]">
              Click &quot;Vote Now&quot; to show appreciation for your favorite design. You can vote once per creation per day!
            </p>
          </div>
          <span className="text-xs font-semibold text-[#8F6C07]">
            Showing {entries.length} couturier entries
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map((entry, index) => {
            const isVoted = Boolean(votedIds[entry.id]);
            const whatsappShare = encodeURIComponent(
              `Check out ${entry.studentName}'s creation "${entry.title}" at the Fashion Art Institute Annual Designer Contest! Vote here: https://fashionartonline.com/contest`
            );

            return (
              <div
                key={entry.id}
                className="bg-white rounded-3xl border border-[#4A2511]/10 shadow-soft overflow-hidden p-5 sm:p-6 flex flex-col sm:flex-row gap-5 hover:shadow-hover transition-all"
              >
                <div className="relative aspect-square w-full sm:w-44 rounded-2xl overflow-hidden shrink-0 bg-[#FBF6EE]">
                  <Image
                    src={entry.imageUrl}
                    alt={entry.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#4A2511]/85 text-[#E8B520] text-xs font-bold">
                    Rank #{index + 1}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8B520]/20 text-[#8F6C07]">
                      {entry.category}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[#4A2511]">
                      {entry.title}
                    </h3>
                    <div className="text-xs text-[#7A6458] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#E8B520]" />
                      <span className="font-medium text-[#4A2511]">
                        {entry.studentName}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6458] line-clamp-3 leading-relaxed pt-1">
                      {entry.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#4A2511]/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1 text-sm font-bold text-[#4A2511]">
                      <Flame className="w-4 h-4 text-[#E8B520]" />
                      <span>{entry.votesCount} Votes</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/?text=${whatsappShare}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-[#7A6458] hover:text-[#4A2511] hover:bg-[#FBF6EE] border border-[#4A2511]/10 transition-colors"
                        title="Share on WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </a>

                      <Button
                        variant={isVoted ? "secondary" : "gold"}
                        size="sm"
                        onClick={() => handleVote(entry.id)}
                        disabled={isVoted}
                        className="text-xs gap-1.5 shadow-sm"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isVoted ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        <span>{isVoted ? "Voted!" : "Vote Now"}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
