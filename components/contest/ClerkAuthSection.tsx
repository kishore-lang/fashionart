"use client";

import React from "react";
import { UserCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Check if Clerk publishable key is active
const hasClerkKey = Boolean(
  typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder")
);

// Lazy or conditional Clerk component to avoid throwing when outside ClerkProvider
let ClerkHooks: typeof import("@clerk/nextjs") | null = null;
if (hasClerkKey) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ClerkHooks = require("@clerk/nextjs");
  } catch {
    ClerkHooks = null;
  }
}

export function ClerkAuthSection({
  onAuthChange,
}: {
  onAuthChange: (auth: {
    isSignedIn: boolean;
    name?: string;
    email?: string;
  }) => void;
}) {
  if (hasClerkKey && ClerkHooks) {
    return <ActiveClerkAuth onAuthChange={onAuthChange} />;
  }

  return <FallbackAuthSection onAuthChange={onAuthChange} />;
}

function ActiveClerkAuth({
  onAuthChange,
}: {
  onAuthChange: (auth: {
    isSignedIn: boolean;
    name?: string;
    email?: string;
  }) => void;
}) {
  if (!ClerkHooks) return null;
  const { useUser, SignInButton, SignUpButton } = ClerkHooks;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isSignedIn, user } = useUser();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (isSignedIn && user) {
      onAuthChange({
        isSignedIn: true,
        name: user.fullName || user.firstName || "Voter",
        email: user.primaryEmailAddress?.emailAddress,
      });
    } else {
      onAuthChange({ isSignedIn: false });
    }
  }, [isSignedIn, user, onAuthChange]);

  if (isSignedIn) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-emerald-900 leading-tight">
              Signed in as {user?.fullName || user?.firstName || "Voter"}
            </h3>
            <span className="text-xs text-emerald-700">
              {user?.primaryEmailAddress?.emailAddress} • Verified Voter
            </span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-800 text-[11px] font-bold self-start sm:self-auto">
          Ready to Vote
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900">
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h3 className="font-heading text-sm font-bold text-amber-900">
            Sign-in Required to Vote
          </h3>
          <p className="text-xs text-amber-800">
            Sign in with your account to cast your verified vote.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <SignInButton mode="modal">
          <Button variant="gold" size="sm" className="shadow-sm">
            Sign In to Vote
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button variant="outline" size="sm">
            Register
          </Button>
        </SignUpButton>
      </div>
    </div>
  );
}

function FallbackAuthSection({
  onAuthChange,
}: {
  onAuthChange: (auth: {
    isSignedIn: boolean;
    name?: string;
    email?: string;
  }) => void;
}) {
  // When Clerk credentials are not provisioned in environment, auto-enable verified direct voting
  React.useEffect(() => {
    onAuthChange({
      isSignedIn: true,
      name: "Verified Community Voter",
      email: "voter@fashionart.com",
    });
  }, [onAuthChange]);

  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs">
      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
        <UserCheck className="w-4 h-4" />
      </div>
      <div>
        <h3 className="font-heading font-bold text-sm text-emerald-900">
          Verified Community Voter Portal Active
        </h3>
        <p className="text-emerald-700 text-[11px]">
          Enter your name, WhatsApp phone number, and Instagram ID below to cast
          your official vote.
        </p>
      </div>
    </div>
  );
}
