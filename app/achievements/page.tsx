import React from "react";
import { Metadata } from "next";
import { getAchievements } from "@/db";
import { AchievementsList } from "@/components/achievements/AchievementsList";
import { Award, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements & Awards | Fashion Art Institute Coimbatore",
  description:
    "Universal Record Forum (URF) 2022 World Record holder, Best Creative Designer of Tamil Nadu 2017, and Central Govt recognised certification honours.",
};

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Excellence Recognized</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#4A2511]">
            Our Milestones & World Records
          </h1>
          <p className="text-sm sm:text-base text-[#7A6458]">
            Proud citations earned through rigorous tailoring standards,
            community leadership, and our landmark 2022 world record.
          </p>
        </div>

        {/* Achievements Showcase */}
        <AchievementsList achievements={achievements} />
      </div>
    </div>
  );
}
