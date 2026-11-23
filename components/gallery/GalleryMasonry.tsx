"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Instagram,
  ExternalLink,
  Play,
  Share2,
} from "lucide-react";
import { GallerySeedItem } from "@/data/seedPhase2";
import { Badge } from "@/components/ui/Badge";
import { INSTAGRAM_REELS, InstagramReelItem } from "@/data/instagramContent";

const CATEGORIES = [
  "All",
  "Student Ateliers",
  "Couture Gowns",
  "Bridal Blouses",
  "Aari Embroidery",
  "Terracotta",
  "Student Fests",
];

export function GalleryMasonry({
  initialItems,
}: {
  initialItems: GallerySeedItem[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeReel, setActiveReel] = useState<InstagramReelItem | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? initialItems
      : initialItems.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
          );
        }
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) =>
            prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
          );
        }
      }
      if (activeReel !== null && e.key === "Escape") {
        setActiveReel(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, activeReel, filteredItems.length]);

  const currentItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="space-y-14">
      {/* =========================================================================
          INSTAGRAM REELS SPOTLIGHT RIBBON (TOP OF GALLERY)
         ========================================================================= */}
      <div className="bg-gradient-to-r from-[#4A2511] via-[#2A1409] to-[#4A2511] rounded-3xl p-6 sm:p-8 text-white border border-[#E8B520]/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 border border-[#dc2743]/40 text-xs font-semibold uppercase tracking-wider text-[#E8B520]">
              <Instagram className="w-3.5 h-3.5 text-[#dc2743]" />
              <span>Viral Reels Reel-Stream</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold">
              Student Couturiers & Runway In Motion
            </h3>
          </div>

          <a
            href="https://www.instagram.com/fashion_art_cbe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-md shrink-0 self-start sm:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>@fashion_art_cbe</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Horizontal Reels Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {INSTAGRAM_REELS.slice(0, 5).map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReel(reel)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-black/40 border border-white/10 hover:border-[#E8B520] transition-all p-3 space-y-2 flex flex-col justify-between"
            >
              <div className="relative aspect-[9/13] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 group-hover:opacity-80 transition-opacity" />
                <div className="w-10 h-10 rounded-full bg-[#E8B520] text-[#4A2511] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                  <Play className="w-5 h-5 fill-current translate-x-0.5" />
                </div>
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-black/60 text-[9px] font-mono text-[#E8B520]">
                  {reel.tag}
                </div>
                <div className="absolute bottom-2 left-2 right-2 z-10">
                  <p className="text-[11px] font-heading font-bold text-white line-clamp-2 leading-tight">
                    {reel.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#FAF7F2]/70 font-sans pt-1">
                <span className="truncate">{reel.handle}</span>
                <ExternalLink className="w-3 h-3 text-[#E8B520] shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          CATEGORY FILTER TABS
         ========================================================================= */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-[#4A2511] text-[#E8B520] shadow-md scale-105"
                  : "bg-white text-[#4A2511] border border-[#4A2511]/15 hover:bg-[#F4DCD6]/50"
              }`}
            >
              {cat === "Student Ateliers" && (
                <Instagram className="w-3.5 h-3.5 text-[#dc2743]" />
              )}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          MASONRY GRID (WITH INSTAGRAM POSTS & HAUTE COUTURE PIANO GOWN)
         ========================================================================= */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            const isInsta = item.isInstagramPost;

            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`break-inside-avoid group cursor-pointer relative rounded-3xl overflow-hidden bg-white transition-all duration-300 ${
                  isInsta
                    ? "border-2 border-[#dc2743]/30 shadow-md hover:shadow-xl hover:border-[#dc2743]"
                    : "border border-[#4A2511]/10 shadow-soft hover:shadow-soft-lg hover:border-[#E8B520]/50"
                }`}
                onClick={() => setLightboxIndex(index)}
              >
                {/* Instagram Header Banner if it's an Instagram post */}
                {isInsta && (
                  <div className="p-3.5 px-4 bg-gradient-to-r from-[#FAF7F2] to-white border-b border-[#dc2743]/15 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full p-[1.5px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-[#4A2511]">
                          {item.authorName?.charAt(0) || "A"}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-heading text-xs font-bold text-[#4A2511] leading-none">
                          {item.authorName}
                        </h4>
                        <span className="text-[10px] text-[#7A6458] font-sans">
                          {item.instagramHandle}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#f09433]/15 via-[#dc2743]/15 to-[#bc1888]/15 text-[#dc2743]">
                      Instagram
                    </span>
                  </div>
                )}

                {/* Main Media Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F4DCD6]/30">
                  <Image
                    src={item.imageUrl}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A2511]/95 via-[#4A2511]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <Badge variant="gold" className="text-[10px]">
                        {item.category}
                      </Badge>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-white text-xs sm:text-sm font-medium line-clamp-3 leading-relaxed">
                        {item.caption}
                      </p>
                      <span className="text-[11px] text-[#E8B520] font-semibold inline-block">
                        {isInsta
                          ? "View Post & Details →"
                          : "Click to expand photo →"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Caption Pill */}
                <div className="p-4 sm:p-5 bg-white space-y-2">
                  <p className="text-xs sm:text-sm text-[#4A2511] font-medium line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>

                  {isInsta && item.postUrl && (
                    <div className="pt-2 border-t border-[#4A2511]/5 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-[#dc2743] flex items-center gap-1">
                        <Instagram className="w-3 h-3" />
                        <span>{item.instagramHandle}</span>
                      </span>
                      <a
                        href={item.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-bold text-[#4A2511] hover:text-[#E8B520] flex items-center gap-1"
                      >
                        <span>Open Post</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* =========================================================================
          LIGHTBOX MODAL FOR GALLERY IMAGES & INSTAGRAM POSTS
         ========================================================================= */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Prev Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  lightboxIndex! > 0
                    ? lightboxIndex! - 1
                    : filteredItems.length - 1
                );
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  lightboxIndex! < filteredItems.length - 1
                    ? lightboxIndex! + 1
                    : 0
                );
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <div
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-black/50">
                <Image
                  src={currentItem.imageUrl}
                  alt={currentItem.caption}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Lightbox Caption Card */}
              <div className="mt-4 bg-[#4A2511]/90 backdrop-blur-md text-white p-4 sm:p-5 rounded-2xl max-w-2xl w-full text-center space-y-2 border border-white/10">
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="gold" className="text-[10px]">
                    {currentItem.category}
                  </Badge>
                  {currentItem.isInstagramPost && (
                    <span className="text-[11px] font-semibold text-[#E8B520]">
                      {currentItem.instagramHandle}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#F4DCD6] leading-relaxed">
                  {currentItem.caption}
                </p>

                {currentItem.postUrl && (
                  <div className="pt-2">
                    <a
                      href={currentItem.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold hover:scale-105 transition-transform shadow-md"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>View Live Post on Instagram</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          REEL MODAL (PLAY REELS DIRECTLY)
         ========================================================================= */}
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
              {/* Header */}
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

              {/* Instagram Embed */}
              <div className="relative aspect-[9/16] max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <iframe
                  src={`https://www.instagram.com/reel/${activeReel.reelId}/embed`}
                  className="w-full h-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Footer */}
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
    </div>
  );
}
