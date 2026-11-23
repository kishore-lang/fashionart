"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Shield,
  Home,
  BookOpen,
  Trophy,
  Image as ImageIcon,
  Award,
  Star,
  Info,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/contest", label: "Contest", icon: Trophy },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/achievements", label: "Achievements", icon: Award },
  { href: "/testimonials", label: "Testimonials", icon: Star },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: PhoneCall },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 bg-[#FBF6EE] ${
          isScrolled
            ? "shadow-md py-2 border-b border-[#4A2511]/15"
            : "py-2.5 sm:py-3.5 border-b border-[#4A2511]/10"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full gap-3">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 py-1 touch-manipulation"
              aria-label="Fashion Art Institute Home"
            >
              <Image
                src="/images/logo.png"
                alt="Fashion Art Institute for Creative Skills"
                width={200}
                height={60}
                className="h-10 sm:h-12 w-auto object-contain hover:opacity-90 transition-opacity"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 touch-manipulation ${
                      isActive
                        ? "text-[#4A2511] font-bold bg-[#4A2511]/10 shadow-inner"
                        : "text-[#4A2511] hover:text-[#8F6C07] hover:bg-[#4A2511]/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTAs: Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/admin"
                className="text-xs uppercase tracking-wider font-semibold text-[#4A2511] hover:text-[#8F6C07] px-3 py-2 flex items-center gap-1.5 transition-colors border border-[#4A2511]/20 rounded-xl hover:border-[#4A2511] touch-manipulation"
              >
                <Shield className="w-3.5 h-3.5 text-[#E8B520]" />
                <span>Admin</span>
              </Link>
              <Link href="/courses">
                <Button variant="gold" size="sm" className="gap-1.5 shadow-sm touch-manipulation">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Courses</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link href="/admin">
                <button
                  type="button"
                  className="px-2.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#4A2511]/15 text-[#4A2511] flex items-center gap-1 shadow-sm touch-manipulation"
                >
                  <Shield className="w-3.5 h-3.5 text-[#E8B520]" />
                  <span>Admin</span>
                </button>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-[#4A2511] bg-white hover:bg-[#F4DCD6] border border-[#4A2511]/20 transition-colors shadow-sm touch-manipulation active:scale-95"
                aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#4A2511]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#4A2511]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative z-50 w-full max-h-[85vh] bg-[#FBF6EE] border-b-2 border-[#E8B520] shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-top duration-200">
            {/* Header inside drawer */}
            <div className="flex items-center justify-between p-4 border-b border-[#4A2511]/10">
              <Image
                src="/images/logo.png"
                alt="Fashion Art Institute"
                width={160}
                height={50}
                className="h-9 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white border border-[#4A2511]/15 text-[#4A2511] touch-manipulation active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links with Big 50px+ Touch Targets */}
            <nav className="p-4 space-y-1.5 flex-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full min-h-[50px] px-4 py-3 rounded-2xl flex items-center justify-between text-base font-semibold transition-all touch-manipulation active:scale-[0.98] ${
                      isActive
                        ? "bg-[#4A2511] text-[#E8B520] shadow-md"
                        : "bg-white text-[#4A2511] border border-[#4A2511]/10 hover:border-[#E8B520] active:bg-[#F4DCD6]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${
                          isActive ? "bg-[#E8B520] text-[#4A2511]" : "bg-[#FBF6EE] text-[#4A2511]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 ${
                        isActive ? "text-[#E8B520]" : "text-[#7A6458]"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Bottom Actions */}
            <div className="p-4 pt-2 border-t border-[#4A2511]/10 bg-white/60 space-y-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button variant="gold" size="lg" className="w-full justify-center gap-2 text-base touch-manipulation">
                  <PhoneCall className="w-5 h-5" />
                  <span>Enquire for Admission</span>
                </Button>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button variant="outline" size="sm" className="w-full justify-center gap-2 text-xs text-[#7A6458] touch-manipulation">
                  <Shield className="w-4 h-4 text-[#E8B520]" />
                  <span>Open Director Admin Panel</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
