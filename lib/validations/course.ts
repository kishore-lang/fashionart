import { z } from "zod";

export const CourseSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  slug: z.string().min(2).max(255).optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum([
    "Fashion Designing",
    "Tailoring",
    "Embroidery",
    "Jewellery",
  ]),
  mode: z.enum(["online", "offline", "both"]).default("both"),
  price: z.number().int().min(0, "Price cannot be negative"),
  durationDays: z.number().int().min(1, "Duration must be at least 1 day"),
  stepsCount: z.number().int().min(1, "Steps must be at least 1"),
  thumbnailUrl: z.string().url("Must be a valid URL").or(z.string().min(1)),
  syllabus: z
    .array(
      z.object({
        title: z.string().min(1),
        items: z.array(z.string().min(1)),
      })
    )
    .default([]),
  nuances: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export type CourseInput = z.infer<typeof CourseSchema>;

export const GalleryItemSchema = z.object({
  id: z.string().uuid().optional(),
  imageUrl: z.string().url("Must be a valid image URL").or(z.string().min(1)),
  category: z.enum([
    "Bridal Blouses",
    "Couture Gowns",
    "Aari Embroidery",
    "Terracotta",
    "Student Fests",
  ]),
  caption: z.string().max(255).optional(),
});

export type GalleryItemInput = z.infer<typeof GalleryItemSchema>;

export const EnquiryStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "contacted", "enrolled", "closed"]),
});

export const ContestEntrySchema = z.object({
  id: z.string().uuid().optional(),
  studentName: z.string().min(2, "Student name is required").max(255),
  title: z.string().min(3, "Design title is required").max(255),
  description: z.string().min(10, "Provide garment details").max(1000),
  imageUrl: z.string().url().or(z.string().min(1)),
  category: z.string().min(2).max(100).default("Bridal Wear"),
});
