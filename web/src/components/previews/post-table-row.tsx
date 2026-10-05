"use client";

import { Tag } from "@/components/tag";
import type { Post } from "@/contracts/post";
import { getStatusVariant } from "./utils";

type PostTableRowProps = {
  post: Post;
  onClick?: () => void;
};

export function PostTableRow({ post, onClick }: PostTableRowProps) {
  const wordCount = post.text ? post.text.trim().split(/\s+/).length : 0;
  const assetCount = post.assets.length;

  return (
    <div
      onClick={onClick}
      className={`grid cursor-pointer items-center gap-4 rounded-xl border-divider border-b p-3 transition-colors hover:bg-neutral-200`}
      style={{ gridTemplateColumns: "minmax(0, 2.5fr) 100px 100px" }}
    >
      <div className="flex min-w-0 items-center gap-3">
        {post.assets.length > 0 ? (
          <img
            src={post.assets[0].thumbnail || post.assets[0].source}
            alt=""
            className="h-10 w-10 flex-none rounded-lg object-cover"
          />
        ) : (
          <div className="h-10 w-10 flex-none rounded-lg bg-neutral-200" />
        )}
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate font-semibold text-sm">
            {post.text?.slice(0, 50) || "No text"}
          </span>
          <span className="truncate text-neutral-700 text-xs">
            {wordCount > 0 ? `${wordCount} words` : ""}
            {assetCount > 0 ? ` · ${assetCount} asset${assetCount > 1 ? "s" : ""}` : ""}
          </span>
        </div>
      </div>
      <div>
        <Tag variant={getStatusVariant(post.status)}>{post.status}</Tag>
      </div>
      <div className="text-right text-neutral-700 text-sm">
        {post.dueAt
          ? new Date(post.dueAt).toLocaleDateString(undefined, {
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—"}
      </div>
    </div>
  );
}
