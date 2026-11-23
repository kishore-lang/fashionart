import { db } from "./index";
import * as schema from "./schema";
import { eq, desc } from "drizzle-orm";
import {
  INITIAL_ADMIN_ENQUIRIES,
  INITIAL_CONTEST_ENTRIES,
  AdminEnquiry,
  AdminContestEntry,
} from "@/data/seedAdmin";
import { SEED_COURSES, CourseData } from "@/data/seedCourses";
import { SEED_GALLERY, GallerySeedItem } from "@/data/seedPhase2";
import { CourseInput, GalleryItemInput } from "@/lib/validations/course";

// In-memory runtime cache for server persistence during local/demo sessions
let memoryEnquiries: AdminEnquiry[] = [...INITIAL_ADMIN_ENQUIRIES];
let memoryCourses: CourseData[] = [...SEED_COURSES];
let memoryGallery: GallerySeedItem[] = [...SEED_GALLERY];
let memoryContest: AdminContestEntry[] = [...INITIAL_CONTEST_ENTRIES];

/* =========================================================================
   ENQUIRIES
   ========================================================================= */

export async function getAdminEnquiries(): Promise<AdminEnquiry[]> {
  if (db) {
    try {
      const rows = await db
        .select({
          id: schema.enquiries.id,
          name: schema.enquiries.name,
          email: schema.enquiries.email,
          phone: schema.enquiries.phone,
          courseId: schema.enquiries.courseId,
          message: schema.enquiries.message,
          status: schema.enquiries.status,
          createdAt: schema.enquiries.createdAt,
        })
        .from(schema.enquiries)
        .orderBy(desc(schema.enquiries.createdAt));

      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          name: r.name,
          email: r.email,
          phone: r.phone,
          courseId: r.courseId || undefined,
          courseTitle: "Course Enquiry",
          message: r.message,
          status: (r.status as AdminEnquiry["status"]) || "new",
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        }));
      }
    } catch (err) {
      console.warn("Neon DB enquiries query failed, using memory store:", err);
    }
  }

  return memoryEnquiries;
}

export async function updateAdminEnquiryStatus(
  id: string,
  status: "new" | "contacted" | "enrolled" | "closed"
): Promise<boolean> {
  if (db) {
    try {
      await db
        .update(schema.enquiries)
        .set({ status })
        .where(eq(schema.enquiries.id, id));
    } catch (err) {
      console.warn("Neon DB update enquiry failed, falling back to memory:", err);
    }
  }

  memoryEnquiries = memoryEnquiries.map((e) =>
    e.id === id ? { ...e, status } : e
  );
  return true;
}

export async function deleteAdminEnquiry(id: string): Promise<boolean> {
  if (db) {
    try {
      await db.delete(schema.enquiries).where(eq(schema.enquiries.id, id));
    } catch (err) {
      console.warn("Neon DB delete enquiry failed, falling back to memory:", err);
    }
  }

  memoryEnquiries = memoryEnquiries.filter((e) => e.id !== id);
  return true;
}

/* =========================================================================
   COURSES (ADMIN CRUD)
   ========================================================================= */

export async function getAllCoursesAdmin(): Promise<CourseData[]> {
  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.courses)
        .orderBy(desc(schema.courses.createdAt));

      if (rows && rows.length > 0) {
        return rows as unknown as CourseData[];
      }
    } catch (err) {
      console.warn("Neon DB courses query failed, using memory store:", err);
    }
  }

  return memoryCourses;
}

export async function createCourseAdmin(input: CourseInput): Promise<CourseData> {
  const slug =
    input.slug ||
    input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const newCourse: CourseData = {
    id: input.id || `course-${Date.now()}`,
    slug,
    title: input.title,
    description: input.description,
    category: input.category,
    mode: input.mode,
    price: input.price,
    durationDays: input.durationDays,
    stepsCount: input.stepsCount,
    thumbnailUrl: input.thumbnailUrl,
    syllabus: input.syllabus,
    nuances: input.nuances,
    isFeatured: input.isFeatured,
    isPublished: input.isPublished,
  };

  if (db) {
    try {
      await db.insert(schema.courses).values({
        slug: newCourse.slug,
        title: newCourse.title,
        description: newCourse.description,
        category: newCourse.category,
        mode: newCourse.mode,
        price: newCourse.price,
        durationDays: newCourse.durationDays,
        stepsCount: newCourse.stepsCount,
        thumbnailUrl: newCourse.thumbnailUrl,
        syllabus: newCourse.syllabus,
        nuances: newCourse.nuances,
        isFeatured: newCourse.isFeatured,
        isPublished: newCourse.isPublished,
      });
    } catch (err) {
      console.warn("Neon DB insert course failed, saved to memory store:", err);
    }
  }

  memoryCourses = [newCourse, ...memoryCourses];
  return newCourse;
}

