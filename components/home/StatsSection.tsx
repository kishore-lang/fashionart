"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Users, Sparkles, Calendar, Award } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const STATS: StatItem[] = [
  {
    icon: Users,
    value: 3500,
    suffix: "+",
    label: "Graduated Students",
    description: "Women & homemakers empowered with entrepreneurial skills",
  },
  {
    icon: Sparkles,
    value: 4800,
    suffix: "+",
    label: "Stitched Projects",
    description: "Designer blouses, lehengas, kurtis, and gowns crafted",
  },
  {
    icon: Calendar,
    value: 8,
    suffix: "+",
    label: "Years of Excellence",
    description: "Pioneering creative skill education since 2018 in Coimbatore",
  },
  {
    icon: Award,
    value: 20,
    suffix: "+",
    label: "Expert Designers",
    description: "State-certified master tailors and fashion illustrators",
  },
];

function Counter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="font-heading text-4xl sm:text-5xl font-bold text-[#E8B520]">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={ref}
      className="py-20 bg-[#4A2511] text-[#FBF6EE] relative overflow-hidden"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8B520_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/20 text-[#E8B520] text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Proven Excellence</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Transforming Passion into Sustainable Careers
          </h2>
          <p className="text-sm sm:text-base text-[#F4DCD6]/80">
            Real outcomes built through patient mentorship, meticulous pattern
            accuracy, and relentless support for every student.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#E8B520]/50 transition-all duration-300 text-center flex flex-col items-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E8B520]/15 flex items-center justify-center text-[#E8B520] mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="mb-2">
                  <Counter
                    target={stat.value}
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-xs text-[#F4DCD6]/70 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
