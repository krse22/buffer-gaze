'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/button';

function ErrorContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');
  const description = searchParams.get('description');

  return (
    <main className="text-center max-w-md px-4">
      <h1 className="font-heading text-3xl text-foreground mb-4">
        Something went wrong
      </h1>
      {reason && (
        <p className="text-foreground/70 mb-2">
          <span className="font-semibold">Error:</span> {reason}
        </p>
      )}
      {description && (
        <p className="text-foreground/50 text-sm mb-6">{description}</p>
      )}
      <Link href="/login">
        <Button>Back to Login</Button>
      </Link>
    </main>
  );
}

export default function ErrorPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background">
      <Suspense fallback={<div className="text-foreground/50">Loading...</div>}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}
