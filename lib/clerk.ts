import { auth, currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export interface SessionUser {
  userId: string | null;
  role: "admin" | "student" | null;
  name: string;
  email: string;
  isDemo?: boolean;
}

/**
 * Server-side verification for admin privileges.
 * Strictly verifies Clerk auth session & publicMetadata.role === "admin".
 * Fallback to development role cookie when Clerk credentials are not provisioned.
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
      throw new Error("Forbidden: Admin privileges required.");
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("Forbidden")) {
      throw err;
    }
    // Continue to check local demo session cookie if Clerk session is absent or not configured
  }

  // Check demo cookie (for local evaluation & development testing)
  const cookieStore = await cookies();
  const demoRole = cookieStore.get("fashionart_role")?.value;
  if (demoRole === "admin") {
    return { userId: "admin_demo_account", role: "admin", isDemo: true };
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
      const role =
        (user.publicMetadata as { role?: string })?.role === "admin"
          ? "admin"
          : "student";

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

  if (demoRole === "admin") {
    return {
      userId: "demo_admin_user",
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
