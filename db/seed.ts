import "./dns.js";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { SEED_COURSES } from "../data/seedCourses";
import { SEED_GALLERY, SEED_ACHIEVEMENTS } from "../data/seedPhase2";
import { INITIAL_CONTEST_ENTRIES, INITIAL_ADMIN_ENQUIRIES } from "../data/seedAdmin";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function main() {
  const connectionString =
    process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

  if (!connectionString || connectionString.includes("username:password")) {
    console.error(
      "❌ DATABASE_URL or DATABASE_URL_UNPOOLED is not set or contains placeholder values."
    );
    console.log(
      "Please set your real Neon PostgreSQL connection string in .env.local to run the seed script."
    );
    process.exit(1);
  }

  console.log("🌱 Connecting to Neon PostgreSQL and seeding database...");
  const sql = neon(connectionString);
  const db = drizzle(sql, { schema });

  // 1. Seed Courses
  console.log("📚 Seeding Courses...");
  for (const course of SEED_COURSES) {
    console.log(`   - Inserting course: ${course.title}`);
    await db
      .insert(schema.courses)
      .values({
        slug: course.slug,
        title: course.title,
        description: course.description,
        category: course.category,
        mode: course.mode,
        price: course.price,
        durationDays: course.durationDays,
        stepsCount: course.stepsCount,
        thumbnailUrl: course.thumbnailUrl,
        syllabus: course.syllabus,
        nuances: course.nuances,
        isFeatured: course.isFeatured,
        isPublished: course.isPublished,
      })
      .onConflictDoUpdate({
        target: schema.courses.slug,
        set: {
          title: course.title,
          description: course.description,
          category: course.category,
          mode: course.mode,
          price: course.price,
          durationDays: course.durationDays,
          stepsCount: course.stepsCount,
          thumbnailUrl: course.thumbnailUrl,
          syllabus: course.syllabus,
          nuances: course.nuances,
          isFeatured: course.isFeatured,
          isPublished: course.isPublished,
        },
      });
  }

  // 2. Seed Achievements
  console.log("🏆 Seeding Achievements & World Records...");
  for (const ach of SEED_ACHIEVEMENTS) {
    console.log(`   - Inserting achievement: ${ach.title}`);
    await db.insert(schema.achievements).values({
      title: ach.title,
      year: ach.year,
      description: ach.description,
      imageUrl: ach.imageUrl,
    });
  }

  // 3. Seed Gallery
  console.log("🖼️ Seeding Gallery...");
  for (const item of SEED_GALLERY) {
    await db.insert(schema.gallery).values({
      imageUrl: item.imageUrl,
      category: item.category,
      caption: item.caption,
    });
  }

  // 4. Seed 20-Day Contest Entries
  console.log("⭐ Seeding 20-Day Student Contest Entries...");
  for (const c of INITIAL_CONTEST_ENTRIES) {
    console.log(`   - Inserting contest entry: ${c.title} (${c.studentName})`);
    await db.insert(schema.contestEntries).values({
      studentName: c.studentName,
      title: c.title,
      description: c.description,
      imageUrl: c.imageUrl,
      category: c.category,
      votesCount: c.votesCount,
      isApproved: c.isApproved,
    });
  }

  // 5. Seed Initial Enquiries
  console.log("📬 Seeding Initial Enquiries...");
  for (const enq of INITIAL_ADMIN_ENQUIRIES) {
    await db.insert(schema.enquiries).values({
      name: enq.name,
      email: enq.email,
      phone: enq.phone,
      message: enq.message,
      status: enq.status,
    });
  }

  console.log("🎉 All tables seeded into Neon PostgreSQL successfully!");
}

main().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
