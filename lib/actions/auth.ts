"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setDemoRoleAction(role: "admin" | "student" | "logout") {
  const cookieStore = await cookies();

  if (role === "logout") {
    cookieStore.delete("fashionart_role");
    redirect("/");
  }

  cookieStore.set("fashionart_role", role, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  if (role === "admin") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function clearDemoRoleAction() {
  const cookieStore = await cookies();
  cookieStore.delete("fashionart_role");
  redirect("/");
}
