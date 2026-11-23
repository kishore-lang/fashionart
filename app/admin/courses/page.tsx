import React from "react";
import { Metadata } from "next";
import { getAllCoursesAdmin } from "@/db/admin";
import { CoursesManager } from "@/components/admin/CoursesManager";

export const metadata: Metadata = {
  title: "Manage Courses | Fashion Art Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await getAllCoursesAdmin();

  return <CoursesManager initialCourses={courses} />;
}
