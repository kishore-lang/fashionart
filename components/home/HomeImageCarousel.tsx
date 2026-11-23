"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Award,
  Layers,
  Scissors,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  linkText: string;
  linkHref: string;
  highlight: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    tag: "Practical Atelier & Workshop",
    title: "Hands-on Pattern Drafting & Stitching",
    subtitle:
      "Students practice taking accurate body measurements, drafting master paper patterns, and stitching with individual industrial sewing machines at Gandhipuram, Coimbatore.",
    imageUrl:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=85",
    linkText: "View Tailoring Syllabus",
    linkHref: "/courses/self-designing-course",
    highlight: "Individual Machines for Every Student",
  },
  {
    id: 2,
    tag: "Haute Couture & Bridal",
    title: "Master Bridal Blouses & Zardosi Aari Work",
    subtitle:
      "Intricate hand embroidery training covering 79 stitch types, French knots, cutwork, 3D floral motifs, and bridal necklines on cot frames.",
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85",
    linkText: "Explore Aari Embroidery",
    linkHref: "/courses/advanced-aari-embroidery",
    highlight: "92 Step Systematic Syllabus",
  },
  {
    id: 3,
    tag: "World Record Milestone",
    title: "URF World Record 2022: 300 Garments in 3 Hours",
    subtitle:
      "50 proud student couturiers from Fashion Art Institute drafted, cut, and stitched 300 complete garments simultaneously, setting an official world record.",
    imageUrl:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1400&q=85",
    linkText: "Read Record Story",
    linkHref: "/achievements",
    highlight: "Official URF Certificate & Medal",
  },
  {
    id: 4,
    tag: "Next-Gen Fashion Tech",
    title: "3D CAD Fashion Simulation & Digital Drafting",
    subtitle:
      "Experience modern digital fashion illustration: from 2D flat sketches to 3D mannequin draping and automated sewing pattern generation.",
    imageUrl: "/images/cad-pattern-studio.png",
    linkText: "Try Interactive Studio",
    linkHref: "#pattern-studio",
    highlight: "TailorNova-Style 3D Pattern CAD",
  },
  {
    id: 5,
    tag: "Student Showcase & Convocation",
    title: "Annual Fashion Art Fest Runway Exhibition",
    subtitle:
      "Our graduates showcase original Indo-Western collections on the runway, graduating with Central Govt accredited vocational certifications.",
    imageUrl:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85",
    linkText: "Vote in Student Contest",
    linkHref: "/contest",
    highlight: "100% Placement & Boutique Setup",
  },
];

export function HomeImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length
    );
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlay, nextSlide]);

  const current = CAROUSEL_SLIDES[currentIndex];

  return (
    <section className="py-12 sm:py-16 bg-[#FBF6EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B520]/20 border border-[#E8B520]/40 text-[#4A2511] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E8B520]" />
              <span>Campus & Atelier Spotlight</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#4A2511]">
              Inside Fashion Art Institute
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6458] max-w-xl">
              Explore our Gandhipuram classrooms, live pattern drafting tables, bridal Aari embroidery work, and world record celebrations.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
              className="w-10 h-10 rounded-full bg-white border border-[#4A2511]/15 text-[#4A2511] hover:bg-[#4A2511] hover:text-[#E8B520] flex items-center justify-center transition-all duration-300 shadow-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
              className="w-10 h-10 rounded-full bg-white border border-[#4A2511]/15 text-[#4A2511] hover:bg-[#4A2511] hover:text-[#E8B520] flex items-center justify-center transition-all duration-300 shadow-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Carousel Card */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#4A2511]/15 aspect-[16/10] sm:aspect-[21/9] min-h-[380px] sm:min-h-[460px] bg-[#4A2511]"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={current.imageUrl}
                alt={current.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
              />

              {/* Multi-stage gradient overlay for readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2511]/95 via-[#4A2511]/45 to-black/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A2511]/80 via-transparent to-transparent hidden sm:block" />

              {/* Slide Content */}
              <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-end text-white">
                <div className="max-w-2xl space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E8B520] text-[#4A2511] shadow-sm">
                      {current.tag}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#FBF6EE] border border-white/20">
                      {current.highlight}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#FBF6EE]">
                    {current.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#FBF6EE]/85 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    {current.subtitle}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <Link href={current.linkHref}>
                      <Button
                        variant="gold"
                        size="sm"
                        className="gap-2 shadow-gold text-xs sm:text-sm"
                      >
                        <span>{current.linkText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>

                    <Link href="/gallery">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 text-xs sm:text-sm gap-1.5"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View All Gallery Photos</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicator Dots & Progress Bar */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
            {CAROUSEL_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-7 h-2 bg-[#E8B520]"
                    : "w-2 h-2 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          {CAROUSEL_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`text-left p-2.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 bg-white ${
                  isActive
                    ? "border-[#E8B520] ring-2 ring-[#E8B520]/30 shadow-sm"
                    : "border-[#4A2511]/10 opacity-70 hover:opacity-100 hover:border-[#4A2511]/30"
                }`}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#FBF6EE]">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-[#8F6C07] font-bold uppercase tracking-wider block truncate">
                    Slide {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#4A2511] line-clamp-1">
                    {slide.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
