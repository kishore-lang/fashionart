import React from "react";
import { Metadata } from "next";
import { getContestEntriesAdmin } from "@/db/admin";
import { ContestManager } from "@/components/admin/ContestManager";

export const metadata: Metadata = {
  title: "Manage Student Contest | Fashion Art Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminContestPage() {
  const entries = await getContestEntriesAdmin();

  return <ContestManager initialEntries={entries} />;
}
