"use server";

import { revalidatePath } from "next/cache";
import { DollVoteSubmission } from "@/data/dollContest";
import { db } from "@/db";
import * as schema from "@/db/schema";

// In-memory persistent array for demo / server lifecycle
let STORED_VOTES: DollVoteSubmission[] = [
  {
    id: "vote-1",
    dollNumber: 7,
    voterName: "Dhivya Bharathi",
    voterEmail: "dhivya.b@gmail.com",
    voterPhone: "9843211223",
    instagramId: "@dhivya_couture",
    screenshotUrl: "/images/courses/diploma-fashion.jpg",
    comment: "Stunning Aari work and perfect saree pleating on Doll #7!",
    submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "vote-2",
    dollNumber: 24,
    voterName: "Nithya Ramachandran",
    voterEmail: "nithya.ram@gmail.com",
    voterPhone: "9786543210",
    instagramId: "@nithya_crafts",
    screenshotUrl: "/images/courses/advanced-aari.jpg",
    comment: "The jewellery detailing and temple border are gorgeous.",
    submittedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
];

// Doll photo overrides mapped by doll number
const DOLL_IMAGE_OVERRIDES: Record<number, string> = {};

export async function submitDollVoteAction(data: {
  dollNumber: number;
  voterName: string;
  voterEmail: string;
  voterPhone: string;
  instagramId: string;
  screenshotUrl?: string;
  comment?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const newVote: DollVoteSubmission = {
      id: `vote-${Date.now()}`,
      dollNumber: Number(data.dollNumber),
      voterName: data.voterName.trim(),
      voterEmail: data.voterEmail.trim(),
      voterPhone: data.voterPhone.trim(),
      instagramId: data.instagramId.trim(),
      screenshotUrl: data.screenshotUrl || "",
      comment: data.comment?.trim() || "",
      submittedAt: new Date().toISOString(),
    };

    STORED_VOTES.unshift(newVote);

    if (db) {
      try {
        await db.insert(schema.contestVotes).values({
          voterIdentifier: `${newVote.instagramId} (${newVote.voterName}, ${newVote.voterPhone}) - Doll #${newVote.dollNumber}`,
        });
      } catch (dbErr) {
        console.warn("Neon DB vote insert failed, using memory:", dbErr);
      }
    }

    // Sync to Google Sheet if Webhook is configured
    const gSheetUrl =
      process.env.GOOGLE_SHEET_VOTING_WEBHOOK_URL ||
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbzewneTiPuUloKnq2UJpqPizIqO9umSt5ZFiMfjOGGArMNo-t9ypvXpwtfohwiIyM9k/exec";

    if (gSheetUrl && gSheetUrl.startsWith("http")) {
      try {
        const sheetRes = await fetch(gSheetUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            sheet: "Votes",
            type: "vote",
            timestamp: newVote.submittedAt,
            dollNumber: newVote.dollNumber,
            voterName: newVote.voterName,
            voterEmail: newVote.voterEmail,
            voterPhone: newVote.voterPhone,
            instagramId: newVote.instagramId,
            comment: newVote.comment,
            screenshotUrl: newVote.screenshotUrl,
          }),
          redirect: "follow",
        });
        const sheetText = await sheetRes.text();
        console.log("Google Sheets Voting Sync Response:", sheetText);
      } catch (sheetErr) {
        console.warn("Google Sheet voting sync failed gracefully:", sheetErr);
      }
    }

    revalidatePath("/contest");
    revalidatePath("/admin/contest");

    return {
      success: true,
      message: `Your vote for Doll #${data.dollNumber} has been verified and registered!`,
    };
  } catch (err) {
    console.error("Error submitting doll vote:", err);
    return {
      success: false,
      message: "Failed to submit vote. Please try again.",
    };
  }
}

export async function getDollVotesAction(): Promise<DollVoteSubmission[]> {
  return STORED_VOTES;
}

export async function updateDollImageAction(
  dollNumber: number,
  imageUrl: string
): Promise<{ success: boolean }> {
  DOLL_IMAGE_OVERRIDES[dollNumber] = imageUrl;
  revalidatePath("/contest");
  revalidatePath("/admin/contest");
  return { success: true };
}

export async function getDollImageOverridesAction(): Promise<Record<number, string>> {
  return DOLL_IMAGE_OVERRIDES;
}
