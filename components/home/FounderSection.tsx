"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Heart, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FounderSection() {
  return (
    <section className="py-24 bg-[#F5ECE1]/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo & Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Suguna Shanmugam - Founder & Chief Designer"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2511]/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#E8B520] font-semibold">
                  Founder & Managing Director
                </span>
                <h3 className="font-heading text-2xl font-bold">
                  Suguna Shanmugam
                </h3>
                <p className="text-xs text-[#F4DCD6]">
                  Best Creative Designer Awardee • Tamil Nadu
                </p>
              </div>
            </motion.div>

            {/* Small Floating Award Badge */}
            <div className="absolute -bottom-5 -right-2 sm:right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#E8B520]/40 flex items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-xl bg-[#E8B520]/20 flex items-center justify-center text-[#E8B520] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-[#4A2511]">
                Best Creative Designer of Tamil Nadu (2017)
              </p>
            </div>
          </div>

          {/* Founder Bio Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-[#E8B520]" />
              <span>The Driving Vision</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2511]">
              &ldquo;Every woman has an innate designer waiting to be
              awakened.&rdquo;
            </h2>

            <p className="text-sm sm:text-base text-[#7A6458] leading-relaxed">
              Suguna Shanmugam began her creative fashion journey in 2009 with a
              single sewing machine, boundless determination, and a vision to
              redefine fashion education. After winning the prestigious{" "}
              <strong className="text-[#4A2511]">
                Best Creative Designer of Tamil Nadu in 2017
              </strong>
              , she inaugurated the Fashion Art Institute in Gandhipuram,
              Coimbatore in 2018.
            </p>

            <p className="text-sm sm:text-base text-[#7A6458] leading-relaxed">
              Her unique method breaks down complex boutique pattern making into
              clear mathematical formulas that anyone—even those who have never
              touched a measuring tape—can master effortlessly.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E8B520] shrink-0 mt-0.5" />
                <p className="text-sm text-[#4A2511] font-medium">
                  Mentored over 3,500+ female homemakers and college students into
                  independent entrepreneurs.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E8B520] shrink-0 mt-0.5" />
                <p className="text-sm text-[#4A2511] font-medium">
                  Organized major annual events including Fashion Art Fest and
                  Yaadhumaagi Nirpaval.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E8B520] shrink-0 mt-0.5" />
                <p className="text-sm text-[#4A2511] font-medium">
                  Personal 1-on-1 practical review for every student pattern.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link href="/about">
                <Button variant="primary" size="md" className="gap-2">
                  Read Full Founder Journey
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
