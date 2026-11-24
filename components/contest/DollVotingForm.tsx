"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  Instagram,
  UploadCloud,
  FileCheck,
  Search,
  ExternalLink,
  Lock,
  UserCheck,
  Send,
  Heart,
  X,
  AlertCircle,
} from "lucide-react";
import { INITIAL_DOLLS, DollItem } from "@/data/dollContest";
import { submitDollVoteAction } from "@/lib/actions/contest";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";

const ClerkAuthSection = dynamic(
  () =>
    import("@/components/contest/ClerkAuthSection").then(
      (mod) => mod.ClerkAuthSection
    ),
  {
    ssr: false,
    loading: () => (
      <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/50 flex items-center gap-3 animate-pulse">
        <div className="w-9 h-9 rounded-full bg-amber-200" />
        <div className="space-y-1">
          <div className="h-4 w-36 bg-amber-200 rounded" />
          <div className="h-3 w-56 bg-amber-100 rounded" />
        </div>
      </div>
    ),
  }
);

export function DollVotingForm({
  imageOverrides = {},
}: {
  imageOverrides?: Record<number, string>;
}) {
  const [authState, setAuthState] = useState<{
    isSignedIn: boolean;
    name?: string;
    email?: string;
  }>({ isSignedIn: true });

  const [selectedDollNum, setSelectedDollNum] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [voterName, setVoterName] = useState("");
  const [voterPhone, setVoterPhone] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [comment, setComment] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState<string>("");

  const [isPending, startTransition] = useTransition();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAuthChange = React.useCallback(
    (auth: { isSignedIn: boolean; name?: string; email?: string }) => {
      setAuthState(auth);
      if (auth.name && !voterName) {
        setVoterName(auth.name);
      }
    },
    [voterName]
  );

  // Compute 100 dolls with any admin photo overrides
  const dolls = INITIAL_DOLLS.map((d) => ({
    ...d,
    imageUrl: imageOverrides[d.number] || d.imageUrl,
  }));

  const filteredDolls = dolls.filter(
    (d) =>
      d.number.toString().includes(searchTerm) ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedDoll =
    dolls.find((d) => d.number === selectedDollNum) || dolls[0];

  // Handle local screenshot file upload preview
  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!authState.isSignedIn) {
      setErrorMessage("Please sign in or complete verification to submit your vote.");
      return;
    }

    if (!voterName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!voterPhone.trim()) {
      setErrorMessage("Please enter your contact phone number.");
      return;
    }

    if (!instagramId.trim()) {
      setErrorMessage("Please enter your Instagram ID / handle.");
      return;
    }

    startTransition(async () => {
      const res = await submitDollVoteAction({
        dollNumber: selectedDollNum,
        voterName: voterName.trim(),
        voterEmail: authState.email || "voter@fashionart.com",
        voterPhone: voterPhone.trim(),
        instagramId: instagramId.trim(),
        screenshotUrl: screenshotPreview || "/images/gallery/piano-couture-gown.webp",
        comment: comment.trim(),
      });

      if (res.success) {
        setSubmitSuccess(true);
      } else {
        setErrorMessage(res.message);
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#4A2511] via-[#2A1409] to-[#4A2511] text-white p-8 sm:p-12 rounded-3xl border border-[#E8B520]/40 shadow-2xl relative overflow-hidden text-center space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8B520]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8B520] text-[#4A2511] text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5 fill-current" />
          <span>Annual Creative Doll Contest 2026</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-bold max-w-3xl mx-auto leading-tight">
          Vote for Your Favorite Handcrafted Doll (1 to 100)
        </h1>

        <p className="text-sm sm:text-base text-[#F4DCD6]/85 max-w-2xl mx-auto leading-relaxed">
          Select your favorite student-designed bridal doll, verify your
          Instagram follow, and submit your official vote!
        </p>

        {/* Instagram Follow Callout */}
        <div className="pt-2">
          <a
            href="https://www.instagram.com/fashion_art_cbe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-semibold text-xs uppercase tracking-wider hover:scale-105 transition-transform shadow-md"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @fashion_art_cbe on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Google-Form Style Voting Container */}
      <div className="bg-white rounded-3xl border-2 border-[#4A2511]/15 shadow-xl overflow-hidden">
        {/* Form Title Header Strip */}
        <div className="h-4 bg-gradient-to-r from-[#4A2511] via-[#E8B520] to-[#4A2511]" />

        <div className="p-6 sm:p-10 space-y-10">
          {/* Authentication & Verification Section */}
          <ClerkAuthSection onAuthChange={handleAuthChange} />

          {/* =========================================================================
              STEP 1: CHOOSE 1 TO 100 FAVORITE DOLL
             ========================================================================= */}
          <div className="space-y-6 pt-2 border-t border-[#4A2511]/10">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8B520]">
                Step 1 of 3
              </span>
              <h2 className="font-heading text-2xl font-bold text-[#4A2511]">
                Choose Your Favorite Doll (1 to 100)
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6458]">
                Browse the 100 handcrafted dolls created by our students. Click on
                any doll card or number to select your favorite.
              </p>
            </div>

            {/* Selected Doll Spotlight */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border-2 border-[#E8B520] flex flex-col sm:flex-row items-center gap-6 shadow-sm">
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-xl overflow-hidden shadow-md bg-black shrink-0">
                <Image
                  src={selectedDoll.imageUrl}
                  alt={selectedDoll.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#E8B520] text-[#4A2511] font-mono font-bold text-xs shadow">
                  #{selectedDoll.number}
                </div>
              </div>

              <div className="space-y-3 flex-1 text-center sm:text-left">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#4A2511] text-[#E8B520]">
                  Currently Selected Doll
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#4A2511]">
                  {selectedDoll.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A6458]">
                  Handcrafted traditional silhouette with authentic Aari
                  embroidery and temple border accents.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-semibold text-[#8F6C07]">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>{selectedDoll.votesCount} Total Community Votes</span>
                </div>
              </div>
            </div>

            {/* Doll Quick Search & Number Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A2511]">
                  Quick Doll Selector (1 to 100)
                </label>
                <div className="relative w-44 sm:w-56">
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

              {/* Number Buttons Bar (1 to 100) */}
              <div className="max-h-56 overflow-y-auto p-3 rounded-2xl bg-[#FAF7F2] border border-[#4A2511]/10 grid grid-cols-5 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-20 gap-2">
                {filteredDolls.map((doll) => {
                  const isSelected = selectedDollNum === doll.number;
                  return (
                    <button
                      key={doll.number}
                      type="button"
                      onClick={() => setSelectedDollNum(doll.number)}
                      className={`h-10 rounded-xl font-bold text-xs transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-[#4A2511] text-[#E8B520] shadow-md scale-105 ring-2 ring-[#E8B520]"
                          : "bg-white text-[#4A2511] border border-[#4A2511]/15 hover:bg-[#F4DCD6]/60"
                      }`}
                      title={doll.title}
                    >
                      <span>#{doll.number}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =========================================================================
              STEP 2: VOTER CREDENTIALS & INSTAGRAM VERIFICATION
             ========================================================================= */}
          <form onSubmit={handleSubmit} className="space-y-8 pt-4 border-t border-[#4A2511]/10">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8B520]">
                Step 2 of 3
              </span>
              <h2 className="font-heading text-2xl font-bold text-[#4A2511]">
                Voter Details & Instagram Follow Proof
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6458]">
                Please enter your accurate contact details and Instagram username
                to validate your vote.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Voter Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A2511] block">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={voterName}
                  onChange={(e) => setVoterName(e.target.value)}
                  placeholder="e.g. Priya Sundaram"
                  className="w-full px-4 py-3 rounded-xl border border-[#4A2511]/20 focus:border-[#E8B520] outline-none text-sm text-[#4A2511] transition-all"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A2511] block">
                  WhatsApp / Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={voterPhone}
                  onChange={(e) => setVoterPhone(e.target.value)}
                  placeholder="e.g. 9843211223"
                  className="w-full px-4 py-3 rounded-xl border border-[#4A2511]/20 focus:border-[#E8B520] outline-none text-sm text-[#4A2511] transition-all"
                />
              </div>

              {/* Instagram ID */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A2511] block">
                  Your Instagram ID / Handle <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Instagram className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#dc2743]" />
                  <input
                    type="text"
                    required
                    value={instagramId}
                    onChange={(e) => setInstagramId(e.target.value)}
                    placeholder="e.g. @priya_designs"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#4A2511]/20 focus:border-[#E8B520] outline-none text-sm text-[#4A2511] transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#7A6458]">
                  Make sure you follow{" "}
                  <a
                    href="https://www.instagram.com/fashion_art_cbe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#dc2743] underline"
                  >
                    @fashion_art_cbe
                  </a>{" "}
                  so our judges can verify your voter entry!
                </p>
              </div>

              {/* Instagram Follow Screenshot Upload */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A2511] block">
                  Upload Instagram Follow Screenshot (Proof)
                </label>
                <div className="p-6 rounded-2xl border-2 border-dashed border-[#4A2511]/25 hover:border-[#E8B520] transition-colors bg-[#FAF7F2] text-center space-y-3 cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-8 h-8 text-[#E8B520] mx-auto" />
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-[#4A2511]">
                      Click or drag screenshot of following @fashion_art_cbe
                    </p>
                    <p className="text-[11px] text-[#7A6458]">
                      PNG, JPG, or WEBP (Max 5MB)
                    </p>
                  </div>

                  {screenshotName && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>{screenshotName}</span>
                    </div>
                  )}
                </div>

                {screenshotPreview && (
                  <div className="mt-2 relative w-32 h-32 rounded-xl overflow-hidden border border-[#4A2511]/20 shadow">
                    <Image
                      src={screenshotPreview}
                      alt="Screenshot preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Optional Comment */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A2511] block">
                  Why is this doll your favorite? (Optional)
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you loved: the bridal drape, jewellery crafting, color combination, etc."
                  className="w-full px-4 py-3 rounded-xl border border-[#4A2511]/20 focus:border-[#E8B520] outline-none text-sm text-[#4A2511] transition-all resize-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Celebration */}
            {submitSuccess && (
              <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 space-y-2 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-heading text-xl font-bold">
                  Vote Cast Successfully for Doll #{selectedDollNum}!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-700">
                  Thank you, {voterName}! Your vote and Instagram ID ({instagramId})
                  have been recorded. The final winner will be announced at our
                  annual fashion gala.
                </p>
              </div>
            )}

            {/* =========================================================================
                STEP 3: SUBMIT VOTE (CLERK GATED)
               ========================================================================= */}
            <div className="pt-4 border-t border-[#4A2511]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#7A6458]">
                <span>Selected: </span>
                <strong className="text-[#4A2511]">
                  Doll #{selectedDollNum} ({selectedDoll.title})
                </strong>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={isPending || submitSuccess || !authState.isSignedIn}
                className="w-full sm:w-auto shadow-gold px-8 gap-2"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isPending
                    ? "Submitting Vote..."
                    : `Cast Vote for Doll #${selectedDollNum}`}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
