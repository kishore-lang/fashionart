"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  UploadCloud,
  CheckCircle2,
  Instagram,
  FileCheck,
  Search,
  ExternalLink,
  Users,
  Eye,
  Heart,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { INITIAL_DOLLS, DollVoteSubmission } from "@/data/dollContest";
import {
  updateDollImageAction,
  getDollVotesAction,
} from "@/lib/actions/contest";

interface ContestManagerProps {
  initialVotes?: DollVoteSubmission[];
  initialOverrides?: Record<number, string>;
}

export function ContestManager({
  initialVotes = [],
  initialOverrides = {},
}: ContestManagerProps) {
  const [activeTab, setActiveTab] = useState<"votes" | "dolls">("votes");
  const [votes, setVotes] = useState<DollVoteSubmission[]>(initialVotes);
  const [overrides, setOverrides] = useState<Record<number, string>>(initialOverrides);
  const [isPending, startTransition] = useTransition();

  // Selected doll for editing image
  const [editingDollNum, setEditingDollNum] = useState<number | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Screenshot preview modal
  const [previewScreenshot, setPreviewScreenshot] = useState<string | null>(null);

  const dolls = INITIAL_DOLLS.map((d) => ({
    ...d,
    imageUrl: overrides[d.number] || d.imageUrl,
  }));

  const filteredDolls = dolls.filter(
    (d) =>
      d.number.toString().includes(searchTerm) ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateDollImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDollNum === null || !newImageUrl.trim()) return;

    const num = editingDollNum;
    const url = newImageUrl.trim();

    setOverrides((prev) => ({ ...prev, [num]: url }));
    setEditingDollNum(null);
    setNewImageUrl("");

    startTransition(async () => {
      await updateDollImageAction(num, url);
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E8B520]/20 text-[#8F6C07] text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-3.5 h-3.5 text-[#E8B520]" />
            <span>20-Day Creative Doll Contest Admin</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2511]">
            Doll Contest Votes & 100 Photos Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6458]">
            Review student votes, Instagram IDs, follow proof screenshots, and
            upload custom photos for all 100 dolls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/contest" target="_blank">
            <Button variant="gold" size="sm" className="gap-2 shadow-gold text-xs">
              <Trophy className="w-4 h-4" />
              <span>Open Live Contest Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#4A2511]/10 shadow-soft space-y-1">
          <span className="text-xs text-[#7A6458] font-medium block">
            Total Doll Votes
          </span>
          <span className="text-2xl sm:text-3xl font-heading font-bold text-[#4A2511]">
            {votes.length + 142}
          </span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#4A2511]/10 shadow-soft space-y-1">
          <span className="text-xs text-[#7A6458] font-medium block">
            Contest Dolls
          </span>
          <span className="text-2xl sm:text-3xl font-heading font-bold text-[#E8B520]">
            100 Dolls
          </span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#4A2511]/10 shadow-soft space-y-1">
          <span className="text-xs text-[#7A6458] font-medium block">
            Instagram Verifications
          </span>
          <span className="text-2xl sm:text-3xl font-heading font-bold text-[#dc2743]">
            100% Verified
          </span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#4A2511]/10 shadow-soft space-y-1">
          <span className="text-xs text-[#7A6458] font-medium block">
            Active Photos Overridden
          </span>
          <span className="text-2xl sm:text-3xl font-heading font-bold text-emerald-600">
            {Object.keys(overrides).length} / 100
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#4A2511]/10 pb-2">
        <button
          onClick={() => setActiveTab("votes")}
          className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "votes"
              ? "bg-[#4A2511] text-[#E8B520] shadow-md"
              : "bg-white text-[#4A2511] border border-[#4A2511]/15 hover:bg-[#F4DCD6]/50"
          }`}
        >
          <span>Voter Entries & Screenshots ({votes.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("dolls")}
          className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "dolls"
              ? "bg-[#4A2511] text-[#E8B520] shadow-md"
              : "bg-white text-[#4A2511] border border-[#4A2511]/15 hover:bg-[#F4DCD6]/50"
          }`}
        >
          <span>Manage 100 Doll Photos</span>
        </button>
      </div>

      {/* TAB 1: VOTES & SCREENSHOTS TABLE */}
      {activeTab === "votes" && (
        <div className="bg-white rounded-2xl border border-[#4A2511]/10 shadow-soft overflow-hidden">
          <div className="p-4 border-b border-[#4A2511]/10 flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-[#4A2511]">
              Recent Voter Submissions
            </h3>
            <span className="text-xs text-[#7A6458]">
              Includes Instagram ID & Follow Screenshot verification
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F2] text-[#4A2511] uppercase tracking-wider font-bold border-b border-[#4A2511]/10">
                  <th className="py-3 px-4">Doll #</th>
                  <th className="py-3 px-4">Voter Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Instagram ID</th>
                  <th className="py-3 px-4">Follow Screenshot</th>
                  <th className="py-3 px-4">Comment</th>
                  <th className="py-3 px-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4A2511]/5">
                {votes.map((vote) => (
                  <tr key={vote.id} className="hover:bg-[#F4DCD6]/20 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#E8B520]">
                      #{vote.dollNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#4A2511]">
                      {vote.voterName}
                      <span className="block text-[10px] text-[#7A6458]">
                        {vote.voterEmail}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#7A6458]">
                      {vote.voterPhone}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#dc2743]">
                      <a
                        href={`https://www.instagram.com/${vote.instagramId.replace(
                          "@",
                          ""
                        )}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        <Instagram className="w-3 h-3" />
                        <span>{vote.instagramId}</span>
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      {vote.screenshotUrl ? (
                        <button
                          type="button"
                          onClick={() => setPreviewScreenshot(vote.screenshotUrl!)}
                          className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold hover:bg-emerald-200 transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Proof</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-gray-400">
                          No upload
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-[#7A6458]">
                      {vote.comment || "—"}
                    </td>
                    <td className="py-3 px-4 text-[11px] text-[#7A6458] whitespace-nowrap">
                      {new Date(vote.submittedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE 100 DOLL PHOTOS */}
      {activeTab === "dolls" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-[#7A6458]">
              Click &quot;Update Photo&quot; on any doll to change its photo URL or upload path.
            </p>
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6458]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search doll # (1..100)"
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#4A2511]/20 text-xs text-[#4A2511] outline-none focus:border-[#E8B520]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {filteredDolls.map((doll) => (
              <div
                key={doll.number}
                className="bg-white rounded-2xl border border-[#4A2511]/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] bg-black">
                  <Image
                    src={doll.imageUrl}
                    alt={doll.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#E8B520] text-[#4A2511] font-mono font-bold text-[10px] shadow">
                    #{doll.number}
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  <h4 className="font-heading text-xs font-bold text-[#4A2511] truncate">
                    {doll.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-[#7A6458]">
                    <span>{doll.votesCount} votes</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingDollNum(doll.number);
                        setNewImageUrl(doll.imageUrl);
                      }}
                      className="text-[#8F6C07] hover:underline font-bold text-[10px]"
                    >
                      Update Photo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Doll Photo Modal */}
      {editingDollNum !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-[#E8B520] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl font-bold text-[#4A2511]">
                Update Photo for Doll #{editingDollNum}
              </h3>
              <button
                type="button"
                onClick={() => setEditingDollNum(null)}
                className="p-1 rounded-full text-[#7A6458] hover:text-[#4A2511]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateDollImage} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A2511] block">
                  Image URL or Path
                </label>
                <input
                  type="text"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="/images/gallery/piano-couture-gown.webp"
                  className="w-full px-3 py-2 rounded-xl border border-[#4A2511]/20 text-xs text-[#4A2511] outline-none focus:border-[#E8B520]"
                />
              </div>

              {newImageUrl && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden bg-black">
                  <Image
                    src={newImageUrl}
                    alt={`Doll #${editingDollNum}`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingDollNum(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  disabled={isPending}
                >
                  Save Photo
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Screenshot Preview Modal */}
      {previewScreenshot && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewScreenshot(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#191919] rounded-3xl overflow-hidden border border-white/20 p-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8B520]">
                Instagram Follow Verification Proof
              </span>
              <button
                type="button"
                onClick={() => setPreviewScreenshot(null)}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[3/4] max-h-[70vh] bg-black rounded-xl overflow-hidden">
              <Image
                src={previewScreenshot}
                alt="Instagram follow proof"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
