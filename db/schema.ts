import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// Courses Table
export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Fashion Designing, Tailoring, Embroidery, Jewellery
  mode: varchar("mode", { length: 50 }).notNull().default("both"), // online, offline, both
  price: integer("price").notNull().default(0),
  durationDays: integer("duration_days").notNull().default(30),
  stepsCount: integer("steps_count").notNull().default(10),
  thumbnailUrl: text("thumbnail_url").notNull(),
  syllabus: jsonb("syllabus").notNull().default([]), // array of { title: string, items: string[] }
  nuances: jsonb("nuances").notNull().default([]), // array of strings
  isFeatured: boolean("is_featured").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Enquiries Table
export const enquiries = pgTable("enquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  courseId: uuid("course_id").references(() => courses.id),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("new"), // new, contacted, enrolled, closed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Achievements Table
export const achievements = pgTable("achievements", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  year: varchar("year", { length: 10 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Events Table
export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  date: varchar("date", { length: 100 }).notNull(),
  description: text("description").notNull(),
  coverUrl: text("cover_url").notNull(),
  isUpcoming: boolean("is_upcoming").notNull().default(false),
});

// Gallery Table
export const gallery = pgTable("gallery", {
  id: uuid("id").defaultRandom().primaryKey(),
  imageUrl: text("image_url").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  caption: varchar("caption", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Testimonials Table
export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  text: text("text").notNull(),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Profiles Table
export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 50 }).notNull().default("student"), // admin, student
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Rate Limits Table (for contact form IP tracking)
export const rateLimits = pgTable("rate_limits", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: varchar("key", { length: 255 }).notNull(), // IP or composite
  count: integer("count").notNull().default(1),
  windowStart: timestamp("window_start").defaultNow().notNull(),
});

// Student Course Enrollments Table
export const enrollments = pgTable("enrollments", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentEmail: varchar("student_email", { length: 255 }).notNull(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  courseId: uuid("course_id").references(() => courses.id),
  amount: integer("amount").notNull().default(0),
  status: varchar("status", { length: 50 }).notNull().default("active"), // active, completed, cancelled
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 20-Day Voting Contest Entries Table
export const contestEntries = pgTable("contest_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: varchar("category", { length: 100 }).notNull().default("Bridal Wear"),
  votesCount: integer("votes_count").notNull().default(0),
  isApproved: boolean("is_approved").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 20-Day Voting Contest Votes Table
export const contestVotes = pgTable("contest_votes", {
  id: uuid("id").defaultRandom().primaryKey(),
  entryId: uuid("entry_id").references(() => contestEntries.id),
  voterIdentifier: varchar("voter_identifier", { length: 255 }).notNull(), // IP address or verified email
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
export type Achievement = typeof achievements.$inferSelect;
export type EventItem = typeof events.$inferSelect;
export type GalleryItem = typeof gallery.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type RateLimit = typeof rateLimits.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;
export type NewEnrollment = typeof enrollments.$inferInsert;
export type ContestEntry = typeof contestEntries.$inferSelect;
export type NewContestEntry = typeof contestEntries.$inferInsert;
export type ContestVote = typeof contestVotes.$inferSelect;
export type NewContestVote = typeof contestVotes.$inferInsert;
