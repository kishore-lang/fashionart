"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles, MapPin, Users } from "lucide-react";

interface EventItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  impact: string;
}

const EVENTS: EventItem[] = [
  {
    year: "2019",
    title: "Fashion Art Fest 2019",
    subtitle: "Inaugural Grand Designer Showcase",
    description:
      "A grand runway celebration highlighting over 120 self-designed couture garments stitched entirely by our first batch of student homemakers.",
    location: "Kikani Hall, Coimbatore",
    impact: "120+ Student Garments Exhibited",
  },
  {
    year: "2021",
    title: "Yaadhumaagi Nirpaval 2021",
    subtitle: "Women Entrepreneur Empowerment Summit",
    description:
      "Dedicated state-level festival celebrating female self-reliance in textile craftsmanship, featuring hands-on live embroidery competitions and boutique launches.",
    location: "Coimbatore Cultural Auditorium",
    impact: "250+ Women Designers Gathered",
  },
  {
    year: "2022",
    title: "Fashion Art Fest 2022 & URF World Record",
    subtitle: "Universal Record Forum Global Feat",
    description:
      "50 dedicated students achieved the global world record by drafting and sewing 300 custom garments in just 3 continuous hours under live audit.",
    location: "Lakshmi Complex Campus & Convention",
    impact: "Official World Record Citation",
  },
  {
    year: "2024",
    title: "Couture Horizon 2024",
    subtitle: "Bridal & Fusion Fashion Exhibition",
    description:
      "Annual graduation runway highlighting contemporary Kanjivaram saree upcycling, 3D organza Aari embroidery, and bridal boutique launches.",
    location: "Gandhipuram Fashion Gallery",
    impact: "80+ Graduate Boutiques Inaugurated",
  },
];

export function EventsTimeline() {
  return (
    <section id="events" className="py-24 bg-white/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Legacy & Celebrations</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2511]">
            Memorable Milestones & Runway Fests
          </h2>
          <p className="text-sm sm:text-base text-[#7A6458]">
            Every year, we bring our students&apos; designs from classroom
            workbenches directly onto grand exhibition stages.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#E8B520] via-[#4A2511]/30 to-[#E8B520]" />

          <div className="space-y-12">
            {EVENTS.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content card */}
                  <div className="w-full md:w-1/2">
                    <div
                      className={`bg-white rounded-2xl p-7 border border-[#4A2511]/10 shadow-soft hover:shadow-soft-lg hover:border-[#E8B520]/40 transition-all duration-300 ${
                        isEven ? "md:text-left" : "md:text-left"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-heading text-2xl font-bold text-[#E8B520]">
                          {event.year}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F4DCD6] text-[#4A2511]">
                          {event.impact}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#4A2511]">
                        {event.title}
                      </h3>
                      <p className="text-xs font-medium text-[#7A6458] mb-3">
                        {event.subtitle}
                      </p>
                      <p className="text-sm text-[#7A6458] leading-relaxed mb-4">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#4A2511] font-medium pt-2 border-t border-[#4A2511]/5">
                        <MapPin className="w-3.5 h-3.5 text-[#E8B520]" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node / Year Badge */}
                  <div className="relative z-10 shrink-0 hidden md:flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#4A2511] text-[#E8B520] border-4 border-[#FBF6EE] shadow-md flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Empty Spacer */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
