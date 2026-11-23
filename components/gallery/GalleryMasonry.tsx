"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Filter } from "lucide-react";
import { GallerySeedItem } from "@/data/seedPhase2";
import { Badge } from "@/components/ui/Badge";

const CATEGORIES = [
  "All",
  "Bridal Blouses",
  "Couture Gowns",
  "Aari Embroidery",
  "Terracotta",
  "Student Fests",
];

export function GalleryMasonry({ initialItems }: { initialItems: GallerySeedItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? initialItems
      : initialItems.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const currentItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                isSelected
                  ? "bg-[#4A2511] text-[#E8B520] shadow-md scale-105"
                  : "bg-white text-[#4A2511] border border-[#4A2511]/15 hover:bg-[#F4DCD6]/50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Masonry Grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-soft-lg border border-[#4A2511]/10 transition-all duration-300"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F4DCD6]/30">
                <Image
                  src={item.imageUrl}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2511]/90 via-[#4A2511]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <Badge variant="gold" className="text-[10px]">
                      {item.category}
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <p className="text-white text-xs sm:text-sm font-medium line-clamp-3 leading-relaxed">
                      {item.caption}
                    </p>
                    <span className="text-[11px] text-[#E8B520] font-semibold mt-2 inline-block">
                      Click to expand photo →
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption Bar beneath photo for mobile accessibility */}
              <div className="p-4 bg-white sm:hidden border-t border-[#4A2511]/5">
                <span className="text-[10px] font-bold text-[#E8B520] uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <p className="text-xs text-[#7A6458] line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Modal Container */}
            <div
              className="relative max-w-4xl w-full bg-[#4A2511] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#E8B520]/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Badge variant="gold">{currentItem.category}</Badge>
                  <span className="text-xs text-[#F4DCD6]/70">
                    Photo {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                </div>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full max-h-[65vh] bg-black/40">
                <Image
                  src={currentItem.imageUrl}
                  alt={currentItem.caption}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1000px"
                  className="object-contain"
                />

                {/* Left / Right Nav Arrows */}
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev > 0
                        ? prev - 1
                        : filteredItems.length - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#E8B520] hover:text-[#4A2511] text-white flex items-center justify-center transition-colors shadow-lg"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev < filteredItems.length - 1
                        ? prev + 1
                        : 0
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#E8B520] hover:text-[#4A2511] text-white flex items-center justify-center transition-colors shadow-lg"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Footer Caption */}
              <div className="p-6 bg-[#351A0C] border-t border-white/10">
                <p className="text-sm sm:text-base text-[#FBF6EE] leading-relaxed">
                  {currentItem.caption}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-[#E8B520]">
                  <span>Fashion Art Institute for Creative Skills • Coimbatore</span>
                  <span className="hidden sm:inline">Use ← → keys to navigate</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
