"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  location: string;
  quote: string;
  course: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Kavitha Rajendran",
    role: "Boutique Owner (Kavitha Couture)",
    location: "RS Puram, Coimbatore",
    course: "Self Designing & Blouse Masterclass",
    quote:
      "I was a homemaker with zero stitching knowledge. Within 4 months of Suguna Ma'am's personal guidance, I mastered princess cut blouses and Anarkali drafting. Today, I run my own boutique earning over ₹45,000 every month!",
  },
  {
    id: 2,
    name: "Deepa Nandakumar",
    role: "Bridal Aari Specialist",
    location: "Gandhipuram, Coimbatore",
    course: "Advanced Aari Embroidery (79 Stitches)",
    quote:
      "The 79 stitches covered in this course are completely unmatched anywhere in Tamil Nadu. The zardozi wire techniques and 3D organza cutwork helped me secure orders for high-end bridal blouses.",
  },
  {
    id: 3,
    name: "Ananya Senthil",
    role: "Fashion Designing Diploma Graduate",
    location: "Tirupur",
    course: "Professional Diploma in Fashion Designing",
    quote:
      "The Central Government certificate opened so many doors. The combination of western gown drafting and ethnic silhouette draping prepared me to launch my label immediately after graduation.",
  },
  {
    id: 4,
    name: "Priyanka Murugan",
    role: "Freelance Designer & Online Student",
    location: "Chennai (Online Batch)",
    course: "Designer Patterns & Royal Gowns",
    quote:
      "I attended the classes online from Chennai. The camera angles, step-by-step PDF notes, and WhatsApp doubt clarification made me feel like I was sitting in the Coimbatore classroom directly.",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) =>
      curr === 0 ? TESTIMONIALS.length - 1 : curr - 1
    );
  };

  const next = () => {
    setCurrentIndex((curr) =>
      curr === TESTIMONIALS.length - 1 ? 0 : curr + 1
    );
  };

  const item = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-[#FBF6EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Voices</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2511]">
            Success Stories from Our Graduates
          </h2>
          <p className="text-sm sm:text-base text-[#7A6458]">
            Hear how our practical training transformed passionate learners into
            financially independent fashion entrepreneurs.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto relative mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-soft-lg border border-[#4A2511]/10 relative">
            <Quote className="w-16 h-16 text-[#F4DCD6] absolute top-6 right-8 pointer-events-none" />

            <div className="flex items-center gap-1 mb-6 text-[#E8B520]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#E8B520]" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="font-heading text-lg sm:text-2xl text-[#4A2511] leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-[#4A2511]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-[#4A2511]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#7A6458]">
                      {item.role} • {item.location}
                    </p>
                  </div>
                  <span className="text-xs uppercase font-semibold tracking-wider text-[#8F6C07] bg-[#E8B520]/15 px-3 py-1 rounded-full self-start sm:self-auto">
                    {item.course}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={prev}
                aria-label="Previous Testimonial"
                className="w-10 h-10 rounded-full border border-[#4A2511]/20 hover:bg-[#4A2511] hover:text-white flex items-center justify-center transition-colors text-[#4A2511]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next Testimonial"
                className="w-10 h-10 rounded-full border border-[#4A2511]/20 hover:bg-[#4A2511] hover:text-white flex items-center justify-center transition-colors text-[#4A2511]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Instagram Banner Card */}
        <div className="bg-gradient-to-r from-[#F4DCD6] via-white to-[#F4DCD6] rounded-3xl p-8 sm:p-10 border border-[#E8B520]/30 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md shrink-0">
              <Instagram className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-[#4A2511]">
                Follow @fashion_art_cbe on Instagram
              </h3>
              <p className="text-xs sm:text-sm text-[#7A6458]">
                Explore daily reels, student blouse stitching videos, and bridal
                couture highlights.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/fashion_art_cbe/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-full sm:w-auto"
          >
            <Button variant="primary" size="md" className="gap-2 w-full sm:w-auto">
              Follow Us on Instagram
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
