"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Instagram,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Volume2,
} from "lucide-react";
import { INSTAGRAM_REELS, InstagramReelItem } from "@/data/instagramContent";

export function InstagramReelsSection() {
  const [activeReel, setActiveReel] = useState<InstagramReelItem | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE4] to-[#FAF7F2] relative overflow-hidden border-b border-[#4A2511]/10">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8B520]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#581C35]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#f09433]/15 via-[#dc2743]/15 to-[#bc1888]/15 border border-[#dc2743]/30 text-xs font-semibold uppercase tracking-wider text-[#4A2511]">
              <Instagram className="w-3.5 h-3.5 text-[#dc2743]" />
              <span>@fashion_art_cbe • Instagram Viral Reels</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A2511] leading-tight">
              Trending Reels & Alumni Ateliers
            </h2>
            <p className="text-sm sm:text-base text-[#7A6458] leading-relaxed">
              Experience our student couturiers in motion, runway celebrations,
              and independent boutique launches from our graduates across Tamil
              Nadu.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/fashion_art_cbe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A2511] text-[#E8B520] font-semibold text-xs uppercase tracking-wider hover:bg-[#E8B520] hover:text-[#4A2511] transition-all shadow-md group"
            >
              <Instagram className="w-4 h-4 text-[#E8B520] group-hover:text-[#4A2511] transition-colors" />
              <span>Follow On Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Reels Horizontal Scroll Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INSTAGRAM_REELS.slice(0, 6).map((reel, idx) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group bg-white rounded-3xl overflow-hidden border border-[#4A2511]/10 shadow-soft hover:shadow-soft-lg hover:border-[#E8B520]/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Reel Card Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#4A2511]/5 bg-[#FAF7F2]/50">
                <a
                  href={reel.handleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                >
                  <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                    <div className="w-full h-full rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#4A2511] font-bold text-xs">
                      {reel.authorName.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#4A2511] leading-none">
                      {reel.authorName}
                    </h4>
                    <span className="text-[11px] text-[#7A6458] font-sans">
                      {reel.handle}
                    </span>
                  </div>
                </a>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E8B520]/20 text-[#8F6C07]">
                  {reel.tag}
                </span>
              </div>

              {/* Reel Card Visual Body */}
              <div
                onClick={() => setActiveReel(reel)}
                className="relative aspect-[9/13] bg-gradient-to-b from-[#2A1409] to-[#120804] overflow-hidden cursor-pointer flex flex-col justify-between p-5 text-white"
              >
                {/* Decorative Reel lines & sheen */}
                <div className="absolute inset-0 bg-radial from-transparent to-black/60 pointer-events-none" />
                <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-mono tracking-wider flex items-center gap-1 border border-white/10">
                  <Instagram className="w-3 h-3 text-[#E8B520]" />
                  <span>Reel</span>
                </div>

                {/* Center Big Play Button */}
                <div className="my-auto mx-auto z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E8B520] group-hover:text-[#4A2511] transition-all duration-300 shadow-2xl">
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  </div>
                  <span className="text-xs uppercase font-semibold tracking-widest text-[#E8B520] opacity-90 group-hover:opacity-100">
                    Watch Reel
                  </span>
                </div>

                {/* Bottom Title on Reel */}
                <div className="relative z-10 space-y-1">
                  <h3 className="font-heading text-lg font-bold leading-snug drop-shadow-md text-white">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 line-clamp-2 font-sans">
                    {reel.caption}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-t border-[#4A2511]/5 bg-white">
                <button
                  onClick={() => setActiveReel(reel)}
                  className="text-xs font-semibold text-[#4A2511] hover:text-[#E8B520] transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 text-[#E8B520]" />
                  <span>Preview Reel</span>
                </button>

                <a
                  href={reel.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#dc2743] hover:underline"
                >
                  <span>Open in Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All on Gallery Banner */}
        <div className="pt-4 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#4A2511]/15 text-[#4A2511] font-semibold text-xs uppercase tracking-wider hover:border-[#E8B520] hover:text-[#E8B520] transition-all shadow-sm"
          >
            <span>Explore All Student Ateliers & Gallery</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Reel Modal with Embedded Instagram Player / Direct Link */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveReel(null)}
          >
            <div
              className="relative w-full max-w-sm sm:max-w-md bg-[#191919] rounded-3xl overflow-hidden border border-[#E8B520]/40 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 px-5 flex items-center justify-between border-b border-white/10 bg-black/40 text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                      {activeReel.authorName.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold leading-tight">
                      {activeReel.authorName}
                    </h4>
                    <span className="text-[10px] text-white/60">
                      {activeReel.handle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveReel(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-red-500 text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Instagram Embed Frame */}
              <div className="relative aspect-[9/16] max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <iframe
                  src={`https://www.instagram.com/reel/${activeReel.reelId}/embed`}
                  className="w-full h-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-black/70 border-t border-white/10 flex items-center justify-between gap-3 text-white">
                <p className="text-xs text-white/80 truncate">
                  {activeReel.title}
                </p>
                <a
                  href={activeReel.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold shadow-md hover:scale-105 transition-transform shrink-0"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Open Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
