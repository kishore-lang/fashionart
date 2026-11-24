"use server";

import { headers } from "next/headers";
import { enquirySchema, EnquiryInput } from "@/lib/validations/enquiry";
import { db } from "@/db";
import { enquiries, rateLimits } from "@/db/schema";
import { eq, and, gt, sql } from "drizzle-orm";
import { Resend } from "resend";

export type EnquiryActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitEnquiry(
  rawInput: EnquiryInput
): Promise<EnquiryActionResponse> {
  // 1. Zod Validation & Honeypot
  const parsed = enquirySchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please check your inputs and try again.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot check
  if (rawInput.website_hp && rawInput.website_hp.length > 0) {
    return {
      success: false,
      message: "Spam detected.",
    };
  }

  const { name, email, phone, courseId, courseName, message } = parsed.data;

  // 2. IP extraction & Rate Limiting (max 5 per hour)
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    if (db) {
      // Check existing limit in rate_limits
      const existing = await db
        .select()
        .from(rateLimits)
        .where(
          and(
            eq(rateLimits.key, clientIp),
            gt(rateLimits.windowStart, oneHourAgo)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        if (existing[0].count >= 5) {
          return {
            success: false,
            message:
              "You have reached the enquiry limit (5 per hour). Please contact us directly via WhatsApp or Phone.",
          };
        }

        // Increment count
        await db
          .update(rateLimits)
          .set({ count: sql`${rateLimits.count} + 1` })
          .where(eq(rateLimits.id, existing[0].id));
      } else {
        // Insert new rate limit window
        await db.insert(rateLimits).values({
          key: clientIp,
          count: 1,
          windowStart: new Date(),
        });
      }
    }
  } catch (rateLimitErr) {
    console.warn("Rate limit check failed gracefully:", rateLimitErr);
  }

  // 3. Insert into Neon enquiries table
  if (db) {
    try {
      await db.insert(enquiries).values({
        name,
        email,
        phone,
        courseId: courseId ? (courseId as unknown as any) : null,
        message,
        status: "new",
      });
    } catch (dbErr) {
      console.error("Failed to insert enquiry into database:", dbErr);
    }
  }

  // 4. Append to Google Sheet (if webhook configured)
  const sheetWebhook =
    process.env.GOOGLE_SHEET_CONTACT_WEBHOOK_URL ||
    process.env.GOOGLE_SHEET_WEBHOOK_URL ||
    "https://script.google.com/macros/s/AKfycbzewneTiPuUloKnq2UJpqPizIqO9umSt5ZFiMfjOGGArMNo-t9ypvXpwtfohwiIyM9k/exec";

  if (sheetWebhook && sheetWebhook.startsWith("http")) {
    try {
      const sheetRes = await fetch(sheetWebhook, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          sheet: "Contact",
          type: "contact",
          timestamp: new Date().toISOString(),
          name,
          email,
          phone,
          course: courseName || "General Enquiry",
          message,
        }),
        redirect: "follow",
      });
      const sheetText = await sheetRes.text();
      console.log("Google Sheets Contact Sync Response:", sheetText);
    } catch (sheetErr) {
      console.warn("Google Sheet sync failed:", sheetErr);
    }
  }

  // 5. Send Admin Notification Email via Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.RESEND_ADMIN_EMAIL || "fashionartcbe@gmail.com";

  if (resendApiKey && resendApiKey.startsWith("re_")) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Fashion Art Institute <enquiries@resend.dev>",
        to: adminEmail,
        replyTo: email,
        subject: `[New Enquiry] ${name} - ${courseName || "General Course"}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E8B520; border-radius: 8px;">
            <h2 style="color: #4A2511; border-bottom: 2px solid #E8B520; padding-bottom: 8px;">New Student Enquiry Received</h2>
            <p><strong>Student Name:</strong> ${name}</p>
            <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone / WhatsApp:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Interested Course:</strong> ${courseName || "General Consultation"}</p>
            <div style="background-color: #FBF6EE; padding: 15px; border-radius: 6px; margin-top: 15px;">
              <strong>Message / Query:</strong>
              <p style="white-space: pre-line; color: #4A2511;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #7A6458; margin-top: 20px;">
              Submitted via Fashion Art Institute Website • Gandhipuram, Coimbatore
            </p>
          </div>
        `,
      });
    } catch (resendErr) {
      console.warn("Resend email dispatch error:", resendErr);
    }
  }

  return {
    success: true,
    message:
      "Thank you! Your enquiry has been received. Our team will contact you shortly via WhatsApp or phone call.",
  };
}
