import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { getFeaturedCourses } from "@/db";
import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/Button";

export async function FeaturedCourses() {
  const featured = await getFeaturedCourses();

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master The Craft</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2511]">
            Featured Designing & Tailoring Courses
          </h2>
          <p className="text-sm sm:text-base text-[#7A6458]">
            Carefully curated, hands-on modules structured to build your
            practical confidence from zero to professional runway perfection.
          </p>
        </div>

        <Link href="/courses">
          <Button variant="outline" size="md" className="gap-2 shrink-0">
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </section>
  );
}
