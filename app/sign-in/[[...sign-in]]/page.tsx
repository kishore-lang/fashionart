import React from "react";
import { Metadata } from "next";
import { SignInClient } from "@/components/auth/SignInClient";

export const metadata: Metadata = {
  title: "Student & Admin Login | Fashion Art Institute Coimbatore",
  description: "Sign in to access your student coursework or manage institute operations.",
};

export default function SignInPage() {
  const hasClerkKey = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder")
  );

  return <SignInClient hasClerkKey={hasClerkKey} />;
}
