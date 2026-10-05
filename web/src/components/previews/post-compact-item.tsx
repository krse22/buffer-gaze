"use client";

import { Tag } from "@/components/tag";
import type { Post } from "@/contracts/post";
import { getStatusVariant } from "./utils";

type PostCompactItemProps = {
  post: Post;
  isSelected?: boolean;
  onClick?: () => void;
};

export function PostCompactItem({ post, isSelected, onClick }: PostCompactItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer flex-col gap-1 rounded-xl border-0 p-3 text-left font-body text-foreground transition-colors ${
        isSelected
          ? "bg-neutral-200 shadow-[inset_3px_0_0_var(--color-accent)]"
          : "bg-transparent hover:bg-neutral-200"
      }
      `}
    >
      <span className="line-clamp-2 font-semibold text-neutral-800 text-sm">
        {post.text?.slice(0, 60) || "No text"}
      </span>
      <span className="flex items-center gap-2 text-neutral-600 text-xs">
        <Tag variant={getStatusVariant(post.status)}>{post.status}</Tag>
        {post.dueAt && (
          <span className="ml-auto">
            {new Date(post.dueAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </span>
        )}
      </span>
    </button>
  );
}
