import React from "react";
import { Metadata } from "next";
import { getCurrentSessionUser } from "@/lib/clerk";
import { AdminHeader, AdminUnauthorizedCard } from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin Console | Fashion Art Institute Coimbatore",
  description: "Manage courses, student enquiries, gallery showcase, and contest submissions.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentSessionUser();

  if (user.role !== "admin") {
    return <AdminUnauthorizedCard />;
  }

  return (
    <div className="min-h-screen bg-[#FBF6EE] flex flex-col">
      <AdminHeader adminName={user.name} adminEmail={user.email} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>
    </div>
  );
}
