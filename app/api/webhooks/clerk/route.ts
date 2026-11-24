import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

interface ClerkWebhookEvent {
  data: {
    id: string;
    first_name?: string;
    last_name?: string;
    email_addresses?: Array<{ email_address: string; id: string }>;
    phone_numbers?: Array<{ phone_number: string; id: string }>;
    public_metadata?: { role?: string };
    [key: string]: unknown;
  };
  object: "event";
  type: "user.created" | "user.updated" | "user.deleted" | string;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    // Verify signature if CLERK_WEBHOOK_SECRET is set
    if (webhookSecret) {
      const svixId = req.headers.get("svix-id");
      const svixTimestamp = req.headers.get("svix-timestamp");
      const svixSignature = req.headers.get("svix-signature");

      if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
      }

      // Secret starts with whsec_
      const secret = webhookSecret.startsWith("whsec_")
        ? Buffer.from(webhookSecret.slice(6), "base64")
        : Buffer.from(webhookSecret);

      const toSign = `${svixId}.${svixTimestamp}.${rawBody}`;
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(toSign)
        .digest("base64");

      const passedSignatures = svixSignature.split(" ").map((s) => s.replace("v1,", ""));
      const isValid = passedSignatures.some((sig) => sig === expectedSignature);

      if (!isValid) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const event: ClerkWebhookEvent = JSON.parse(rawBody);
    const { type, data } = event;

    if (!db) {
      return NextResponse.json({ received: true, db: "offline" });
    }

    if (type === "user.created" || type === "user.updated") {
      const fullName = `${data.first_name || ""} ${data.last_name || ""}`.trim() || "Student";
      const phone = data.phone_numbers?.[0]?.phone_number || "";
      const role = data.public_metadata?.role === "admin" ? "admin" : "student";

      const existing = await db
        .select()
        .from(schema.profiles)
        .where(eq(schema.profiles.clerkUserId, data.id))
        .limit(1);

      if (existing && existing.length > 0) {
        await db
          .update(schema.profiles)
          .set({
            name: fullName,
            phone,
            role,
          })
          .where(eq(schema.profiles.clerkUserId, data.id));
      } else {
        await db.insert(schema.profiles).values({
          clerkUserId: data.id,
          name: fullName,
          phone,
          role,
        });
      }
    } else if (type === "user.deleted") {
      await db
        .delete(schema.profiles)
        .where(eq(schema.profiles.clerkUserId, data.id));
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Clerk webhook error:", err);
    return NextResponse.json(
      { error: "Internal server error processing webhook" },
      { status: 500 }
    );
  }
}
