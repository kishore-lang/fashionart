"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloating() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917397526669";
  const defaultMessage = encodeURIComponent(
    "Hello Fashion Art Institute! I would like to enquire about your fashion designing courses and admissions."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 flex items-center group"
    >
      <div className="mr-3 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#4A2511] text-[#FBF6EE] text-xs font-medium py-1.5 px-3 rounded-full shadow-lg border border-[#E8B520]/40 pointer-events-none">
        Chat with Admissions
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 relative border-2 border-white focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping -z-10" />
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </aside>
  );
}
