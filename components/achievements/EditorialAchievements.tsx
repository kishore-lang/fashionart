"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Trophy,
  Sparkles,
  Newspaper,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Clock,
  ArrowRight,
  Quote,
  HeartHandshake,
  Compass,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Volume2,
  VolumeX,
} from "lucide-react";

interface PressFeature {
  id: string;
  publication: string;
  date: string;
  tamilHeadline?: string;
  englishTitle: string;
  description: string;
  imageSrc: string;
  altText: string;
  accentBadge: string;
}

const PRESS_FEATURES: PressFeature[] = [
  {
    id: "kumudam",
    publication: "Kumudam Snegithi",
    date: "21 September 2023",
    tamilHeadline:
      "இல்லத்தரசிகளும் தொழில் முனைவோர் ஆகலாம்! வழிகாட்டுகிறார் ஃபேஷன் டிசைனர் சுகுணா ஷண்முகம்",
    englishTitle: "A Journey Celebrated in Kumudam Snegithi",
    description:
      "A meaningful moment of recognition as our journey in fashion, creativity, and empowering aspiring women entrepreneurs was featured in Kumudam Snegithi.",
    imageSrc: "/images/achievements/kumudam-snegithi-feature.webp",
    altText:
      "Kumudam Snegithi cover story featuring Suguna Shanmugam and Fashion Art Institute fashion-show group",
    accentBadge: "Tamil Women's Magazine Feature",
  },
  {
    id: "dinamalar",
    publication: "Dinamalar — Penmalar",
    date: "23 December 2023",
    tamilHeadline:
      "சாமானியர்களுக்கான பேஷன் ஷோ புது டிரெண்ட் ஏற்படுத்தும் சுகுணா",
    englishTitle: "Making Headlines Through Fashion & Opportunity",
    description:
      "Featured in Dinamalar Penmalar for an inspiring approach to fashion shows that creates a platform for everyday women to participate, express themselves, and explore new opportunities.",
    imageSrc: "/images/achievements/dinamalar-penmalar-feature.webp",
    altText:
      "Dinamalar Penmalar newspaper article featuring Suguna Shanmugam, inclusive fashion show, and ABLE DAY 2023",
    accentBadge: "State Daily Recognition",
  },
];

interface VideoItem {
  id: string;
  title: string;
  tag: string;
  caption: string;
  videoSrc: string;
  posterSrc: string;
  duration: string;
}

const VIDEO_ITEMS: VideoItem[] = [
  {
    id: "radio-city",
    title: "Radio City — Kovai Icon Moments",
    tag: "City Icon Feature",
    caption:
      "Behind the scenes with the Radio City 91.1 FM team during the Kovai Icon recognition visit and celebration.",
    videoSrc: "/videos/achievements/radio-city-recognition.mp4",
    posterSrc: "/images/achievements/radio-city-poster.jpg",
    duration: "1:29",
  },
  {
    id: "event-video",
    title: "Stage Honours & Event Celebration",
    tag: "Live Showcase",
    caption:
      "Memorable highlights from the live stage recognition and community fashion showcase event.",
    videoSrc: "/videos/achievements/achievement-event-video.mp4",
    posterSrc: "/images/achievements/event-video-poster.jpg",
    duration: "0:19",
  },
];

interface TimelineMilestone {
  dateOrYear: string;
  title: string;
  tag: string;
  description: string;
  citation?: string;
  type: "press" | "award" | "record";
}

const MILESTONES: TimelineMilestone[] = [
  {
    dateOrYear: "2017",
    title: "Best Creative Designer of Tamil Nadu",
    tag: "State Honour",
    description:
      "Bestowed by the Tamil Nadu Welfare Association in recognition of pioneering bridal blouses, traditional Aari embroidery techniques, and vocational student training.",
    citation: "State Level Design Excellence",
    type: "award",
  },
  {
    dateOrYear: "2022",
    title: "Universal Record Forum (URF) World Record",
    tag: "Official World Record",
    description:
      "300 custom outfits drafted, cut, and stitched in 180 continuous minutes by 50 student designers under strict international adjudicator guidelines.",
    citation: "Universal Record Forum (URF) Official Citation",
    type: "record",
  },
  {
    dateOrYear: "21 Sep 2023",
    title: "Kumudam Snegithi Feature",
    tag: "Magazine Spotlight",
    description:
      "Recognition in leading Tamil women's publication spotlighting founder Suguna Shanmugam's dedicated mentorship empowering homemakers into flourishing boutique entrepreneurs.",
    citation: "Kumudam Snegithi Cover Story",
    type: "press",
  },
  {
    dateOrYear: "23 Dec 2023",
    title: "Dinamalar Penmalar Feature",
    tag: "Press Spotlight",
    description:
      "Extensive coverage praising the inclusive fashion show format in Coimbatore, enabling everyday women and differently-abled children to experience high-fashion ramp walks.",
    citation: "Dinamalar Penmalar Editorial",
    type: "press",
  },
  {
    dateOrYear: "Radio City",
    title: "Radio City — Kovai Icon Awards",
    tag: "Media Recognition",
    description:
      "Honoured by Radio City 91.1 FM Coimbatore for remarkable community contribution, practical tailoring education, and women entrepreneurship advancement.",
    citation: "Radio City Coimbatore Recognition",
    type: "award",
  },
];

