'use client';

import { LoginButton } from '@/components/login-button';

export default function Login() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background">
      <main className="text-center">
        <h1 className="font-heading text-4xl text-foreground mb-4">
          Welcome to Buffer Gaze
        </h1>
        <p className="text-foreground/70 mb-8">
          Connect your social accounts and manage your content.
        </p>
        <LoginButton />
      </main>
    </div>
  );
}
