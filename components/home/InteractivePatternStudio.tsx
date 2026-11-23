"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Sparkles,
  Maximize2,
  Layers,
  Ruler,
  Undo2,
  Redo2,
  FileCode,
  Eye,
  CheckCircle2,
  Palette,
  Sliders,
  RotateCw,
  Download,
  Share2,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface GarmentModel {
  id: string;
  name: string;
  category: string;
  specs: {
    bust: string;
    waist: string;
    length: string;
    flare: string;
    panels: string;
  };
  svgSketch: React.ReactNode;
  svgPattern: React.ReactNode;
  defaultColor: string;
  accentColor: string;
  description: string;
}

const COLOR_SWATCHES = [
  { name: "Rani Pink (Featured)", hex: "#C2185B", secondary: "#F48FB1" },
  { name: "Royal Maroon", hex: "#6A1B29", secondary: "#D4AF37" },
  { name: "Gold Ochre", hex: "#D4AF37", secondary: "#4A2511" },
  { name: "Peacock Teal", hex: "#00695C", secondary: "#80CBC4" },
  { name: "Midnight Navy", hex: "#1A237E", secondary: "#9FA8DA" },
];

export function InteractivePatternStudio() {
  const [selectedGarment, setSelectedGarment] = useState<string>("wedding-dress");
  const [activeColor, setActiveColor] = useState(COLOR_SWATCHES[0]);
  const [viewMode, setViewMode] = useState<"front" | "back" | "both">("both");
  const [is3DShimmer, setIs3DShimmer] = useState(true);
  const [isCadModalOpen, setIsCadModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"studio" | "raw-cad">("studio");

  return (
    <section id="pattern-studio" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Stitching Line */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1="40"
            x2="100%"
            y2="40"
            stroke="#E8B520"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
          <line
            x1="0"
            y1="96%"
            x2="100%"
            y2="96%"
            stroke="#4A2511"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B520]/20 border border-[#E8B520]/40 text-[#4A2511] text-xs font-bold uppercase tracking-wider">
            <Scissors className="w-3.5 h-3.5 text-[#E8B520]" />
            <span>Interactive 3D & 2D Pattern Drafting Studio</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#4A2511]">
            From 2D Drafting to 3D Couture
          </h2>
          <p className="text-xs sm:text-base text-[#7A6458] leading-relaxed">
            At Fashion Art Institute, students master the exact workflow used in boutique fashion houses: flat technical illustration, 3D body simulation, and computerized pattern cutting.
          </p>
        </div>

        {/* Studio Model Switcher & Tool Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FBF6EE] border border-[#4A2511]/10">
          {/* Garment Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: "wedding-dress", label: "My Wedding Dress (3D CAD)" },
              { id: "princess-blouse", label: "Princess Cut Bridal Blouse" },
              { id: "anarkali-flare", label: "Indo-Western Circular Gown" },
            ].map((garment) => (
              <button
                key={garment.id}
                onClick={() => setSelectedGarment(garment.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedGarment === garment.id
                    ? "bg-[#4A2511] text-[#E8B520] shadow-sm"
                    : "bg-white text-[#7A6458] border border-[#4A2511]/10 hover:border-[#E8B520]"
                }`}
              >
                {garment.label}
              </button>
            ))}
          </div>

          {/* Color Swatch Picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#7A6458] flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-[#E8B520]" />
              <span>Fabric Tint:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {COLOR_SWATCHES.map((swatch) => (
                <button
                  key={swatch.name}
                  onClick={() => setActiveColor(swatch)}
                  title={swatch.name}
                  className={`w-6 h-6 rounded-full border-2 transition-transform duration-200 ${
                    activeColor.name === swatch.name
                      ? "scale-125 border-[#4A2511] ring-2 ring-[#E8B520]"
                      : "border-white hover:scale-110"
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                />
              ))}
            </div>

            <button
              onClick={() => setIsCadModalOpen(true)}
              className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#4A2511]/15 text-xs font-semibold text-[#4A2511] hover:bg-[#4A2511] hover:text-[#E8B520] transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full View</span>
            </button>
          </div>
        </div>

        {/* 3-PANE WORKBENCH SIMULATION (TailorNova CAD Architecture) */}
        <div className="bg-white rounded-3xl border-2 border-[#4A2511]/15 shadow-2xl overflow-hidden">
          {/* Top CAD Application Bar */}
          <div className="bg-[#FAF7F2] border-b border-[#4A2511]/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#7A6458]">
            {/* Brand / Project Name */}
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm text-[#C2185B] tracking-wider italic">
                TailorStudio CAD
              </span>
              <span className="text-[#4A2511]/30">&gt;</span>
              <span className="font-semibold text-[#4A2511] uppercase tracking-wider text-[11px]">
                {selectedGarment === "wedding-dress"
                  ? "MY WEDDING DRESS (CIRCULAR SKIRT + CORSET)"
                  : selectedGarment === "princess-blouse"
                  ? "PRINCESS CUT AARI BRIDAL BLOUSE"
                  : "INDO-WESTERN UMBRELLA FLARE GOWN"}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 hover:text-[#4A2511] cursor-pointer">
                <Undo2 className="w-3.5 h-3.5" />
                <span>Undo</span>
              </span>
              <span className="flex items-center gap-1 hover:text-[#4A2511] cursor-pointer">
                <Redo2 className="w-3.5 h-3.5" />
                <span>Redo</span>
              </span>
              <span className="flex items-center gap-1 hover:text-[#4A2511] cursor-pointer text-[#8F6C07] font-semibold">
                <Ruler className="w-3.5 h-3.5 text-[#E8B520]" />
                <span>Auto Ease: +1.5&quot;</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Pattern Verified
              </span>
            </div>
          </div>

          {/* 3-Column Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#4A2511]/10 min-h-[520px]">
            {/* PANE 1: 2D FLAT TECHNICAL CAD SKETCH (4 cols) */}
            <div className="lg:col-span-4 p-6 bg-[#FCFBF8] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#4A2511]/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#4A2511]">
                      1. Technical Vector Sketch
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] bg-white border border-[#4A2511]/10 rounded-lg p-0.5">
                    <button
                      onClick={() => setViewMode("front")}
                      className={`px-2 py-0.5 rounded ${
                        viewMode === "front"
                          ? "bg-[#4A2511] text-white"
                          : "text-[#7A6458]"
                      }`}
                    >
                      Front
                    </button>
                    <button
                      onClick={() => setViewMode("back")}
                      className={`px-2 py-0.5 rounded ${
                        viewMode === "back"
                          ? "bg-[#4A2511] text-white"
                          : "text-[#7A6458]"
                      }`}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setViewMode("both")}
                      className={`px-2 py-0.5 rounded ${
                        viewMode === "both"
                          ? "bg-[#4A2511] text-white"
                          : "text-[#7A6458]"
                      }`}
                    >
                      Both
                    </button>
                  </div>
                </div>

                {/* Vector Silhouette Drawing Canvas */}
                <div className="relative h-80 flex items-center justify-center my-4">
                  {/* Technical Dress Sketch SVG */}
                  <svg
                    viewBox="0 0 240 320"
                    className="w-full h-full max-h-72 drop-shadow-sm"
                  >
                    {/* Measurement Grid Guide */}
                    <line
                      x1="20"
                      y1="70"
                      x2="220"
                      y2="70"
                      stroke="#E0D7D0"
                      strokeDasharray="3 3"
                    />
                    <text x="25" y="65" fontSize="8" fill="#A08E84">
                      Bust: 36&quot;
                    </text>

                    <line
                      x1="20"
                      y1="110"
                      x2="220"
                      y2="110"
                      stroke="#E0D7D0"
                      strokeDasharray="3 3"
                    />
                    <text x="25" y="105" fontSize="8" fill="#A08E84">
                      Waist: 28&quot;
                    </text>

                    <line
                      x1="20"
                      y1="280"
                      x2="220"
                      y2="280"
                      stroke="#E0D7D0"
                      strokeDasharray="3 3"
                    />
                    <text x="25" y="275" fontSize="8" fill="#A08E84">
                      Hem Flare: 140&quot;
                    </text>

                    {/* Front Gown Outline */}
                    <g
                      transform={
                        viewMode === "back"
                          ? "translate(-40,0)"
                          : viewMode === "both"
                          ? "translate(-15,0)"
                          : "translate(20,0)"
                      }
                    >
                      {/* Bodice Front */}
                      <path
                        d="M80 70 Q95 62 110 70 L115 110 L75 110 Z"
                        fill="none"
                        stroke="#4A2511"
                        strokeWidth="1.8"
                      />
                      {/* Sweetheart Neck Curve */}
                      <path
                        d="M80 70 Q95 76 110 70"
                        fill="none"
                        stroke="#C2185B"
                        strokeWidth="1.5"
                      />
                      {/* Waist Seam */}
                      <line
                        x1="75"
                        y1="110"
                        x2="115"
                        y2="110"
                        stroke="#4A2511"
                        strokeWidth="1.8"
                      />
                      {/* Princess Seam Lines */}
                      <path
                        d="M88 72 Q86 90 85 110"
                        fill="none"
                        stroke="#4A2511"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <path
                        d="M102 72 Q104 90 105 110"
                        fill="none"
                        stroke="#4A2511"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      {/* Full Flare Skirt Front */}
                      <path
                        d="M75 110 C65 170 45 240 40 280 C70 290 120 290 150 280 C145 240 125 170 115 110 Z"
                        fill="none"
                        stroke="#4A2511"
                        strokeWidth="1.8"
                      />
                      {/* Skirt Drapes */}
                      <path
                        d="M85 115 Q80 190 75 284"
                        fill="none"
                        stroke="#4A2511"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <path
                        d="M105 115 Q110 190 115 284"
                        fill="none"
                        stroke="#4A2511"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <path
                        d="M95 112 L95 286"
                        fill="none"
                        stroke="#4A2511"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                    </g>

                    {/* Back View (When 'both' or 'back' selected) */}
                    {(viewMode === "both" || viewMode === "back") && (
                      <g
                        transform={
                          viewMode === "back"
                            ? "translate(40,0)"
                            : "translate(75,0) scale(0.75)"
                        }
                        opacity={viewMode === "both" ? 0.75 : 1}
                      >
                        {/* Bodice Back */}
                        <path
                          d="M80 75 L110 75 L115 110 L75 110 Z"
                          fill="none"
                          stroke="#7A6458"
                          strokeWidth="1.5"
                        />
                        {/* Concealed Zip Line */}
                        <line
                          x1="95"
                          y1="75"
                          x2="95"
                          y2="150"
                          stroke="#C2185B"
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                        />
                        {/* Skirt Back with Train */}
                        <path
                          d="M75 110 C68 170 50 240 45 295 C75 305 115 305 145 295 C140 240 122 170 115 110 Z"
                          fill="none"
                          stroke="#7A6458"
                          strokeWidth="1.5"
                        />
                      </g>
                    )}
                  </svg>
                </div>
              </div>

              {/* Parametric Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#4A2511]/10 text-[10px]">
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#4A2511]/15 text-[#4A2511] font-semibold">
                  No Waistband
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#4A2511]/15 text-[#4A2511] font-semibold">
                  Floor Length
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#4A2511]/15 text-[#4A2511] font-semibold">
                  Strapless Sweetheart
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#4A2511]/15 text-[#4A2511] font-semibold">
                  Full Umbrella Skirt
                </span>
              </div>
            </div>

            {/* PANE 2: 3D MANNEQUIN COUTURE SIMULATION (4 cols) */}
            <div className="lg:col-span-4 p-6 bg-gradient-to-b from-white via-[#FCFBF8] to-[#FBF6EE] flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#4A2511]/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#4A2511]">
                      2. 3D Mannequin Simulation
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#8F6C07] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8B520]/20">
                    Live Physics
                  </span>
                </div>

                {/* 3D Mannequin Display */}
                <div className="relative h-80 flex items-center justify-center my-3">
                  {/* Subtle rotating mannequin shadow */}
                  <div className="absolute bottom-2 w-36 h-6 rounded-full bg-black/10 blur-md" />

                  {/* Mannequin Figure & Gown */}
                  <motion.div
                    animate={is3DShimmer ? { y: [0, -4, 0] } : {}}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-48 h-72 flex items-center justify-center"
                  >
                    {/* 3D Couture Model Graphic */}
                    <div className="relative w-full h-full flex flex-col items-center">
                      {/* Mannequin Head & Neck */}
                      <div className="w-6 h-8 rounded-full bg-gradient-to-b from-slate-200 to-slate-300 border border-slate-300 shadow-sm" />
                      <div className="w-2.5 h-3 bg-slate-300" />
                      <div className="w-16 h-4 rounded-t-full bg-slate-300 -mt-0.5" />

                      {/* Bodice with Embroidered Bustier */}
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 4px 15px rgba(0,0,0,0.1)",
                            "0 4px 25px rgba(232,181,32,0.3)",
                            "0 4px 15px rgba(0,0,0,0.1)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-16 h-12 rounded-b-md relative overflow-hidden transition-colors duration-500 shadow-md border-t border-white/40"
                        style={{ backgroundColor: activeColor.hex }}
                      >
                        {/* Zardosi / Brocade Embroidery Texture Overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(#E8B520_1.5px,transparent_1.5px)] [background-size:6px_6px] opacity-40 mix-blend-overlay" />
                        <div className="absolute top-1 left-2 right-2 h-4 border-b border-[#E8B520]/60 rounded-full" />
                      </motion.div>

                      {/* Floor Length Draped Skirt */}
                      <motion.div
                        className="w-36 h-48 -mt-1 relative overflow-hidden transition-colors duration-500"
                        style={{
                          background: `linear-gradient(180deg, ${activeColor.hex} 0%, ${activeColor.hex} 70%, #2A1107 100%)`,
                          clipPath:
                            "polygon(30% 0%, 70% 0%, 95% 90%, 100% 100%, 0% 100%, 5% 90%)",
                        }}
                      >
                        {/* Pleat Highlights & Shadow Drapes */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
                        <div className="absolute inset-y-0 left-1/4 w-3 bg-white/10 blur-[1px]" />
                        <div className="absolute inset-y-0 right-1/4 w-3 bg-white/10 blur-[1px]" />
                        <div className="absolute inset-y-0 left-1/2 w-4 bg-black/20 blur-[1px]" />

                        {/* Hemline subtle gold border */}
                        <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#E8B520]/80 shadow-gold" />
                      </motion.div>
                    </div>

                    {/* Floating Measurement Annotation */}
                    <div className="absolute -right-3 top-16 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-[#E8B520]/40 text-[9px] font-bold text-[#4A2511] shadow-sm">
                      Dart: 3.5&quot;
                    </div>
                    <div className="absolute -left-3 bottom-12 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-[#4A2511]/15 text-[9px] font-bold text-[#4A2511] shadow-sm">
                      Drape: 360°
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Mannequin Interactive Controls */}
              <div className="pt-3 border-t border-[#4A2511]/10 flex items-center justify-between text-xs text-[#7A6458]">
                <button
                  onClick={() => setIs3DShimmer(!is3DShimmer)}
                  className="flex items-center gap-1.5 text-[#8F6C07] font-semibold hover:text-[#4A2511]"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{is3DShimmer ? "Pause Shimmer" : "Rotate 3D"}</span>
                </button>
                <span className="font-semibold text-[#4A2511]">
                  Color: {activeColor.name}
                </span>
              </div>
            </div>

            {/* PANE 3: SEWING PATTERN DRAFTING LAYOUT (4 cols) */}
            <div className="lg:col-span-4 p-6 bg-[#FCFBF8] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#4A2511]/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#4A2511]">
                      3. Flat Sewing Pattern (CAD)
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Seam: 0.5&quot;
                  </span>
                </div>

                {/* Scaled Pattern Pieces SVG */}
                <div className="relative h-80 flex items-center justify-center my-4">
                  <svg
                    viewBox="0 0 240 320"
                    className="w-full h-full max-h-72 drop-shadow-sm"
                  >
                    {/* Bodice Pattern Pieces (Left Side) */}
                    <g transform="translate(10, 20)">
                      {/* Front Center Panel */}
                      <path
                        d="M10 10 L35 10 L30 75 L10 75 Z"
                        fill="#FBF6EE"
                        stroke="#4A2511"
                        strokeWidth="1.4"
                      />
                      <text x="12" y="45" fontSize="7" fill="#7A6458">
                        Center
                      </text>

                      {/* Princess Side Panel */}
                      <path
                        d="M45 10 Q55 25 55 45 Q50 65 42 75 L65 75 L68 10 Z"
                        fill="#FBF6EE"
                        stroke="#4A2511"
                        strokeWidth="1.4"
                      />
                      <text x="48" y="45" fontSize="7" fill="#7A6458">
                        Side
                      </text>

                      {/* Grainline Arrow */}
                      <line
                        x1="22"
                        y1="20"
                        x2="22"
                        y2="65"
                        stroke="#C2185B"
                        strokeWidth="1"
                      />
                      <polygon points="22,18 20,23 24,23" fill="#C2185B" />
                      <polygon points="22,67 20,62 24,62" fill="#C2185B" />

                      {/* Seam Allowance Dash Line */}
                      <path
                        d="M7 7 L38 7 L33 78 L7 78 Z"
                        fill="none"
                        stroke="#E8B520"
                        strokeWidth="0.8"
                        strokeDasharray="2 2"
                      />
                    </g>

                    {/* Circular Umbrella Skirt Pattern (Right Side Arc) */}
                    <g transform="translate(110, 20)">
                      {/* Half-Circle Umbrella Skirt Cutting Arc */}
                      <path
                        d="M15 130 A90 90 0 0 1 105 130 A25 25 0 0 0 15 130 Z"
                        fill="#FFFBF2"
                        stroke="#4A2511"
                        strokeWidth="1.6"
                      />
                      {/* Waist Radius Center Mark */}
                      <circle cx="60" cy="130" r="2" fill="#C2185B" />
                      <text x="45" y="145" fontSize="7" fill="#C2185B" fontWeight="bold">
                        Waist R: 4.5&quot;
                      </text>

                      {/* Hem Arc Measurement */}
                      <path
                        d="M5 130 A100 100 0 0 1 115 130"
                        fill="none"
                        stroke="#E8B520"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <text x="25" y="25" fontSize="7" fill="#8F6C07">
                        Floor Flare Arc (180°)
                      </text>

                      {/* Cutting Grain Line */}
                      <line
                        x1="60"
                        y1="40"
                        x2="60"
                        y2="100"
                        stroke="#4A2511"
                        strokeWidth="1"
                      />
                      <text
                        x="63"
                        y="70"
                        fontSize="6"
                        fill="#7A6458"
                        transform="rotate(90 63 70)"
                      >
                        Fold / Bias
                      </text>
                    </g>

                    {/* Pattern Specifications Label */}
                    <g transform="translate(15, 220)">
                      <rect
                        x="0"
                        y="0"
                        width="210"
                        height="65"
                        rx="8"
                        fill="#FAF7F2"
                        stroke="#E0D7D0"
                      />
                      <text
                        x="10"
                        y="16"
                        fontSize="8"
                        fontWeight="bold"
                        fill="#4A2511"
                      >
                        PATTERN SPECS • BATCH 2026
                      </text>
                      <text x="10" y="30" fontSize="7" fill="#7A6458">
                        Garment: Floor-Length Bridal Gown with Umbrella Arc
                      </text>
                      <text x="10" y="42" fontSize="7" fill="#7A6458">
                        Cutting Fabric: Raw Silk / Satin • Lining: Butter Crepe
                      </text>
                      <text x="10" y="54" fontSize="7" fill="#8F6C07" fontWeight="bold">
                        Fabric Required: 4.5 Meters (Full Circular Cut Layout)
                      </text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Export / PDF Download Button */}
              <div className="pt-3 border-t border-[#4A2511]/10 flex items-center justify-between gap-2">
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => setIsCadModalOpen(true)}
                  className="w-full gap-1.5 shadow-sm text-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect CAD Workspace</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom CAD Info Footer */}
          <div className="bg-[#FAF7F2] border-t border-[#4A2511]/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6458]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Students learn both <strong>hand-drafted French curve patterns</strong> and <strong>digital CAD pattern generation</strong> in all Diploma programs.
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[#4A2511] font-semibold">
                Classroom: Lakshmi Complex, Gandhipuram
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCadModalOpen(true)}
                className="text-xs border-[#4A2511]/20 text-[#4A2511]"
              >
                <span>View Reference CAD</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* FULL CAD WORKSPACE LIGHTBOX MODAL */}
        {isCadModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-5xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#4A2511]/20 my-8 space-y-4 relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#4A2511]/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#4A2511] text-[#E8B520] flex items-center justify-center font-bold text-xs">
                    CAD
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#4A2511]">
                      Digital 3D Pattern Drafting Reference Architecture
                    </h3>
                    <p className="text-xs text-[#7A6458]">
                      TailorNova 3D simulation, flat sketch, and circular sewing pattern cutting layout
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCadModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-[#FBF6EE] hover:bg-[#4A2511] hover:text-[#E8B520] text-xs font-semibold text-[#4A2511] transition-colors"
                >
                  Close &times;
                </button>
              </div>

              {/* Reference Image from User Upload */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#4A2511]/10">
                <Image
                  src="/images/cad-pattern-studio.png"
                  alt="TailorNova 3D Pattern Drafting CAD Interface"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#7A6458]">
                <div className="p-3 rounded-xl bg-[#FBF6EE] border border-[#4A2511]/5">
                  <strong className="text-[#4A2511] block mb-1">
                    Left: 2D Flat Technical Vector
                  </strong>
                  Front and back silhouette sketches showing bust darts, waistlines, and flare curves.
                </div>
                <div className="p-3 rounded-xl bg-[#FBF6EE] border border-[#4A2511]/5">
                  <strong className="text-[#4A2511] block mb-1">
                    Center: 3D Mannequin Simulation
                  </strong>
                  Live digital avatar fitting with real-time fabric drape and embroidered bustier texture.
                </div>
                <div className="p-3 rounded-xl bg-[#FBF6EE] border border-[#4A2511]/5">
                  <strong className="text-[#4A2511] block mb-1">
                    Right: Sewing Pattern Arc
                  </strong>
                  Accurate sewing pattern pieces including half-circle umbrella skirt arc and bodice darts.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
