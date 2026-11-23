import React, { Suspense } from "react";
import { Metadata } from "next";
import { getCourses } from "@/db";
import { CourseCard } from "@/components/courses/CourseCard";
import { CourseFilters } from "@/components/courses/CourseFilters";
import { Sparkles, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Courses | Fashion Art Institute Coimbatore",
  description:
    "Explore certified fashion designing, master tailoring, advanced Aari embroidery, and terracotta jewellery courses in Gandhipuram, Coimbatore and online.",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeMode = resolvedParams.mode || "all";
  const activeCategory = resolvedParams.category || "all";

  const courses = await getCourses({
    mode: activeMode,
    category: activeCategory,
  });

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum Designed for Success</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#4A2511]">
            Explore Our Creative Courses
          </h1>
          <p className="text-sm sm:text-base text-[#7A6458]">
            Whether you want to learn from home online or attend intensive
            classroom practicals in Gandhipuram, our certified modules give you
            hands-on mastery.
          </p>
        </div>

        {/* Filter Bar with Suspense */}
        <Suspense fallback={<div className="h-20 bg-white/50 rounded-2xl animate-pulse" />}>
          <CourseFilters
            activeMode={activeMode}
            activeCategory={activeCategory}
          />
        </Suspense>

        {/* Courses Listing Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#4A2511]/10 p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F4DCD6] text-[#4A2511] flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#4A2511]">
              No courses found for selected filters
            </h3>
            <p className="text-sm text-[#7A6458]">
              Try resetting your filter options to view all available courses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
