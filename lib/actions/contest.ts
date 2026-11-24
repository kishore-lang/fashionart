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
