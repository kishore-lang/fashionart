import React from "react";
import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { getCourses } from "@/db";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  MessageCircle,
  Bus,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Admissions | Fashion Art Institute Gandhipuram Coimbatore",
  description:
    "Get in touch with Fashion Art Institute in Gandhipuram, Coimbatore. Enquire about admissions, course fees, syllabus, or visit our campus.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialCourseName = resolvedParams.course || "";

  const allCourses = await getCourses();
  const coursesList = allCourses.map((c) => ({
    id: c.slug,
    title: c.title,
  }));

  const whatsappDirectNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917397526669";
  const directWhatsappText = encodeURIComponent(
    initialCourseName
      ? `Hello! I would like to enquire about ${initialCourseName} at Fashion Art Institute.`
      : "Hello Fashion Art Institute! I would like to enquire about your courses."
  );

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Admissions</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#4A2511]">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-sm sm:text-base text-[#7A6458]">
            Have a question about class schedules, online vs classroom options,
            or course fees? Drop us an enquiry or chat directly with our
            counselors.
          </p>
        </div>

        {/* 2-Column: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Institute Details & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#4A2511] text-[#FBF6EE] rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl border border-[#E8B520]/30 relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#E8B520]">
                  Campus Location
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">
                  Fashion Art Institute
                </h3>
              </div>

              <div className="space-y-4 text-sm text-[#F4DCD6]/90">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E8B520] shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    Lakshmi Complex, 3rd Floor,
                    <br />
                    Cross Cut Road / Bus Stand Road,
                    <br />
                    Gandhipuram, Coimbatore - 641012,
                    <br />
                    Tamil Nadu, India
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Bus className="w-5 h-5 text-[#E8B520] shrink-0" />
                  <span>3 minutes walk from Gandhipuram Central Bus Stand</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#E8B520] shrink-0" />
                  <a
                    href="tel:917397526669"
                    className="hover:text-[#E8B520] transition-colors"
                  >
                    +91 73975 26669
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#E8B520] shrink-0" />
                  <a
                    href="mailto:fashionartonline@gmail.com"
                    className="hover:text-[#E8B520] transition-colors"
                  >
                    fashionartonline@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#E8B520] shrink-0" />
                  <span>Monday - Saturday: 9:30 AM to 6:30 PM</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${whatsappDirectNumber}?text=${directWhatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20b858] transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Embedded Google Maps */}
            <div className="rounded-3xl overflow-hidden border border-[#4A2511]/15 shadow-soft h-[280px] relative bg-white">
              <iframe
                title="Fashion Art Institute Location Gandhipuram Coimbatore"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2736162386343!2d76.96690467503936!3d11.018090589146056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85906c28f3a8b%3A0x6b7cf4bceee2db36!2sGandhipuram%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Form */}
          <div className="lg:col-span-7">
            <ContactForm
              initialCourseName={initialCourseName}
              coursesList={coursesList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