export async function deleteCourseAdmin(id: string): Promise<boolean> {
  if (db) {
    try {
      await db.delete(schema.courses).where(eq(schema.courses.id, id));
    } catch (err) {
      console.warn("Neon DB delete course failed, falling back to memory:", err);
    }
  }

  memoryCourses = memoryCourses.filter((c) => c.id !== id);
  return true;
}

/* =========================================================================
   GALLERY (ADMIN CRUD)
   ========================================================================= */

export async function getAllGalleryAdmin(): Promise<GallerySeedItem[]> {
  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.gallery)
        .orderBy(desc(schema.gallery.createdAt));

      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          imageUrl: r.imageUrl,
          category: r.category as GallerySeedItem["category"],
          caption: r.caption || "",
        }));
      }
    } catch (err) {
      console.warn("Neon DB gallery query failed, using memory store:", err);
    }
  }

  return memoryGallery;
}

export async function createGalleryAdmin(input: GalleryItemInput): Promise<GallerySeedItem> {
  const newItem: GallerySeedItem = {
    id: input.id || `gal-${Date.now()}`,
    imageUrl: input.imageUrl,
    category: input.category,
    caption: input.caption || "",
  };

  if (db) {
    try {
      await db.insert(schema.gallery).values({
        imageUrl: newItem.imageUrl,
        category: newItem.category,
        caption: newItem.caption,
      });
    } catch (err) {
      console.warn("Neon DB insert gallery failed, saved to memory store:", err);
    }
  }

  memoryGallery = [newItem, ...memoryGallery];
  return newItem;
}

export async function deleteGalleryAdmin(id: string): Promise<boolean> {
  if (db) {
    try {
      await db.delete(schema.gallery).where(eq(schema.gallery.id, id));
    } catch (err) {
      console.warn("Neon DB delete gallery failed, falling back to memory:", err);
    }
  }

  memoryGallery = memoryGallery.filter((g) => g.id !== id);
  return true;
}

/* =========================================================================
   CONTEST & VOTING (NEON DB + FALLBACK)
   ========================================================================= */

export async function getContestEntriesAdmin(): Promise<AdminContestEntry[]> {
  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.contestEntries)
        .orderBy(desc(schema.contestEntries.votesCount));

      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          studentName: r.studentName,
          title: r.title,
          description: r.description,
          imageUrl: r.imageUrl,
          category: r.category,
          votesCount: r.votesCount,
          isApproved: r.isApproved,
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        }));
      }
    } catch (err) {
      console.warn("Neon DB contest query failed, falling back to memory store:", err);
    }
  }

  return memoryContest;
}

export async function toggleContestApproval(id: string): Promise<boolean> {
  if (db) {
    try {
      const current = await db
        .select({ isApproved: schema.contestEntries.isApproved })
        .from(schema.contestEntries)
        .where(eq(schema.contestEntries.id, id))
        .limit(1);

      if (current.length > 0) {
        await db
          .update(schema.contestEntries)
          .set({ isApproved: !current[0].isApproved })
          .where(eq(schema.contestEntries.id, id));
      }
    } catch (err) {
      console.warn("Neon DB contest update failed:", err);
    }
  }

  memoryContest = memoryContest.map((c) =>
    c.id === id ? { ...c, isApproved: !c.isApproved } : c
  );
  return true;
}

export async function voteForContestEntry(id: string): Promise<{ success: boolean; votes: number }> {
  let updatedVotes = 0;

  if (db) {
    try {
      const entry = await db
        .select({ votesCount: schema.contestEntries.votesCount })
        .from(schema.contestEntries)
        .where(eq(schema.contestEntries.id, id))
        .limit(1);

      if (entry.length > 0) {
        updatedVotes = (entry[0].votesCount || 0) + 1;
        await db
          .update(schema.contestEntries)
          .set({ votesCount: updatedVotes })
          .where(eq(schema.contestEntries.id, id));
      }
    } catch (err) {
      console.warn("Neon DB vote update failed:", err);
    }
  }

  memoryContest = memoryContest.map((c) => {
    if (c.id === id) {
      updatedVotes = c.votesCount + 1;
      return { ...c, votesCount: updatedVotes };
    }
    return c;
  });

  return { success: true, votes: updatedVotes };
}

/* =========================================================================
   OVERVIEW STATS
   ========================================================================= */

export async function getAdminOverviewStats() {
  const enquiries = await getAdminEnquiries();
  const courses = await getAllCoursesAdmin();
  const gallery = await getAllGalleryAdmin();
  const contest = await getContestEntriesAdmin();

  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;
  const totalVotes = contest.reduce((sum, c) => sum + c.votesCount, 0);

  return {
    totalEnquiries: enquiries.length,
    newEnquiries: newEnquiriesCount,
    totalCourses: courses.length,
    publishedCourses: courses.filter((c) => c.isPublished).length,
    totalGalleryItems: gallery.length,
    totalContestEntries: contest.length,
    totalVotes,
    recentEnquiries: enquiries.slice(0, 5),
  };
}
