"use client";

import { LoginButton } from "@/components/login-button";

export default function Login() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background">
      <main className="text-center">
        <h1 className="mb-4 font-heading text-4xl text-foreground">Welcome to Buffer Gaze</h1>
        <p className="mb-8 text-foreground/70">
          Connect your social accounts and manage your content.
        </p>
        <LoginButton />
      </main>
    </div>
  );
}
