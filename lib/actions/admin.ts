"use server";

import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/clerk";
import {
  CourseSchema,
  GalleryItemSchema,
  EnquiryStatusSchema,
  CourseInput,
  GalleryItemInput,
} from "@/lib/validations/course";
import {
  updateAdminEnquiryStatus,
  deleteAdminEnquiry,
  createCourseAdmin,
  updateCourseAdmin,
  deleteCourseAdmin,
  createGalleryAdmin,
  deleteGalleryAdmin,
  toggleContestApproval,
  voteForContestEntry,
} from "@/db/admin";

/* =========================================================================
   ENQUIRIES ADMIN SERVER ACTIONS
   ========================================================================= */

export async function updateEnquiryStatusAction(id: string, status: "new" | "contacted" | "enrolled" | "closed") {
  // Strict server-side verification: check admin role
  await verifyAdmin();

  // Validate with Zod
  const validated = EnquiryStatusSchema.parse({ id, status });

  await updateAdminEnquiryStatus(validated.id, validated.status);
  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");

  return { success: true };
}

export async function deleteEnquiryAction(id: string) {
  // Strict server-side verification
  await verifyAdmin();

  if (!id) throw new Error("Enquiry ID is required.");
  await deleteAdminEnquiry(id);

  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");

  return { success: true };
}

/* =========================================================================
   COURSES ADMIN SERVER ACTIONS
   ========================================================================= */

export async function createCourseAction(rawInput: CourseInput) {
  // Strict server-side verification
  await verifyAdmin();

  // Validate with Zod
  const validated = CourseSchema.parse(rawInput);

  const created = await createCourseAdmin(validated);

  revalidatePath("/admin");
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath("/");

  return { success: true, course: created };
}

export async function updateCourseAction(idOrSlug: string, updates: Partial<CourseInput>) {
  // Strict server-side verification
  await verifyAdmin();

  const updated = await updateCourseAdmin(idOrSlug, updates);

  revalidatePath("/admin");
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${idOrSlug}`);
  revalidatePath("/");

  return { success: true, course: updated };
}

export async function deleteCourseAction(id: string) {
  // Strict server-side verification
  await verifyAdmin();

  if (!id) throw new Error("Course ID is required.");
  await deleteCourseAdmin(id);

  revalidatePath("/admin");
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath("/");

  return { success: true };
}

/* =========================================================================
   GALLERY ADMIN SERVER ACTIONS
   ========================================================================= */

export async function createGalleryItemAction(rawInput: GalleryItemInput) {
  // Strict server-side verification
  await verifyAdmin();

  // Validate with Zod
  const validated = GalleryItemSchema.parse(rawInput);

  const item = await createGalleryAdmin(validated);

  revalidatePath("/admin");
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");

  return { success: true, item };
}

export async function deleteGalleryItemAction(id: string) {
  // Strict server-side verification
  await verifyAdmin();

  if (!id) throw new Error("Gallery ID is required.");
  await deleteGalleryAdmin(id);

  revalidatePath("/admin");
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");

  return { success: true };
}

/* =========================================================================
   CONTEST ADMIN & PUBLIC VOTING ACTIONS
   ========================================================================= */

export async function toggleContestApprovalAction(id: string) {
  await verifyAdmin();
  await toggleContestApproval(id);

  revalidatePath("/admin");
  revalidatePath("/admin/contest");
  revalidatePath("/contest");

  return { success: true };
}

export async function voteContestEntryAction(id: string) {
  if (!id) throw new Error("Contest Entry ID required.");

  const res = await voteForContestEntry(id);
  revalidatePath("/contest");
  revalidatePath("/admin/contest");

  return res;
}
