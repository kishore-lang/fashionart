import { HeroSection } from "@/components/home/HeroSection";
import { HomeImageCarousel } from "@/components/home/HomeImageCarousel";
import { InteractivePatternStudio } from "@/components/home/InteractivePatternStudio";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { StatsSection } from "@/components/home/StatsSection";
import { WorldRecordBanner } from "@/components/home/WorldRecordBanner";
import { FounderSection } from "@/components/home/FounderSection";
import { EventsTimeline } from "@/components/home/EventsTimeline";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Campus & Atelier Image Carousel */}
      <HomeImageCarousel />

      {/* 3. Interactive 3D & 2D Pattern Drafting Studio (TailorNova CAD) */}
      <InteractivePatternStudio />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Featured Courses */}
      <FeaturedCourses />

      {/* 6. Achievements Counter (Count-up) */}
      <StatsSection />

      {/* 7. World Record Banner (URF 2022) */}
      <WorldRecordBanner />

      {/* 8. Founder Section */}
      <FounderSection />

      {/* 9. Events Timeline */}
      <EventsTimeline />

      {/* 10. Testimonials Slider & Instagram Link */}
      <TestimonialsSection />
    </>
  );
}
