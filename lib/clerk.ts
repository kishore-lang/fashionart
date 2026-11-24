import { auth, currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

export interface SessionUser {
  userId: string | null;
  role: "admin" | "student" | null;
  name: string;
  email: string;
  isDemo?: boolean;
}

/**
 * Server-side verification for admin privileges.
 * Strictly verifies Clerk auth session & publicMetadata.role === "admin" or database profile.
 * Fallback to admin session / role cookie when predefined password is used.
 */
export async function verifyAdmin(): Promise<{ userId: string; role: "admin"; isDemo?: boolean }> {
  try {
    const { userId, sessionClaims } = await auth();

    if (userId) {
      const role =
        (sessionClaims?.metadata as { role?: string })?.role ||
        (sessionClaims as unknown as { publicMetadata?: { role?: string } })
          ?.publicMetadata?.role;

      if (role === "admin") {
        return { userId, role: "admin" };
      }

      // Check Neon PostgreSQL profiles table
      if (db) {
        try {
          const profileRows = await db
            .select()
            .from(schema.profiles)
            .where(eq(schema.profiles.clerkUserId, userId))
            .limit(1);

          if (profileRows && profileRows[0]?.role === "admin") {
            return { userId, role: "admin" };
          }
        } catch {
          // neon query error fallback
        }
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("Forbidden")) {
      throw err;
    }
  }

  // Check demo cookie and admin password session cookie
  const cookieStore = await cookies();
  const demoRole = cookieStore.get("fashionart_role")?.value;
  const adminSession = cookieStore.get("fashionart_admin_session")?.value;
  if (demoRole === "admin" || adminSession === "authenticated") {
    return { userId: "admin_director_account", role: "admin", isDemo: true };
  }

  throw new Error("Unauthorized: You must be logged in as an administrator.");
}

/**
 * Get current logged in user details and role (admin, student, or guest)
 */
export async function getCurrentUserRole(): Promise<"admin" | "student" | null> {
  try {
    const { userId, sessionClaims } = await auth();
    if (userId) {
      const role =
        (sessionClaims?.metadata as { role?: string })?.role ||
        (sessionClaims as unknown as { publicMetadata?: { role?: string } })
          ?.publicMetadata?.role;
      return (role as "admin" | "student") || "student";
    }
  } catch {
    // Clerk not configured or error
  }

  const cookieStore = await cookies();
  const demoRole = cookieStore.get("fashionart_role")?.value;
  if (demoRole === "admin" || demoRole === "student") {
    return demoRole;
  }

  return null;
}

/**
 * Get full session user profile for dashboard & admin components
 */
export async function getCurrentSessionUser(): Promise<SessionUser> {
  try {
    const user = await currentUser();
    if (user) {
      let role: "admin" | "student" =
        (user.publicMetadata as { role?: string })?.role === "admin"
          ? "admin"
          : "student";

      // Sync or retrieve role from Neon PostgreSQL profiles table
      if (db) {
        try {
          const profileRows = await db
            .select()
            .from(schema.profiles)
            .where(eq(schema.profiles.clerkUserId, user.id))
            .limit(1);

          if (profileRows && profileRows.length > 0) {
            if (profileRows[0].role === "admin") role = "admin";
          } else {
            // First time login - auto provision profile in Neon DB
            await db
              .insert(schema.profiles)
              .values({
                clerkUserId: user.id,
                name:
                  user.fullName ||
                  `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                  "Student",
                phone: user.phoneNumbers[0]?.phoneNumber || "",
                role,
              })
              .onConflictDoNothing();
          }
        } catch (dbErr) {
          console.warn("Neon DB profile sync failed:", dbErr);
        }
      }

      return {
        userId: user.id,
        role,
        name:
          user.fullName ||
          `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
          (role === "admin" ? "Director Suguna" : "Student Couturier"),
        email:
          user.emailAddresses[0]?.emailAddress ||
          (role === "admin" ? "suguna@fashionartonline.com" : "student@fashionartonline.com"),
        isDemo: false,
      };
    }
  } catch {
    // Fall back to demo session
  }

  const cookieStore = await cookies();
  const demoRole = cookieStore.get("fashionart_role")?.value as "admin" | "student" | undefined;
  const adminSession = cookieStore.get("fashionart_admin_session")?.value;

  if (demoRole === "admin" || adminSession === "authenticated") {
    return {
      userId: "admin_director_account",
      role: "admin",
      name: "Suguna Shanmugam (Director)",
      email: "director@fashionartonline.com",
      isDemo: true,
    };
  }

  if (demoRole === "student") {
    return {
      userId: "demo_student_user",
      role: "student",
      name: "Priya Sundaram",
      email: "priya.sundaram@gmail.com",
      isDemo: true,
    };
  }

  return {
    userId: null,
    role: null,
    name: "Guest Visitor",
    email: "",
    isDemo: true,
  };
}
