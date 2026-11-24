"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithAdminPasswordAction(password: string) {
  const validPasswords = ["fashionart2026", "admin2026", "suguna2026"];
  if (validPasswords.includes(password.trim())) {
    const cookieStore = await cookies();
    cookieStore.set("fashionart_admin_session", "authenticated", {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    cookieStore.set("fashionart_role", "admin", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
    return { success: true };
  }
  return { success: false, error: "Incorrect admin password. Please try again." };
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete("fashionart_admin_session");
  cookieStore.delete("fashionart_role");
  return { success: true };
}

export async function setDemoRoleAction(role: "admin" | "student" | "logout") {
  const cookieStore = await cookies();

  if (role === "logout") {
    cookieStore.delete("fashionart_role");
    cookieStore.delete("fashionart_admin_session");
    redirect("/");
  }

  cookieStore.set("fashionart_role", role, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  if (role === "admin") {
    cookieStore.set("fashionart_admin_session", "authenticated", {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function clearDemoRoleAction() {
  const cookieStore = await cookies();
  cookieStore.delete("fashionart_role");
  cookieStore.delete("fashionart_admin_session");
  redirect("/");
}
