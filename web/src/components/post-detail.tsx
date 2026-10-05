'use client';

import type { Post } from '@/contracts/post';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Button from '@/components/button';
import { Card } from '@/components/card';

type PostDetailProps = {
  post: Post;
  position?: { current: number; total: number };
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
};

export function PostDetail({ post, position, onPrev, onNext, onClose }: PostDetailProps) {
  const hashtags = post.text?.match(/#\w+/g)?.join(' ') || '';
  const bodyText = post.text?.replace(/#\w+/g, '').trim() || 'No text';

  return (
    <div className="flex-1 min-w-0 flex flex-col min-h-0">
      <header className="flex-none flex items-center gap-3 p-6 pb-3">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span className="text-xs font-bold tracking-wide uppercase text-neutral-600">
            {post.status}
          </span>
          <span className="text-base font-bold">
            {post.text?.slice(0, 50) || 'Untitled'}
          </span>
        </div>
        {position && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-600 whitespace-nowrap">
              {position.current} of {position.total}
            </span>
            <Button variant="secondary" size="icon" onClick={onPrev} disabled={!onPrev}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={onNext} disabled={!onNext}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-divider hover:bg-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </header>

      <div className="flex-1 min-h-0 overflow-auto px-6 pb-6 flex flex-col gap-4">
        <Card className="flex flex-col gap-4 p-4">
          <div className="flex flex-row flex-wrap items-start gap-4">
            {post.assets.length > 0 ? (
              <img
                src={post.assets[0].thumbnail || post.assets[0].source}
                alt=""
                className="w-32 h-32 flex-none rounded-xl object-cover"
              />
            ) : (
              <div className="w-32 h-32 flex-none rounded-xl bg-neutral-200 grid place-items-center text-xs text-neutral-600">
                No image
              </div>
            )}
            <div className="flex flex-col gap-2 flex-1 min-w-60">
              <span className="text-sm leading-relaxed">{bodyText}</span>
              {hashtags && (
                <span className="text-sm text-accent-700">{hashtags}</span>
              )}
              {post.dueAt && (
                <span className="text-xs text-neutral-600">
                  Scheduled {new Date(post.dueAt).toLocaleDateString(undefined, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              )}
            </div>
          </div>
        </Card>

        {post.assets.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {post.assets.slice(1).map((asset) => (
              <img
                key={asset.id}
                src={asset.thumbnail || asset.source}
                alt=""
                className="w-20 h-20 rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className="flex-1 min-w-0 flex flex-col min-h-0 animate-pulse">
      <header className="flex-none flex items-center gap-3 p-6 pb-3">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 bg-neutral-200 rounded" />
          <div className="h-5 w-48 bg-neutral-200 rounded" />
        </div>
      </header>
      <div className="flex-1 px-6 pb-6">
        <div className="bg-surface rounded-[32px] p-4 flex gap-4">
          <div className="w-32 h-32 bg-neutral-200 rounded-xl" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-4 w-full bg-neutral-200 rounded" />
            <div className="h-4 w-3/4 bg-neutral-200 rounded" />
            <div className="h-4 w-1/2 bg-neutral-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
