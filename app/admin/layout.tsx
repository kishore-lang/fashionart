import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminPasswordAuth } from "@/components/admin/AdminPasswordAuth";

export const metadata: Metadata = {
  title: "Admin Console | Fashion Art Institute Coimbatore",
  description:
    "Manage courses, student enquiries, gallery showcase, and doll contest submissions.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("fashionart_admin_session");
  const isAuthenticatedInitially = sessionCookie?.value === "authenticated";

  return (
    <div className="min-h-screen bg-[#FBF6EE] flex flex-col">
      <AdminPasswordAuth isAuthenticatedInitially={isAuthenticatedInitially}>
        <AdminHeader adminName="Suguna Shanmugam" adminEmail="director@fashionart.com" />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {children}
        </main>
      </AdminPasswordAuth>
    </div>
  );
}
