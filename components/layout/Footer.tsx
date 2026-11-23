import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Award,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#4A2511] text-[#FBF6EE] pt-16 pb-8 border-t border-[#E8B520]/20 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8B520]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Institute About */}
          <div className="space-y-4">
            <div className="bg-[#FBF6EE] px-3.5 py-2 rounded-2xl w-fit shadow-md border border-[#E8B520]/40">
              <Image
                src="/images/logo.png"
                alt="Fashion Art Institute for Creative Skills"
                width={180}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-[#F4DCD6]/80 leading-relaxed">
              Institute for Creative Skills. Empowering women, homemakers, and
              aspiring designers into successful boutique owners and fashion
              entrepreneurs through hands-on mastery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/fashion_art_cbe/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E8B520] hover:text-[#4A2511] flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E8B520] hover:text-[#4A2511] flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-base font-semibold text-[#E8B520] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F4DCD6]/85">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#E8B520] transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#E8B520] transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> About
                  Founder & Institute
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-[#E8B520] transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> All
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/#achievements"
                  className="hover:text-[#E8B520] transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> World
                  Record & Awards
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#E8B520] transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> Contact &
                  Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Courses */}
          <div className="space-y-4">
            <h4 className="font-heading text-base font-semibold text-[#E8B520] uppercase tracking-wider">
              Flagship Courses
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F4DCD6]/85">
              <li>
                <Link
                  href="/courses/self-designing-course"
                  className="hover:text-[#E8B520] transition-colors"
                >
                  Self Designing Masterclass (74 Steps)
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/designer-patterns-advanced"
                  className="hover:text-[#E8B520] transition-colors"
                >
                  Designer Patterns & Royal Gowns
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/advanced-aari-embroidery"
                  className="hover:text-[#E8B520] transition-colors"
                >
                  Advanced Aari Embroidery (79 Stitches)
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/terracotta-jewellery-making"
                  className="hover:text-[#E8B520] transition-colors"
                >
                  Terracotta Jewellery Crafting
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/fashion-designing-diploma"
                  className="hover:text-[#E8B520] transition-colors"
                >
                  Diploma in Fashion Designing (Classroom)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-heading text-base font-semibold text-[#E8B520] uppercase tracking-wider">
              Institute Campus
            </h4>
            <div className="space-y-3 text-sm text-[#F4DCD6]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8B520] shrink-0 mt-1" />
                <span>
                  Lakshmi Complex, 3rd Floor,
                  <br />
                  Gandhipuram, Coimbatore - 641012,
                  <br />
                  Tamil Nadu, India (3 mins walk from Bus Stand)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E8B520] shrink-0" />
                <a
                  href="tel:917397526669"
                  className="hover:text-[#E8B520] transition-colors"
                >
                  +91 73975 26669
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E8B520] shrink-0" />
                <a
                  href="mailto:fashionartonline@gmail.com"
                  className="hover:text-[#E8B520] transition-colors"
                >
                  fashionartonline@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1 text-xs text-[#E8B520]">
                <Clock className="w-3.5 h-3.5" />
                <span>Mon - Sat: 9:30 AM – 6:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F4DCD6]/60">
          <p>
            © {new Date().getFullYear()} Fashion Art Institute for Creative
            Skills. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[#E8B520]">
            <Award className="w-3.5 h-3.5" />
            <span>Central Govt Authorised Certificate • URF World Record Holder</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
