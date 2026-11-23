import React from "react";
import { Metadata } from "next";
import { DollVotingForm } from "@/components/contest/DollVotingForm";
import { getDollImageOverridesAction } from "@/lib/actions/contest";

export const metadata: Metadata = {
  title: "Doll Contest Voting (Choose 1 to 100) | Fashion Art Institute Coimbatore",
  description:
    "Official voting portal for the 20-Day Creative Doll Designing Contest. Choose your favorite doll from 1 to 100, verify your Instagram follow, and cast your verified vote.",
};

export const dynamic = "force-dynamic";

export default async function ContestPage() {
  const overrides = await getDollImageOverridesAction();

  return (
    <div className="py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DollVotingForm imageOverrides={overrides} />
      </div>
    </div>
  );
}
