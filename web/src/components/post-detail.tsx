"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Button from "@/components/button";
import { Card } from "@/components/card";
import type { Post } from "@/contracts/post";

type PostDetailProps = {
  post: Post;
  position?: { current: number; total: number };
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
};

export function PostDetail({ post, position, onPrev, onNext, onClose }: PostDetailProps) {
  const hashtags = post.text?.match(/#\w+/g)?.join(" ") || "";
  const bodyText = post.text?.replace(/#\w+/g, "").trim() || "No text";

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="flex flex-none items-center gap-3 p-6 pb-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="font-bold text-neutral-600 text-xs uppercase tracking-wide">
            {post.status}
          </span>
          <span className="font-bold text-base">{post.text?.slice(0, 50) || "Untitled"}</span>
        </div>
        {position && (
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-neutral-600 text-xs">
              {position.current} of {position.total}
            </span>
            <Button variant="secondary" size="icon" onClick={onPrev} disabled={!onPrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={onNext} disabled={!onNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-divider transition-colors hover:bg-neutral-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto px-6 pb-6">
        <Card className="flex flex-col gap-4 p-4">
          <div className="flex flex-row flex-wrap items-start gap-4">
            {post.assets.length > 0 ? (
              <img
                src={post.assets[0].thumbnail || post.assets[0].source}
                alt=""
                className="h-32 w-32 flex-none rounded-xl object-cover"
              />
            ) : (
              <div className="grid h-32 w-32 flex-none place-items-center rounded-xl bg-neutral-200 text-neutral-600 text-xs">
                No image
              </div>
            )}
            <div className="flex min-w-60 flex-1 flex-col gap-2">
              <span className="text-sm leading-relaxed">{bodyText}</span>
              {hashtags && <span className="text-accent-700 text-sm">{hashtags}</span>}
              {post.dueAt && (
                <span className="text-neutral-600 text-xs">
                  Scheduled{" "}
                  {new Date(post.dueAt).toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
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
                className="h-20 w-20 rounded-lg object-cover"
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
    <div className="flex min-h-0 min-w-0 flex-1 animate-pulse flex-col">
      <header className="flex flex-none items-center gap-3 p-6 pb-3">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 rounded bg-neutral-200" />
          <div className="h-5 w-48 rounded bg-neutral-200" />
        </div>
      </header>
      <div className="flex-1 px-6 pb-6">
        <div className="flex gap-4 rounded-[32px] bg-surface p-4">
          <div className="h-32 w-32 rounded-xl bg-neutral-200" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-full rounded bg-neutral-200" />
            <div className="h-4 w-3/4 rounded bg-neutral-200" />
            <div className="h-4 w-1/2 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
