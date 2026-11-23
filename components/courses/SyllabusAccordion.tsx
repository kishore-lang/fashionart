"use client";

import React, { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

interface SyllabusModule {
  title: string;
  items: string[];
}

export function SyllabusAccordion({
  modules,
}: {
  modules: SyllabusModule[];
}) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="space-y-4">
      {modules.map((module, idx) => {
        const isOpen = openIndexes.includes(idx);
        return (
          <div
            key={module.title}
            className="border border-[#4A2511]/15 rounded-2xl overflow-hidden bg-white shadow-soft transition-all"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left p-5 flex items-center justify-between hover:bg-[#FBF6EE]/60 transition-colors focus:outline-none"
            >
              <span className="font-heading text-lg font-bold text-[#4A2511]">
                {module.title}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#F4DCD6]/60 text-[#4A2511] transition-transform duration-300 ${
                  isOpen ? "rotate-180 bg-[#E8B520]/20 text-[#8F6C07]" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-[#4A2511]/10 bg-[#FBF6EE]/30 animate-in fade-in duration-200">
                <ul className="space-y-2.5">
                  {module.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#7A6458]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E8B520] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
