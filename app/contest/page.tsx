import React from "react";
import { Metadata } from "next";
import { getContestEntriesAdmin } from "@/db/admin";
import { ContestShowcase } from "@/components/contest/ContestShowcase";

export const metadata: Metadata = {
  title: "20-Day Student Designer Contest 2026 | Fashion Art Institute Coimbatore",
  description: "Vote for your favorite original student creations. Annual couture exhibition celebrating women couturiers in Tamil Nadu.",
};

export const dynamic = "force-dynamic";

export default async function ContestPage() {
  const entries = await getContestEntriesAdmin();

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContestShowcase initialEntries={entries} />
      </div>
    </div>
  );
}
