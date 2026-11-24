// Regression tests for @clerk/nextjs@6.12.0 upgrade.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ClerkProvider, SignIn, SignUp } from "@clerk/nextjs";
import { auth, clerkMiddleware, currentUser } from "@clerk/nextjs/server";

describe("Clerk SDK integration", () => {
  it("exports the UI components used by the app", () => {
    assert.equal(typeof ClerkProvider, "function");
    assert.equal(typeof SignIn, "function");
    assert.equal(typeof SignUp, "function");
  });

  it("exports the server APIs used by the app", () => {
    assert.equal(typeof auth, "function");
    assert.equal(typeof clerkMiddleware, "function");
    assert.equal(typeof currentUser, "function");
  });
});
