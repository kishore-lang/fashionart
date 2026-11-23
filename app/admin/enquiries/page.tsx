import React from "react";
import { Metadata } from "next";
import { getAdminEnquiries } from "@/db/admin";
import { EnquiriesManager } from "@/components/admin/EnquiriesManager";

export const metadata: Metadata = {
  title: "Manage Enquiries | Fashion Art Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const enquiries = await getAdminEnquiries();

  return <EnquiriesManager initialEnquiries={enquiries} />;
}
