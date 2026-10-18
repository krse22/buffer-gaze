"use client";

import { X } from "lucide-react";
import type { Post } from "@/contracts/post";
import { ImageCollage } from "./image-collage";

type PostSlideOverProps = {
  post: Post;
  channelName?: string;
  onClose: () => void;
};

export function PostSlideOver({ post, channelName, onClose }: PostSlideOverProps) {
  const schedule = post.dueAt
    ? `Scheduled ${new Date(post.dueAt).toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })} · via Buffer`
    : "Not scheduled";

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close panel"
        className="fixed inset-0 cursor-default border-none bg-neutral-900/35"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />

      {/* Panel */}
      <section className="fixed top-0 right-0 bottom-0 flex w-full max-w-[420px] flex-col bg-background shadow-lg">
        {/* Header */}
        <header className="flex items-center gap-2 p-4 pb-3">
          <span className="text-xs font-bold uppercase tracking-wide text-neutral-600">
            {channelName || "Post"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto grid h-8 w-8 place-items-center rounded-md bg-transparent text-foreground transition-colors hover:bg-neutral-200"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 overflow-auto px-4 pb-4">
          <h3 className="m-0 text-lg font-bold leading-tight">
            {post.text?.slice(0, 60) || "Untitled"}
          </h3>

          {/* Image collage */}
          {post.assets.length > 0 && (
            <ImageCollage images={post.assets} className="aspect-square rounded-lg" />
          )}

          {/* Body */}
          <div className="flex flex-col gap-2">
            <span className="text-sm leading-relaxed">{post.text || "No content"}</span>
            <span className="text-xs text-neutral-600">{schedule}</span>
          </div>

          {/* Review section placeholder */}
          <div className="flex flex-col gap-3 rounded-lg bg-surface p-3">
            <span className="text-xs text-neutral-800">
              Share this post for review before publishing.
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
              >
                New review link
              </button>
              <button
                type="button"
                className="rounded-md bg-transparent px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-neutral-200"
              >
                Copy link
              </button>
            </div>
          </div>

          {/* Comments placeholder */}
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-bold uppercase tracking-wide text-neutral-600">
              Reviewer comments
            </div>
            <div className="text-sm text-neutral-600">No comments yet.</div>
          </div>
        </div>
      </section>
    </>
  );
}
