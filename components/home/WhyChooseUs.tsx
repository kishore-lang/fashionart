"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  GraduationCap,
  Languages,
  Laptop,
  MapPin,
  Sparkles,
} from "lucide-react";

const REASONS = [
  {
    icon: Award,
    title: "Central Govt Authorised",
    description:
      "Earn nationally valid, government-certified certificates that open doors to employment, loans, and boutique accreditations.",
  },
  {
    icon: Briefcase,
    title: "100% Placement Guidance",
    description:
      "Direct boutique hiring connections, freelance job assistance, and end-to-end guidance to launch your own tailoring brand.",
  },
  {
    icon: GraduationCap,
    title: "Experienced Master Trainers",
    description:
      "Trained directly by State Awardee Suguna Shanmugam & industry experts with 15+ years of bespoke tailoring mastery.",
  },
  {
    icon: Languages,
    title: "Tamil & English Instruction",
    description:
      "Learn comfortably with step-by-step explanations in Tamil or English, designed specifically for beginners and homemakers.",
  },
  {
    icon: Laptop,
    title: "Online & Offline Flexibility",
    description:
      "Attend interactive practical workshops at our Coimbatore campus or learn at your pace from anywhere in the world.",
  },
  {
    icon: MapPin,
    title: "Prime Gandhipuram Location",
    description:
      "Situated in Lakshmi Complex, just a 3-minute comfortable walk from Gandhipuram Central Bus Stand with great transit.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Choose Fashion Art</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2511]">
            Crafted for Your Creative Independence
          </h2>
          <p className="text-sm sm:text-base text-[#7A6458]">
            We don&apos;t just teach stitching—we mentor you to think, cut, and
            create like an accomplished fashion couturier.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-8 border border-[#4A2511]/10 shadow-soft hover:shadow-soft-lg hover:border-[#E8B520]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-13 h-13 w-12 h-12 rounded-xl bg-[#F4DCD6]/70 group-hover:bg-[#E8B520]/20 flex items-center justify-center text-[#4A2511] group-hover:text-[#4A2511] transition-colors mb-6 shadow-sm">
                    <Icon className="w-6 h-6 text-[#4A2511] group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#4A2511] mb-2 group-hover:text-[#E8B520] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#7A6458] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#4A2511]/5 flex items-center text-xs font-semibold text-[#E8B520] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More in Admissions →
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
