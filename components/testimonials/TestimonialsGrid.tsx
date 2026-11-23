"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Play, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { TestimonialSeedItem } from "@/data/seedPhase2";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function TestimonialsGrid({
  testimonials,
}: {
  testimonials: TestimonialSeedItem[];
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = testimonials.filter((t) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Boutique Owners")
      return t.role.toLowerCase().includes("founder") || t.role.toLowerCase().includes("boutique");
    if (activeFilter === "Online")
      return t.location.toLowerCase().includes("online");
    return true;
  });

  return (
    <div className="space-y-12">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {["All", "Boutique Owners", "Online"].map((tab) => {
          const isSelected = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                isSelected
                  ? "bg-[#4A2511] text-[#E8B520] shadow-md"
                  : "bg-white text-[#4A2511] border border-[#4A2511]/15 hover:bg-[#F4DCD6]/50"
              }`}
            >
              {tab === "All" ? "All Reviews" : tab}
            </button>
          );
        })}
      </div>

      {/* Testimonials Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filtered.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-3xl p-8 border border-[#4A2511]/10 shadow-soft hover:shadow-soft-lg hover:border-[#E8B520]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header: Photo & Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#E8B520]/40 shrink-0 bg-[#F4DCD6]">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#4A2511]">
                      {item.name}
                    </h3>
                    <p className="text-xs font-medium text-[#E8B520] line-clamp-1">
                      {item.role}
                    </p>
                    <p className="text-[11px] text-[#7A6458] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#E8B520]" />
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-[#E8B520]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-[#7A6458] leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Course Tag */}
              <div className="mt-6 pt-4 border-t border-[#4A2511]/5 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F6C07] bg-[#E8B520]/15 px-3 py-1 rounded-full">
                  {item.course}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Bottom CTA Card */}
      <div className="rounded-3xl bg-[#F5ECE1] p-8 sm:p-12 border border-[#4A2511]/10 text-center space-y-5 max-w-3xl mx-auto">
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2511]">
          Start Your Success Story Today
        </h3>
        <p className="text-sm text-[#7A6458] max-w-lg mx-auto leading-relaxed">
          Join over 3,500 proud women who turned their passion into a thriving
          boutique business with our hands-on coaching.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/courses">
            <Button variant="gold" size="md" className="gap-2 shadow-gold">
              View Available Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="md">
              Book a Free Institute Visit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
