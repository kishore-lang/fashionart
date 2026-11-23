import "./dns.js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { SEED_COURSES, CourseData } from "@/data/seedCourses";
import {
  SEED_GALLERY,
  SEED_ACHIEVEMENTS,
  SEED_TESTIMONIALS,
  GallerySeedItem,
  AchievementSeedItem,
  TestimonialSeedItem,
} from "@/data/seedPhase2";
import { eq, desc } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;

export const db =
  connectionString && !connectionString.includes("username:password")
    ? drizzle(neon(connectionString), { schema })
    : null;

/**
 * Fetch all published courses with optional filtering
 */
export async function getCourses(filters?: {
  mode?: string;
  category?: string;
}): Promise<CourseData[]> {
  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.courses)
        .where(eq(schema.courses.isPublished, true))
        .orderBy(desc(schema.courses.createdAt));

      if (rows && rows.length > 0) {
        let list = rows as unknown as CourseData[];
        if (filters?.mode && filters.mode !== "all") {
          list = list.filter(
            (c) => c.mode === filters.mode || c.mode === "both"
          );
        }
        if (filters?.category && filters.category !== "all") {
          list = list.filter((c) => c.category === filters.category);
        }
        return list;
      }
    } catch (err) {
      console.warn("Neon DB query failed, falling back to seed courses:", err);
    }
  }

  // Fallback to static seed data
  let list = SEED_COURSES.filter((c) => c.isPublished);
  if (filters?.mode && filters.mode !== "all") {
    list = list.filter((c) => c.mode === filters.mode || c.mode === "both");
  }
  if (filters?.category && filters.category !== "all") {
    list = list.filter((c) => c.category === filters.category);
  }
  return list;
}

/**
 * Fetch a single course by its unique slug
 */
export async function getCourseBySlug(
  slug: string
): Promise<CourseData | null> {
  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.courses)
        .where(eq(schema.courses.slug, slug))
        .limit(1);

      if (rows && rows.length > 0) {
        return rows[0] as unknown as CourseData;
      }
    } catch (err) {
      console.warn(`Neon DB query for slug ${slug} failed:`, err);
    }
  }

  const found = SEED_COURSES.find((c) => c.slug === slug);
  return found || null;
}

/**
 * Fetch featured courses for home page
 */
export async function getFeaturedCourses(): Promise<CourseData[]> {
  const all = await getCourses();
  return all.filter((c) => c.isFeatured).slice(0, 4);
}

/**
 * Fetch gallery items with optional category filtering
 */
export async function getGalleryItems(
  category?: string
): Promise<GallerySeedItem[]> {
  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.gallery)
        .orderBy(desc(schema.gallery.createdAt));

      if (rows && rows.length > 0) {
        let items = rows.map((r) => ({
          id: r.id,
          imageUrl: r.imageUrl,
          category: r.category as GallerySeedItem["category"],
          caption: r.caption || "",
        }));

        if (category && category !== "All") {
          items = items.filter((i) => i.category === category);
        }
        return items;
      }
    } catch (err) {
      console.warn("Neon DB query for gallery failed:", err);
    }
  }

  let items = SEED_GALLERY;
  if (category && category !== "All") {
    items = items.filter((i) => i.category === category);
  }
  return items;
}

/**
 * Fetch achievements list
 */
export async function getAchievements(): Promise<AchievementSeedItem[]> {
  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.achievements)
        .orderBy(desc(schema.achievements.createdAt));

      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          title: r.title,
          year: r.year,
          description: r.description,
          imageUrl: r.imageUrl,
          badge: "Institute Honour",
        }));
      }
    } catch (err) {
      console.warn("Neon DB query for achievements failed:", err);
    }
  }

  return SEED_ACHIEVEMENTS;
}

/**
 * Fetch testimonials
 */
export async function getTestimonials(): Promise<TestimonialSeedItem[]> {
  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.testimonials)
        .orderBy(desc(schema.testimonials.createdAt));

      if (rows && rows.length > 0) {
        return rows.map((r, idx) => ({
          id: r.id,
          name: r.name,
          role: "Boutique Entrepreneur",
          location: "Tamil Nadu",
          course: "Fashion Designing & Tailoring",
          rating: 5,
          imageUrl:
            SEED_TESTIMONIALS[idx % SEED_TESTIMONIALS.length]?.imageUrl ||
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
          text: r.text,
          videoUrl: r.videoUrl || undefined,
        }));
      }
    } catch (err) {
      console.warn("Neon DB query for testimonials failed:", err);
    }
  }

  return SEED_TESTIMONIALS;
}
