import React from "react";
import { Metadata } from "next";
import { getTestimonials } from "@/db";
import { TestimonialsGrid } from "@/components/testimonials/TestimonialsGrid";
import { Sparkles, MessageSquareHeart } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Reviews & Testimonials | Fashion Art Institute Coimbatore",
  description:
    "Read real reviews from homemakers, boutique owners, and students who mastered fashion designing and tailoring at Fashion Art Institute, Coimbatore.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Real Student Feedback</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#4A2511]">
            Stories of Transformation
          </h1>
          <p className="text-sm sm:text-base text-[#7A6458]">
            Discover how women from all walks of life gained creative mastery,
            launched boutique ateliers, and achieved financial independence.
          </p>
        </div>

        {/* Reviews Grid */}
        <TestimonialsGrid testimonials={testimonials} />
      </div>
    </div>
  );
}
