import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ClerkProvider } from "@clerk/nextjs";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4A2511",
};

export const metadata: Metadata = {
  title: "Fashion Art Institute for Creative Skills | Gandhipuram, Coimbatore",
  description:
    "Premier women's fashion designing, bespoke tailoring, and Aari embroidery institute in Gandhipuram, Coimbatore. Central Govt authorised certification, URF World Record holder.",
  keywords: [
    "Fashion designing institute Coimbatore",
    "Tailoring classes Gandhipuram",
    "Aari embroidery classes",
    "Suguna Shanmugam",
    "Fashion Art Institute",
    "Boutique training Coimbatore",
    "Blouse stitching courses",
  ],
  authors: [{ name: "Fashion Art Institute" }],
  openGraph: {
    title: "Fashion Art Institute for Creative Skills | Coimbatore",
    description:
      "Design Your Dream. Stitch Your Success. Women's boutique tailoring & fashion designing institute in Coimbatore.",
    url: "https://fashionartonline.com",
    siteName: "Fashion Art Institute",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Fashion Art Institute Coimbatore",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: "Fashion Art Institute for Creative Skills",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
    "@id": "https://fashionartonline.com",
    url: "https://fashionartonline.com",
    telephone: "+91-7397526669",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lakshmi Complex, 3rd Floor",
      addressLocality: "Gandhipuram",
      addressRegion: "Tamil Nadu",
      postalCode: "641012",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "11.0183",
      longitude: "76.9691",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:30",
      closes: "18:30",
    },
    founder: {
      "@type": "Person",
      name: "Suguna Shanmugam",
      jobTitle: "Founder & Chief Fashion Couturier",
    },
  };

  const hasClerkKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

  const content = (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#FBF6EE] text-[#4A2511] antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <WhatsAppFloating />
        <MobileBottomNav />
      </body>
    </html>
  );

  if (hasClerkKey) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
