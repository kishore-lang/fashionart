"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Award, CheckCircle, Calendar, Sparkles } from "lucide-react";
import { AchievementSeedItem } from "@/data/seedPhase2";
import { Badge } from "@/components/ui/Badge";

export function AchievementsList({
  achievements,
}: {
  achievements: AchievementSeedItem[];
}) {
  return (
    <div className="space-y-16">
      {/* Featured World Record Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-gradient-to-br from-[#4A2511] via-[#351A0C] to-[#4A2511] text-white p-8 sm:p-12 border-2 border-[#E8B520]/40 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8B520]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8B520] text-[#4A2511] text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4 fill-current" />
              <span>Universal Record Forum Official Record (2022)</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold leading-tight">
              300 Custom Outfits Drafted & Stitched in 3 Hours
            </h2>
            <p className="text-sm sm:text-base text-[#F4DCD6]/85 leading-relaxed">
              Organized under strict international adjudicator guidelines, 50
              talented student designers from our Coimbatore campus drafted, cut,
              and stitched 300 complete women&apos;s and kids&apos; designer garments
              with flawless finishing in a single 3-hour marathon session.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-[#E8B520] font-bold block text-lg sm:text-xl">
                  50
                </span>
                <span className="text-[#F4DCD6]/80">Student Couturiers</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#E8B520] font-bold block text-lg sm:text-xl">
                  300
                </span>
                <span className="text-[#F4DCD6]/80">Finished Garments</span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[#E8B520] font-bold block text-lg sm:text-xl">
                  180 Min
                </span>
                <span className="text-[#F4DCD6]/80">Continuous Audit</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative aspect-square w-60 rounded-2xl overflow-hidden border-2 border-[#E8B520]/50 shadow-gold bg-white/10">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                alt="URF World Record 2022"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid of All Honours & Awards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-3xl overflow-hidden border border-[#4A2511]/10 shadow-soft hover:shadow-soft-lg hover:border-[#E8B520]/50 transition-all duration-300 flex flex-col group"
          >
            <div className="relative aspect-[16/9] bg-[#F4DCD6]/30 overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#4A2511] text-[#E8B520] shadow-md uppercase tracking-wider">
                  {item.year}
                </span>
              </div>
              {item.badge && (
                <div className="absolute top-4 right-4">
                  <Badge variant="gold" className="text-[10px]">
                    {item.badge}
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#4A2511] group-hover:text-[#E8B520] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#7A6458] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#4A2511]/5 flex items-center justify-between text-xs text-[#8F6C07]">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Award className="w-4 h-4 text-[#E8B520]" />
                  Verified Institute Citation
                </span>
                <span className="text-[#7A6458]">Coimbatore, Tamil Nadu</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
