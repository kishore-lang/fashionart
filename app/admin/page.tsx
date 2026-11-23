import React from "react";
import { getAdminOverviewStats } from "@/db/admin";
import { AdminOverview } from "@/components/admin/AdminOverview";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminOverviewStats();

  return <AdminOverview stats={stats} />;
}
