import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Award,
  Sparkles,
  Target,
  Compass,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Founder Suguna Shanmugam & Institute | Fashion Art Coimbatore",
  description:
    "Discover the inspiring story of Fashion Art Institute for Creative Skills. Founded by Suguna Shanmugam with the vision to mould homemakers into independent women entrepreneurs.",
};

const TIMELINE = [
  {
    year: "2009",
    title: "The Humble Spark",
    description:
      "Suguna Shanmugam began tailoring with a single machine from home, mastering classic Indian pattern cutting and personalizing fitting nuances for hundreds of private clients.",
  },
  {
    year: "2017",
    title: "Best Creative Designer of Tamil Nadu",
    description:
      "Honored with the prestigious State Award for outstanding bespoke bridal design and innovative zero-wrinkle blouse drafting techniques.",
  },
  {
    year: "2018",
    title: "Fashion Art Institute Inauguration",
    description:
      "Inaugurated our premier campus in Lakshmi Complex, Gandhipuram, Coimbatore with central government recognized certification and practical workshops.",
  },
  {
    year: "2019",
    title: "Fashion Art Fest 2019",
    description:
      "Hosted our first grand fashion exhibition showcasing 120+ student-designed gowns, Anarkalis, and traditional bridal sets.",
  },
  {
    year: "2021",
    title: "Yaadhumaagi Nirpaval",
    description:
      "Spearheaded Tamil Nadu's landmark women empowerment conference celebrating 250+ female home-tailors becoming financially self-reliant.",
  },
  {
    year: "2022",
    title: "Universal Record Forum (URF) World Record",
    description:
      "Official World Record achieved: 50 student designers crafted 300 custom garments in 3 hours with rigorous precision fitting.",
  },
  {
    year: "2025",
    title: "Excellence Awards & Global Online Expansion",
    description:
      "Recognized with multiple education leadership honors, expanding interactive digital masterclasses to students across Singapore, Malaysia, Dubai, and USA.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B520]/15 text-[#8F6C07] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage & Purpose</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#4A2511] leading-tight">
            Empowering Women to Lead, Create, and Succeed
          </h1>
          <p className="text-base sm:text-lg text-[#7A6458] leading-relaxed">
            Founded with heart in Gandhipuram, Coimbatore, Fashion Art Institute
            for Creative Skills exists to turn raw creative curiosity into
            world-class tailoring and entrepreneurship.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#4A2511]/10 shadow-soft space-y-4 relative overflow-hidden group hover:border-[#E8B520]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E8B520]/20 flex items-center justify-center text-[#8F6C07]">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#4A2511]">
              Our Vision
            </h2>
            <p className="text-sm sm:text-base text-[#7A6458] leading-relaxed">
              &ldquo;To create and mould female homemakers and young women into
              confident, financially self-reliant fashion entrepreneurs and
              boutique leaders across India and abroad.&rdquo;
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#4A2511]/10 shadow-soft space-y-4 relative overflow-hidden group hover:border-[#E8B520]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#4A2511]/10 flex items-center justify-center text-[#4A2511]">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#4A2511]">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base text-[#7A6458] leading-relaxed">
              Provide affordable, high-standard, 100% practical education with
              structured measurement math, personalized mentorship, government
              certification, and real business setup training.
            </p>
          </div>
        </div>

        {/* Founder Story Spotlight */}
        <div className="bg-[#F5ECE1]/60 rounded-3xl p-8 sm:p-14 border border-[#4A2511]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-white relative">
                <Image
                  src="/images/founder_saree.png"
                  alt="Suguna Shanmugam - Founder & Managing Director"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#E8B520] block">
                Meet the Founder
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2511]">
                Suguna Shanmugam
              </h2>
              <p className="text-xs uppercase tracking-widest text-[#7A6458]">
                Master Fashion Couturier & Managing Director
              </p>

              <p className="text-sm text-[#7A6458] leading-relaxed">
                Suguna Shanmugam has spent over a decade perfecting pattern
                geometry and fitting science. Recognizing how many women wished
                to earn an independent income from home but lacked professional
                guidance, she established Fashion Art Institute to offer
                approachable, step-by-step masterclasses.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-[#4A2511]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E8B520]" />
                  <span>Best Creative Designer (TN 2017)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E8B520]" />
                  <span>Universal Record Forum Mentor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E8B520]" />
                  <span>Central Govt Approved Faculty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E8B520]" />
                  <span>3500+ Successful Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Timeline 2009 -> 2025 */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-heading text-3xl font-bold text-[#4A2511]">
              The Journey of Excellence
            </h2>
            <p className="text-sm text-[#7A6458]">
              From our modest beginning in 2009 to becoming a state-renowned
              fashion institution.
            </p>
          </div>

          <div className="relative border-l-2 border-[#E8B520]/40 ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-10">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative group">
                {/* Year Marker */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 rounded-full bg-[#4A2511] text-[#E8B520] border-2 border-white shadow-md flex items-center justify-center text-xs font-bold">
                  {item.year.slice(2)}
                </div>
                <div className="bg-white rounded-2xl p-6 border border-[#4A2511]/10 shadow-soft hover:shadow-soft-lg transition-all">
                  <span className="text-xs font-bold tracking-widest text-[#E8B520] uppercase block mb-1">
                    {item.year}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#4A2511] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#7A6458] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#4A2511] text-white rounded-3xl p-10 sm:p-14 text-center space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Ready to Begin Your Fashion Design Journey?
          </h2>
          <p className="text-sm sm:text-base text-[#F4DCD6] max-w-xl mx-auto">
            Join hundreds of motivated women learning this month. Visit our
            Gandhipuram campus or schedule a free counseling call today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/courses">
              <Button variant="gold" size="lg" className="shadow-gold">
                Browse Courses
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Talk to Admissions Faculty
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
