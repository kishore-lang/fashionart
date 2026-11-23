"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";

const MODES = [
  { value: "all", label: "All Modes" },
  { value: "online", label: "Online" },
  { value: "offline", label: "Classroom / Offline" },
  { value: "both", label: "Hybrid" },
];

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "Fashion Designing", label: "Fashion Designing" },
  { value: "Tailoring", label: "Tailoring" },
  { value: "Embroidery", label: "Aari & Hand Embroidery" },
  { value: "Jewellery", label: "Terracotta Jewellery" },
];

export function CourseFilters({
  activeMode,
  activeCategory,
}: {
  activeMode: string;
  activeCategory: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleModeChange = (mode: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (mode === "all") {
      params.delete("mode");
    } else {
      params.set("mode", mode);
    }
    router.push(`/courses?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#4A2511]/10 shadow-soft mb-10 space-y-5">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#8F6C07] uppercase tracking-wider">
        <Filter className="w-3.5 h-3.5" />
        <span>Filter Courses</span>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Mode Pills */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-[#7A6458] block">
            Mode of Learning:
          </span>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => {
              const isSelected = activeMode === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => handleModeChange(m.value)}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-[#4A2511] text-[#E8B520] shadow-sm"
                      : "bg-[#FBF6EE] text-[#4A2511] hover:bg-[#F4DCD6]"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-[#7A6458] block">
            Course Stream:
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const isSelected = activeCategory === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => handleCategoryChange(c.value)}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-[#E8B520] text-[#4A2511] font-semibold shadow-sm"
                      : "bg-[#FBF6EE] text-[#4A2511] hover:bg-[#F4DCD6]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
