import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Layers, ArrowRight } from "lucide-react";
import { CourseData } from "@/data/seedCourses";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface CourseCardProps {
  course: CourseData;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#4A2511]/10 shadow-soft hover:shadow-soft-lg hover:border-[#E8B520]/50 transition-all duration-300 flex flex-col group h-full">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F4DCD6]/30">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Mode Tag */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#4A2511]/90 text-white backdrop-blur-sm uppercase tracking-wider">
            {course.mode}
          </span>
          {course.isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E8B520] text-[#4A2511] backdrop-blur-sm uppercase tracking-wider shadow-sm">
              Popular
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="blush" className="text-[10px] py-0.5">
            {course.category}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="font-heading text-xl font-bold text-[#4A2511] group-hover:text-[#E8B520] transition-colors line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-[#7A6458] line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Quick Metrics: Duration & Steps */}
          <div className="flex items-center gap-4 text-xs text-[#7A6458] pt-2 border-t border-[#4A2511]/5">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E8B520]" />
              <span>{course.durationDays} Days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#E8B520]" />
              <span>{course.stepsCount} Practical Steps</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & Link */}
        <div className="mt-6 pt-4 border-t border-[#4A2511]/10 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#7A6458] block">
              Fee
            </span>
            <span className="font-heading text-lg font-bold text-[#4A2511]">
              {formatPrice(course.price)}
            </span>
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A2511] hover:text-[#E8B520] group/link transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
