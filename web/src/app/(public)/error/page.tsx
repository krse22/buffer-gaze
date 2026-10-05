"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Button from "@/components/button";

function ErrorContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const description = searchParams.get("description");

  return (
    <main className="max-w-md px-4 text-center">
      <h1 className="mb-4 font-heading text-3xl text-foreground">Something went wrong</h1>
      {reason && (
        <p className="mb-2 text-foreground/70">
          <span className="font-semibold">Error:</span> {reason}
        </p>
      )}
      {description && <p className="mb-6 text-foreground/50 text-sm">{description}</p>}
      <Link href="/login">
        <Button>Back to Login</Button>
      </Link>
    </main>
  );
}

export default function ErrorPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background">
      <Suspense fallback={<div className="text-foreground/50">Loading...</div>}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}
