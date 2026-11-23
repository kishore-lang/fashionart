import React from "react";
import { Metadata } from "next";
import { getGalleryItems } from "@/db";
import { GalleryMasonry } from "@/components/gallery/GalleryMasonry";
import { Sparkles, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Couture Gallery | Fashion Art Institute Coimbatore",
  description:
    "Explore our student creations: bridal silk blouses, royal fusion gowns, 79-stitch Aari embroidery, and terracotta designer jewellery from our Coimbatore workshops.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Masterpieces & Runway Creations</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#4A2511]">
            Our Couture & Student Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#7A6458]">
            Every garment and jewellery piece below was drafted, cut, and
            hand-stitched by students and faculty at Fashion Art Institute.
          </p>
        </div>

        {/* Gallery Masonry with Lightbox */}
        <GalleryMasonry initialItems={items} />
      </div>
    </div>
  );
}
