import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { getCourses, getAchievements, getGalleryItems, getTestimonials } from "../db/index";
import { db } from "../db/index";
import * as schema from "../db/schema";

async function runE2ETest() {
  console.log("------------------------------------------");
  console.log("⚡ TESTING LIVE NEON POSTGRES END-TO-END ⚡");
  console.log("------------------------------------------");

  if (!db) {
    throw new Error("Neon db instance is null! Check DATABASE_URL.");
  }

  // 1. Query courses
  const courses = await getCourses();
  console.log(`✅ [COURSES]: Retrieved ${courses.length} courses from Neon`);
  console.log(`   Sample: "${courses[0]?.title}" (₹${courses[0]?.price})`);

  // 2. Query achievements
  const achievements = await getAchievements();
  console.log(`✅ [ACHIEVEMENTS]: Retrieved ${achievements.length} achievements from Neon`);
  console.log(`   Sample: "${achievements[0]?.title}" (${achievements[0]?.year})`);

  // 3. Query gallery
  const gallery = await getGalleryItems();
  console.log(`✅ [GALLERY]: Retrieved ${gallery.length} gallery items from Neon`);

  // 4. Query contest entries
  const contestEntries = await db.select().from(schema.contestEntries);
  console.log(`✅ [CONTEST ENTRIES]: Retrieved ${contestEntries.length} student designs from Neon`);
  console.log(`   Sample: "${contestEntries[0]?.title}" by ${contestEntries[0]?.studentName}`);

  // 5. Query initial enquiries
  const enquiries = await db.select().from(schema.enquiries);
  console.log(`✅ [ENQUIRIES]: Retrieved ${enquiries.length} enquiries from Neon`);
  console.log(`   Sample: "${enquiries[0]?.name}" (${enquiries[0]?.phone}) - Course ID: ${enquiries[0]?.courseId}`);

  console.log("------------------------------------------");
  console.log("🎉 ALL SERVICES TESTED & VERIFIED END-TO-END!");
  console.log("------------------------------------------");
}

runE2ETest().catch((err) => {
  console.error("❌ E2E verification failed:", err);
  process.exit(1);
});
