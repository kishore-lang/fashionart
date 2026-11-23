require("./../db/dns.js");
const fs = require("fs");
const path = require("path");
const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function runMigration() {
  const connString =
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_joQSJN85IwpB@ep-broad-firefly-ao8ps7os-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

  console.log("Connecting to Neon via HTTP...");
  const sql = neon(connString);

  const migrationPath = path.join(
    __dirname,
    "../drizzle/0000_striped_lady_vermin.sql"
  );
  const sqlContent = fs.readFileSync(migrationPath, "utf8");

  // Split by statement breakpoint
  const statements = sqlContent
    .split("--> statement-breakpoint")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`Found ${statements.length} migration statements. Executing...`);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      await sql(stmt);
      console.log(`[${i + 1}/${statements.length}] Executed successfully.`);
    } catch (err) {
      if (err.message && err.message.includes("already exists")) {
        console.log(`[${i + 1}/${statements.length}] Already exists, skipped.`);
      } else {
        console.error(`Error in statement ${i + 1}:`, err.message);
        throw err;
      }
    }
  }

  console.log("Migration completed successfully!");
}

runMigration().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