const IMPACT_PILLARS = [
  {
    title: "Creativity",
    icon: Sparkles,
    eyebrow: "Artistic Expression",
    description:
      "Encouraging individuals to transform their ideas into meaningful designs and expressions.",
    details:
      "From heritage bridal motifs to contemporary silhouettes, we nurture the original voice within every creator.",
  },
  {
    title: "Confidence",
    icon: HeartHandshake,
    eyebrow: "Personal Growth",
    description:
      "Creating opportunities to learn, participate, and celebrate personal growth.",
    details:
      "Every needle stroke, pattern draft, and stage showcase builds resilient poise that transcends the classroom.",
  },
  {
    title: "Empowerment",
    icon: Compass,
    eyebrow: "Independence",
    description:
      "Supporting aspiring creators as they develop their skills and work toward greater independence.",
    details:
      "Equipping women with commercial tailoring precision and business clarity to run successful ateliers of their own.",
  },
];

export function EditorialAchievements() {
  // Lightbox State (for newspapers)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Video Modal State
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Keyboard navigation & modal lock
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
          setIsZoomed(false);
        }
        if (activeVideo !== null) {
          setActiveVideo(null);
        }
      } else if (e.key === "ArrowRight" && lightboxIndex !== null) {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % PRESS_FEATURES.length : null
        );
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft" && lightboxIndex !== null) {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + PRESS_FEATURES.length) % PRESS_FEATURES.length
            : null
        );
        setIsZoomed(false);
      }
    },
    [lightboxIndex, activeVideo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (lightboxIndex !== null || activeVideo !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown, lightboxIndex, activeVideo]);

  // Video play state
  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative w-full bg-[#FAF7F2] text-[#191919] selection:bg-[#C6A46C] selection:text-[#FAF7F2] overflow-hidden">
      {/* =========================================================================
          SECTION ONE: CINEMATIC HERO
         ========================================================================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-between pt-24 pb-16 px-4 sm:px-6 lg:px-12 border-b border-[#581C35]/10 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE4] to-[#FAF7F2]">
        {/* Subtle Decorative Luxury Watermark / Lineart */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] flex items-center justify-center select-none overflow-hidden">
          <span className="font-heading text-[22vw] uppercase font-serif tracking-widest text-[#581C35]">
            HAUTE
          </span>
        </div>

        {/* Ambient Warm Champagne Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#C6A46C]/15 via-[#EEDCE1]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Eyebrow & Headline Reveal */}
        <div className="max-w-6xl mx-auto w-full my-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C6A46C]/40 bg-[#FAF7F2]/80 backdrop-blur-md shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A46C] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#581C35]">
              Our Achievements & Recognition
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif font-bold text-[#581C35] leading-[1.08] tracking-tight max-w-5xl mx-auto"
          >
            A Journey of Passion, Purpose & Recognition
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#191919]/75 font-sans leading-relaxed"
          >
            Every milestone tells a story of dedication, creativity, and the
            courage to dream beyond boundaries. From empowering aspiring
            designers to receiving recognition in the media, our journey
            celebrates the transformative power of fashion, skill, and
            self-belief.
          </motion.p>

          {/* Quick Floating Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-sans text-[#581C35]/80"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-[#581C35]/5 border border-[#581C35]/15 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[#C6A46C]" />
              URF World Record 2022
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#581C35]/5 border border-[#581C35]/15 flex items-center gap-2">
              <Newspaper className="w-3.5 h-3.5 text-[#C6A46C]" />
              Kumudam Snegithi & Dinamalar
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#581C35]/5 border border-[#581C35]/15 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-[#C6A46C]" />
              Radio City Kovai Icon
            </span>
          </motion.div>
        </div>

        {/* Minimal Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center pt-8 text-[#581C35]/60 hover:text-[#581C35] transition-colors cursor-pointer"
          onClick={() => {
            document
              .getElementById("our-story-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium mb-2">
            Scroll to Discover
          </span>
          <div className="w-5 h-8 rounded-full border border-[#581C35]/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#C6A46C]"
            />
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION TWO: OUR STORY (EDITORIAL TWO-COLUMN)
         ========================================================================= */}
      <section
        id="our-story-section"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#581C35]/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Portrait with Editorial Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative borders */}
              <div className="absolute -inset-4 border border-[#C6A46C]/30 rounded-3xl -rotate-1 pointer-events-none" />
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#581C35]/5 to-transparent rounded-2xl pointer-events-none" />

              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-[#581C35]">
                <Image
                  src="/images/founder_saree.png"
                  alt="Suguna Shanmugam - Founder & Chief Couturier of Fashion Art Institute"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#581C35]/90 via-[#581C35]/20 to-transparent" />

                {/* Floating caption pill */}
                <div className="absolute bottom-5 left-5 right-5 text-white p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#C6A46C] block">
                    Founder & Managing Director
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white">
                    Suguna Shanmugam
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 mt-1 font-sans">
                    Couturier, Mentor & Pioneer in Inclusive Fashion Mentorship
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Animated Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A46C] block">
                The Philosophy
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-serif font-bold text-[#581C35] leading-tight">
                More Than Achievements. A Story of Empowerment.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#191919]/80 font-sans leading-relaxed">
              Our journey is built on a belief that creativity and determination
              can open doors to extraordinary opportunities. Through fashion
              designing, skill development, and a passion for encouraging women
              to pursue their ambitions, we continue to create meaningful
              moments worth celebrating.
            </p>

            {/* Featured Pull Quote */}
            <div className="relative pl-6 sm:pl-8 py-4 border-l-2 border-[#C6A46C] space-y-3 bg-[#EEDCE1]/20 rounded-r-2xl pr-6">
              <Quote className="w-8 h-8 text-[#C6A46C]/60 absolute -top-3 -left-4 bg-[#FAF7F2] p-1 rounded-full border border-[#C6A46C]/30" />
              <blockquote className="font-heading text-xl sm:text-2xl italic font-medium text-[#581C35] leading-snug">
                &ldquo;Success becomes more meaningful when it inspires someone
                else to begin.&rdquo;
              </blockquote>
              <cite className="block text-xs uppercase tracking-[0.15em] text-[#C6A46C] font-semibold not-italic">
                — Suguna Shanmugam
              </cite>
            </div>

            {/* Core Values Minimalist Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#581C35]/10">
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-heading font-bold text-[#581C35] block">
                  1,500+
                </span>
                <span className="text-xs text-[#191919]/70 font-sans">
                  Women Mentored
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-heading font-bold text-[#581C35] block">
                  3 Centres
                </span>
                <span className="text-xs text-[#191919]/70 font-sans">
                  Across Tamil Nadu
                </span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-2xl sm:text-3xl font-heading font-bold text-[#C6A46C] block">
                  Central Govt
                </span>
                <span className="text-xs text-[#191919]/70 font-sans">
                  Vocational Accreditation
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION THREE: FEATURED IN THE PRESS (INTERACTIVE EDITORIAL & LIGHTBOX)
         ========================================================================= */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#581C35]/10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A46C] block">
            Media & Publications
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#581C35]">
            Our Story, In The Spotlight
          </h2>
          <p className="text-base sm:text-lg text-[#191919]/75 font-sans leading-relaxed">
            Moments of recognition that reflect our passion, perseverance, and
            commitment to creating opportunities.
          </p>
        </div>

        {/* Newspaper Feature 1: Kumudam Snegithi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 order-2 lg:order-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#581C35]/10 text-[#581C35] text-xs font-semibold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5 text-[#C6A46C]" />
              <span>Kumudam Snegithi • 21 September 2023</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-4xl font-serif font-bold text-[#581C35] leading-tight">
              A Journey Celebrated in Kumudam Snegithi
            </h3>

            {/* Tamil Authentic Headline Quote Block */}
            <div className="p-4 rounded-xl bg-[#EEDCE1]/30 border-l-4 border-[#581C35] space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#581C35]/70 font-semibold block">
                Original Headline
              </span>
              <p className="font-sans font-bold text-[#581C35] text-base sm:text-lg leading-relaxed">
                &ldquo;இல்லத்தரசிகளும் தொழில் முனைவோர் ஆகலாம்! வழிகாட்டுகிறார்
                ஃபேஷன் டிசைனர் சுகுணா ஷண்முகம்&rdquo;
              </p>
            </div>

            <p className="text-[#191919]/80 text-base leading-relaxed font-sans">
              A meaningful moment of recognition as our journey in fashion,
              creativity, and empowering aspiring women entrepreneurs was
              featured in Kumudam Snegithi. The cover article highlighted
              Suguna’s breakthrough work organizing community fashion shows and
              training homemakers to launch their own boutique ventures.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setLightboxIndex(0);
                  setIsZoomed(false);
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#581C35] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider hover:bg-[#C6A46C] hover:text-[#581C35] transition-all shadow-md group"
              >
                <ZoomIn className="w-4 h-4 text-[#C6A46C] group-hover:text-[#581C35] transition-colors" />
                <span>View Full Newspaper Clipping</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <div
              onClick={() => {
                setLightboxIndex(0);
                setIsZoomed(false);
              }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C6A46C]/30 cursor-pointer group bg-white"
            >
              <Image
                src="/images/achievements/kumudam-snegithi-feature.webp"
                alt="Kumudam Snegithi coverage - Suguna Shanmugam"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#581C35]/0 group-hover:bg-[#581C35]/15 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-full bg-[#581C35]/90 text-white text-xs font-semibold tracking-wider flex items-center gap-1.5 backdrop-blur-sm shadow-lg">
                  <ZoomIn className="w-3.5 h-3.5 text-[#C6A46C]" />
                  Click to Expand
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newspaper Feature 2: Dinamalar Penmalar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div
              onClick={() => {
                setLightboxIndex(1);
                setIsZoomed(false);
              }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C6A46C]/30 cursor-pointer group bg-white"
            >
              <Image
                src="/images/achievements/dinamalar-penmalar-feature.webp"
                alt="Dinamalar Penmalar article - Saamaaniyargalukkana Fashion Show"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#581C35]/0 group-hover:bg-[#581C35]/15 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-full bg-[#581C35]/90 text-white text-xs font-semibold tracking-wider flex items-center gap-1.5 backdrop-blur-sm shadow-lg">
                  <ZoomIn className="w-3.5 h-3.5 text-[#C6A46C]" />
                  Click to Expand
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#581C35]/10 text-[#581C35] text-xs font-semibold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5 text-[#C6A46C]" />
              <span>Dinamalar — Penmalar • 23 December 2023</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-4xl font-serif font-bold text-[#581C35] leading-tight">
              Making Headlines Through Fashion & Opportunity
            </h3>

            {/* Tamil Headline Block */}
            <div className="p-4 rounded-xl bg-[#EEDCE1]/30 border-l-4 border-[#581C35] space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#581C35]/70 font-semibold block">
                Original Headline
              </span>
              <p className="font-sans font-bold text-[#581C35] text-base sm:text-lg leading-relaxed">
                &ldquo;சாமானியர்களுக்கான பேஷன் ஷோ புது டிரெண்ட் ஏற்படுத்தும்
                சுகுணா&rdquo;
              </p>
            </div>

            <p className="text-[#191919]/80 text-base leading-relaxed font-sans">
              Featured in Dinamalar Penmalar for an inspiring approach to
              fashion shows that creates a platform for everyday women to
              participate, express themselves, and explore new opportunities.
              The report celebrated her special ramp walks for visually impaired
              and differently-abled youth (ABLE DAY 2023).
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setLightboxIndex(1);
                  setIsZoomed(false);
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#581C35] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider hover:bg-[#C6A46C] hover:text-[#581C35] transition-all shadow-md group"
              >
                <ZoomIn className="w-4 h-4 text-[#C6A46C] group-hover:text-[#581C35] transition-colors" />
                <span>View Full Newspaper Clipping</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION FOUR: RECOGNITION TIMELINE (VERTICAL ANIMATED PROGRESS)
         ========================================================================= */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto border-b border-[#581C35]/10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A46C] block">
            Chronology of Excellence
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-serif font-bold text-[#581C35]">
            Milestones That Define Our Journey
          </h2>
          <p className="text-base text-[#191919]/75 font-sans">
            A chronological tribute to key citations, press honours, and
            transformative moments that shaped our academy.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#C6A46C] via-[#581C35] to-[#C6A46C] md:-translate-x-1/2 opacity-30" />

          <div className="space-y-12 sm:space-y-16">
            {MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FAF7F2] border-2 border-[#C6A46C] shadow-gold z-10 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#581C35]" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isEven ? "md:pl-0 md:text-right" : "md:pr-0 md:text-left"
                    } w-full`}
                  >
                    <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#C6A46C]/25 shadow-sm hover:shadow-md transition-shadow space-y-3">
                      <div
                        className={`flex items-center gap-2 ${
                          isEven
                            ? "md:justify-end justify-start"
                            : "justify-start"
                        }`}
                      >
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#581C35] text-[#FAF7F2]">
                          {item.dateOrYear}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C6A46C]">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#581C35]">
                        {item.title}
                      </h3>

                      <p className="text-sm text-[#191919]/75 font-sans leading-relaxed">
                        {item.description}
                      </p>

                      {item.citation && (
                        <div
                          className={`pt-2 border-t border-[#581C35]/5 flex items-center gap-1.5 text-xs text-[#C6A46C] font-semibold ${
                            isEven
                              ? "md:justify-end justify-start"
                              : "justify-start"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A46C]" />
                          <span>{item.citation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION FIVE: RECOGNITION IN MOTION (CINEMATIC VIDEO GALLERY)
         ========================================================================= */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#581C35]/10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A46C] block">
            Video Archive
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#581C35]">
            Moments That Deserve To Be Remembered
          </h2>
          <p className="text-base sm:text-lg text-[#191919]/75 font-sans leading-relaxed">
            Some achievements are best experienced, not just described. Relive
            the moments, celebrations, and recognition that have shaped our
            journey.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {VIDEO_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              onClick={() => {
                setActiveVideo(item);
                setIsPlaying(true);
              }}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#C6A46C]/30 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Video Thumbnail with Play Button */}
              <div className="relative aspect-[9/14] sm:aspect-[9/12] w-full bg-[#191919] overflow-hidden">
                <Image
                  src={item.posterSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 group-hover:opacity-90 transition-opacity" />

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-[#C6A46C]" />
                  <span>{item.duration}</span>
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#C6A46C] text-[#581C35] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  {item.tag}
                </div>

                {/* Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#581C35]/90 text-[#FAF7F2] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#C6A46C] group-hover:text-[#581C35] transition-all duration-300 border-2 border-white/20">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom title preview on poster */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-heading text-lg sm:text-xl font-bold leading-snug drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Caption Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3 bg-white">
                <p className="text-sm text-[#191919]/75 font-sans leading-relaxed">
                  {item.caption}
                </p>
                <div className="pt-3 border-t border-[#581C35]/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#581C35] group-hover:text-[#C6A46C] transition-colors">
                  <span>Watch Video</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION SIX: THE IMPACT BEHIND THE RECOGNITION
         ========================================================================= */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#581C35]/10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A46C] block">
            Our Core Mission
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-serif font-bold text-[#581C35]">
            Inspiring Confidence. Creating Opportunities.
          </h2>
          <p className="text-base sm:text-lg text-[#191919]/75 font-sans leading-relaxed">
            Recognition is a beautiful milestone, but the purpose behind our
            journey goes further. We believe in helping individuals discover
            their creative potential, develop practical skills, and gain the
            confidence to explore new possibilities.
          </p>
        </div>

        {/* Three Editorial Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {IMPACT_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="bg-white p-8 sm:p-10 rounded-3xl border border-[#C6A46C]/25 shadow-sm hover:shadow-xl hover:border-[#C6A46C] transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#581C35]/5 text-[#581C35] flex items-center justify-center group-hover:bg-[#581C35] group-hover:text-[#FAF7F2] transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6A46C] block">
                      {pillar.eyebrow}
                    </span>
                    <h3 className="font-heading text-2xl font-serif font-bold text-[#581C35] mt-1">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="font-sans font-medium text-sm sm:text-base text-[#191919] leading-snug">
                    {pillar.description}
                  </p>

                  <p className="text-xs text-[#191919]/65 font-sans leading-relaxed pt-2">
                    {pillar.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#581C35]/10 flex items-center gap-2 text-xs font-semibold text-[#581C35]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A46C]" />
                  <span>Fashion Art Philosophy</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION SEVEN: CLOSING STATEMENT (BURGUNDY LUXURY BANNER)
         ========================================================================= */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#581C35] text-[#FAF7F2] overflow-hidden text-center">
        {/* Subtle Ambient Gold Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A46C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A46C]/40 bg-white/5 backdrop-blur-sm text-xs uppercase tracking-[0.2em] text-[#C6A46C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Begin Your Creative Story</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight text-[#FAF7F2]">
            Every Achievement Is Just The Beginning.
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#FAF7F2]/85 font-sans leading-relaxed">
            Our story continues with every new idea, every aspiring designer, and
            every person who finds the confidence to pursue a dream.
          </p>

          <div className="pt-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C6A46C] text-[#581C35] font-bold text-sm uppercase tracking-wider hover:bg-[#FAF7F2] hover:text-[#581C35] transition-all shadow-xl hover:scale-105 group"
            >
              <span>Explore Our Courses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LIGHTBOX MODAL FOR NEWSPAPERS (HIGH-RESOLUTION WITH ZOOM & NEXT/PREV)
         ========================================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none"
            onClick={() => {
              setLightboxIndex(null);
              setIsZoomed(false);
            }}
          >
            {/* Top Toolbar */}
            <div
              className="flex items-center justify-between text-white relative z-20 pb-4 border-b border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C6A46C] block">
                  {PRESS_FEATURES[lightboxIndex].publication} •{" "}
                  {PRESS_FEATURES[lightboxIndex].date}
                </span>
                <h4 className="font-heading text-sm sm:text-base font-bold text-white truncate max-w-sm sm:max-w-xl">
                  {PRESS_FEATURES[lightboxIndex].englishTitle}
                </h4>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[#C6A46C] hover:text-[#581C35] transition-colors text-white"
                  title={isZoomed ? "Zoom out" : "Zoom in"}
                  aria-label="Toggle Zoom"
                >
                  {isZoomed ? (
                    <ZoomOut className="w-5 h-5" />
                  ) : (
                    <ZoomIn className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    setIsZoomed(false);
                  }}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-red-500 hover:text-white transition-colors text-white"
                  title="Close (Esc)"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image View Area */}
            <div
              className="relative flex-1 flex items-center justify-center overflow-auto py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + PRESS_FEATURES.length) %
                      PRESS_FEATURES.length
                  );
                  setIsZoomed(false);
                }}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#C6A46C] hover:text-[#581C35] text-white transition-colors border border-white/10"
                aria-label="Previous clipping"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Image Container with Toggleable Zoom */}
              <div
                className={`relative transition-all duration-300 ${
                  isZoomed
                    ? "w-[95vw] h-[150vh] cursor-zoom-out"
                    : "w-full h-full max-h-[82vh] cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed((prev) => !prev)}
              >
                <Image
                  src={PRESS_FEATURES[lightboxIndex].imageSrc}
                  alt={PRESS_FEATURES[lightboxIndex].altText}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex + 1) % PRESS_FEATURES.length
                  );
                  setIsZoomed(false);
                }}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#C6A46C] hover:text-[#581C35] text-white transition-colors border border-white/10"
                aria-label="Next clipping"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Pill */}
            <div
              className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/75 gap-2 relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="truncate max-w-xl text-center sm:text-left">
                {PRESS_FEATURES[lightboxIndex].tamilHeadline ||
                  PRESS_FEATURES[lightboxIndex].description}
              </p>
              <div className="flex items-center gap-3 font-mono text-[11px] text-[#C6A46C]">
                <span>
                  {lightboxIndex + 1} / {PRESS_FEATURES.length}
                </span>
                <span className="hidden sm:inline text-white/40">•</span>
                <span className="hidden sm:inline text-white/60">
                  Press Esc to exit, Arrows to navigate
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          CINEMATIC VIDEO MODAL
         ========================================================================= */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-md sm:max-w-lg bg-[#191919] rounded-3xl overflow-hidden border border-[#C6A46C]/40 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 px-6 flex items-center justify-between border-b border-white/10 bg-black/40">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C6A46C]">
                    {activeVideo.tag}
                  </span>
                  <h4 className="font-heading text-sm sm:text-base font-bold text-white truncate max-w-xs">
                    {activeVideo.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-500 hover:text-white text-white transition-colors"
                  aria-label="Close Video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-[9/16] max-h-[70vh] bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={activeVideo.videoSrc}
                  poster={activeVideo.posterSrc}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>

              {/* Modal Footer Caption */}
              <div className="p-4 px-6 bg-black/60 border-t border-white/10 flex items-center justify-between gap-4">
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  {activeVideo.caption}
                </p>
                <div className="text-[11px] font-mono text-[#C6A46C] shrink-0">
                  {activeVideo.duration}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
