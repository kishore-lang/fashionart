import React from "react";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";

export const metadata: Metadata = {
  title: "Student Portal & Dashboard | Fashion Art Institute Coimbatore",
  description: "Access your enrolled courses, syllabus progress, and Central Govt certification status.",
};

export default async function DashboardPage() {
  let studentName = "Priya Sundaram";
  let studentEmail = "priya.sundaram@example.com";

  try {
    const user = await currentUser();
    if (user) {
      studentName =
        user.fullName ||
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "Student Couturier";
      studentEmail =
        user.emailAddresses[0]?.emailAddress || "student@fashionart.com";
    }
  } catch {
    // Demo fallback when Clerk credentials are not provisioned
  }

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudentDashboard
          studentName={studentName}
          studentEmail={studentEmail}
        />
      </div>
    </div>
  );
}
