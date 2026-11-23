import React from "react";
import { Metadata } from "next";
import { ContestManager } from "@/components/admin/ContestManager";
import {
  getDollVotesAction,
  getDollImageOverridesAction,
} from "@/lib/actions/contest";

export const metadata: Metadata = {
  title: "Manage 100 Doll Contest & Votes | Fashion Art Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminContestPage() {
  const votes = await getDollVotesAction();
  const overrides = await getDollImageOverridesAction();

  return (
    <ContestManager
      initialVotes={votes}
      initialOverrides={overrides}
    />
  );
}
