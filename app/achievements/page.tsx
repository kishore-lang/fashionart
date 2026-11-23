import React from "react";
import { Metadata } from "next";
import { EditorialAchievements } from "@/components/achievements/EditorialAchievements";

export const metadata: Metadata = {
  title:
    "Achievements & Media Recognition | Fashion Art Institute Coimbatore",
  description:
    "Featured in Kumudam Snegithi & Dinamalar Penmalar. Universal Record Forum (URF) World Record holder, Best Creative Designer of Tamil Nadu, and Radio City Kovai Icon.",
  openGraph: {
    title:
      "A Journey of Passion, Purpose & Recognition | Fashion Art Institute",
    description:
      "Explore real press features in Kumudam Snegithi and Dinamalar, URF World Record, Radio City Kovai Icon honours, and milestones empowering women through fashion.",
    images: [
      {
        url: "/images/achievements/kumudam-snegithi-feature.webp",
        width: 1200,
        height: 630,
        alt: "Kumudam Snegithi Media Feature - Fashion Art Institute",
      },
    ],
  },
};

export default function AchievementsPage() {
  return <EditorialAchievements />;
}
