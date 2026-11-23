"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function WorldRecordBanner() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#4A2511] via-[#351A0C] to-[#4A2511] border-2 border-[#E8B520]/40 p-8 sm:p-12 shadow-2xl text-white"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8B520]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8B520] text-[#4A2511] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Trophy className="w-4 h-4 fill-[#4A2511]" />
              <span>Universal Record Forum (URF) 2022</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Official World Record Holder:
              <br />
              <span className="text-[#E8B520]">
                300 Self-Stitched Garments in 3 Hours
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#F4DCD6]/85 max-w-2xl leading-relaxed">
              In 2022, 50 proud female student designers from Fashion Art
              Institute made global history by drafting, cutting, and stitching
              300 designer outfits in just 3 hours under the official scrutiny of
              the Universal Record Forum.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 text-xs sm:text-sm text-[#FBF6EE]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#E8B520]" />
                <span>50 Women Student Designers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#E8B520]" />
                <span>Zero Machine Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#E8B520]" />
                <span>100% Precision Fitting Audited</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/about">
                <Button variant="gold" size="md" className="gap-2 shadow-gold">
                  Read Record Story & Achievements
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Badge / Illustration */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-white/10 backdrop-blur-md border border-[#E8B520]/50 p-6 flex flex-col items-center justify-center text-center shadow-gold">
              <div className="w-16 h-16 rounded-full bg-[#E8B520]/20 flex items-center justify-center text-[#E8B520] mb-3">
                <Trophy className="w-9 h-9" />
              </div>
              <span className="font-heading text-3xl font-extrabold text-[#E8B520]">
                URF 2022
              </span>
              <span className="text-xs uppercase font-semibold tracking-widest text-[#F4DCD6] mt-1">
                World Record
              </span>
              <p className="text-[11px] text-[#FBF6EE]/70 mt-2">
                Fashion Art Institute for Creative Skills, Coimbatore
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
