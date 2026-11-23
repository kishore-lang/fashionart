"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Award, ShieldCheck, Scissors } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-6 pb-16 sm:py-20 lg:py-24 w-full">
      {/* Background subtle gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-[550px] h-[350px] sm:h-[450px] bg-gradient-to-b from-[#F4DCD6]/60 via-[#E8B520]/10 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute -top-16 -right-16 w-48 sm:w-72 h-48 sm:h-72 bg-[#E8B520]/15 rounded-full blur-2xl" />
        <div className="absolute bottom-10 -left-16 w-48 sm:w-72 h-48 sm:h-72 bg-[#F4DCD6]/50 rounded-full blur-2xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#E8B520]/15 border border-[#E8B520]/30 text-[#4A2511] text-[11px] sm:text-xs font-semibold tracking-wide uppercase shadow-sm max-w-full text-left"
            >
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E8B520] shrink-0" />
              <span className="truncate">
                Govt Authorised • Gandhipuram, Coimbatore
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#4A2511] leading-[1.2]"
            >
              Design Your <span className="italic text-[#E8B520] font-normal">Dream</span>.
              <br />
              Stitch Your <span className="underline decoration-[#E8B520]/50 decoration-wavy underline-offset-6 sm:underline-offset-8">Success</span>.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-[#7A6458] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Coimbatore&apos;s premier boutique fashion designing and tailoring
              institute. We transform creative women and homemakers into
              confident boutique owners with certified hands-on pattern drafting,
              bridal Aari embroidery, and bespoke tailoring.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1"
            >
              <Link href="/courses" className="w-full sm:w-auto">
                <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-gold">
                  <Sparkles className="w-4 h-4" />
                  View All Courses
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a href="#pattern-studio" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-[#4A2511]/25 hover:border-[#E8B520] gap-2">
                  <Scissors className="w-4 h-4 text-[#E8B520]" />
                  <span>Try 3D Pattern CAD</span>
                </Button>
              </a>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Free Demo Class
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-5 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 border-t border-[#4A2511]/10 text-left text-xs text-[#4A2511]"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E8B520] shrink-0" />
                <span className="font-medium">100% Practical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-[#E8B520] shrink-0" />
                <span className="font-medium">Tamil & English</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#E8B520] shrink-0" />
                <span className="font-medium">3500+ Graduates</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none"
            >
              {/* Primary Featured Visual Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-[#F4DCD6]">
                <Image
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80"
                  alt="Fashion Designing and Tailoring Workshop"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2511]/85 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <span className="inline-block text-[11px] uppercase tracking-widest text-[#E8B520] font-semibold">
                    Classroom & Online
                  </span>
                  <p className="font-heading text-lg sm:text-xl font-bold">
                    Master Pattern Drafting & Tailoring
                  </p>
                  <p className="text-[11px] text-[#F4DCD6] line-clamp-1">
                    Guided by State Award-Winning Master Designer Suguna Shanmugam
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: World Record (Visible on tablet & desktop) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-[#E8B520]/40 flex items-center gap-2.5 hidden sm:flex"
              >
                <div className="w-9 h-9 rounded-xl bg-[#E8B520]/20 flex items-center justify-center text-[#E8B520]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#4A2511]">
                    URF World Record
                  </p>
                  <p className="text-[10px] text-[#7A6458]">
                    300 Garments in 3 Hours
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Placement & Boutique Setup */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-[#4A2511]/10 flex items-center gap-2.5 hidden sm:flex"
              >
                <div className="w-9 h-9 rounded-xl bg-[#4A2511] flex items-center justify-center text-[#E8B520]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#4A2511]">
                    100% Placement Guidance
                  </p>
                  <p className="text-[10px] text-[#7A6458]">
                    Boutique Setup Assistance
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge 3: 3D Pattern Drafting Studio */}
              <motion.a
                href="#pattern-studio"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-5 -translate-y-1/2 bg-[#4A2511]/95 text-[#E8B520] backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-2xl border border-[#E8B520]/40 items-center gap-2.5 hidden md:flex hover:scale-105 transition-all z-20 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-[#E8B520]/20 flex items-center justify-center text-[#E8B520] shrink-0">
                  <Scissors className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-[#FBF6EE] flex items-center gap-1 leading-tight">
                    <span>3D CAD Pattern Studio</span>
                    <Sparkles className="w-3 h-3 text-[#E8B520]" />
                  </p>
                  <p className="text-[9px] text-[#E8B520] font-medium">Interactive Demo &darr;</p>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
