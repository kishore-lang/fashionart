import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCourseBySlug, getCourses } from "@/db";
import { formatPrice } from "@/lib/utils";
import { SyllabusAccordion } from "@/components/courses/SyllabusAccordion";
import { CourseDetailEnrollButton } from "@/components/courses/CourseDetailEnrollButton";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Clock,
  Layers,
  Sparkles,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | Fashion Art Institute",
    };
  }

  return {
    title: `${course.title} | Fashion Art Institute Coimbatore`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [{ url: course.thumbnailUrl }],
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const whatsappDirectNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917397526669";
  const whatsappQuery = encodeURIComponent(
    `Hello! I want to enroll in "${course.title}". Please provide fee details, upcoming batch timings, and registration steps.`
  );

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#7A6458] flex items-center gap-2">
          <Link href="/" className="hover:text-[#E8B520]">
            Home
          </Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-[#E8B520]">
            Courses
          </Link>
          <span>/</span>
          <span className="text-[#4A2511] font-semibold">{course.title}</span>
        </nav>

        {/* Top Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold">{course.category}</Badge>
              <Badge variant="chocolate">{course.mode} Mode</Badge>
              {course.isFeatured && <Badge variant="blush">Flagship Course</Badge>}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A2511] leading-tight">
              {course.title}
            </h1>

            <p className="text-base sm:text-lg text-[#7A6458] leading-relaxed">
              {course.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white border border-[#4A2511]/10 shadow-soft">
              <div className="space-y-1">
                <span className="text-xs text-[#7A6458] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E8B520]" /> Duration
                </span>
                <span className="font-heading text-lg font-bold text-[#4A2511]">
                  {course.durationDays} Days
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-[#7A6458] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#E8B520]" /> Curriculum
                </span>
                <span className="font-heading text-lg font-bold text-[#4A2511]">
                  {course.stepsCount} Steps
                </span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-xs text-[#7A6458] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E8B520]" /> Certificate
                </span>
                <span className="font-heading text-lg font-bold text-[#4A2511]">
                  Govt Authorised
                </span>
              </div>
            </div>

            {/* Nuances Covered */}
            {course.nuances && course.nuances.length > 0 && (
              <div className="bg-[#F4DCD6]/40 rounded-2xl p-6 border border-[#4A2511]/10 space-y-3">
                <h3 className="font-heading text-lg font-bold text-[#4A2511] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E8B520]" />
                  Exclusive Fitting Nuances Covered
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.nuances.map((nuance, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[#4A2511]"
                    >
                      <CheckCircle className="w-4 h-4 text-[#E8B520] shrink-0 mt-0.5" />
                      <span>{nuance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Enrollment Sticky Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-3xl overflow-hidden border border-[#4A2511]/15 shadow-soft-lg p-6 sm:p-8 space-y-6">
              {/* Media Preview */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F4DCD6]/40">
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
              </div>

              {/* Fee & Guarantee */}
              <div className="border-b border-[#4A2511]/10 pb-4 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6458]">
                  Total Course Fee
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#4A2511]">
                    {formatPrice(course.price)}
                  </span>
                  <span className="text-xs text-[#7A6458]">
                    (Includes syllabus materials & certification)
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <CourseDetailEnrollButton
                  courseId={course.id || course.slug}
                  courseTitle={course.title}
                  price={course.price}
                />

                <a
                  href={`https://wa.me/${whatsappDirectNumber}?text=${whatsappQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#25D366] text-[#128C7E] font-medium text-sm hover:bg-[#25D366] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Instant WhatsApp Admission Query
                </a>

                <Link
                  href={`/contact?course=${encodeURIComponent(course.title)}`}
                  className="block w-full text-center text-xs text-[#7A6458] hover:text-[#4A2511] font-medium py-1"
                >
                  Or submit a traditional contact form &rarr;
                </Link>
              </div>

              <div className="text-xs text-[#7A6458] space-y-2 pt-2">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E8B520]" />
                  Classes available in Tamil & English
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E8B520]" />
                  Personal 1-on-1 feedback on all stitches
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E8B520]" />
                  Central Govt. recognized certificate upon completion
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Syllabus Accordion Section */}
        <div className="pt-12 border-t border-[#4A2511]/10 max-w-4xl space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-[#4A2511]">
              Detailed Course Curriculum & Modules
            </h2>
            <p className="text-sm text-[#7A6458] mt-1">
              Click on each module below to view the precise drafting, pattern
              making, and construction techniques you will master.
            </p>
          </div>

          <SyllabusAccordion modules={course.syllabus} />
        </div>
      </div>
    </div>
  );
}
