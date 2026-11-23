"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, PhoneCall, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/contest", label: "Contest" },
  { href: "/gallery", label: "Gallery" },
  { href: "/achievements", label: "Achievements" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#FBF6EE]/95 backdrop-blur-md shadow-sm py-2.5 sm:py-3 border-b border-[#4A2511]/10"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full gap-2">
          {/* Logo & Institute Name */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#4A2511] flex items-center justify-center border border-[#E8B520]/50 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
              <span className="font-heading text-sm sm:text-lg font-bold text-[#E8B520]">
                FA
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base sm:text-xl font-bold tracking-tight text-[#4A2511] leading-tight group-hover:text-[#E8B520] transition-colors">
                Fashion Art
              </span>
              <span className="text-[9px] sm:text-xs font-medium tracking-wider text-[#7A6458] uppercase">
                Institute for Creative Skills
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#E8B520] relative py-1 ${
                    isActive ? "text-[#E8B520] font-semibold" : "text-[#4A2511]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E8B520] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs: Admin & Enquiry (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs uppercase tracking-wider font-semibold text-[#4A2511] hover:text-[#E8B520] px-3 py-1.5 flex items-center gap-1.5 transition-colors border border-[#4A2511]/15 rounded-full hover:border-[#E8B520]"
            >
              <Shield className="w-3.5 h-3.5 text-[#E8B520]" />
              Admin Portal
            </Link>
            <Link href="/courses">
              <Button variant="gold" size="sm" className="gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Explore Courses
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center xl:hidden shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#4A2511] bg-white/80 hover:bg-[#F4DCD6] border border-[#4A2511]/15 transition-colors focus:outline-none shadow-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#4A2511]" />
              ) : (
                <Menu className="w-5 h-5 text-[#4A2511]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FBF6EE] border-b border-[#4A2511]/15 px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#4A2511] hover:text-[#E8B520] py-2 border-b border-[#4A2511]/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2.5">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Shield className="w-4 h-4 text-[#E8B520]" />
                  Admin Portal
                </Button>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="primary" size="sm" className="w-full">
                  Enquire Now
                </Button>
              </Link>
              <Link
                href="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="gold" size="sm" className="w-full">
                  View All Courses
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
