"use client";

import { useEffect, useRef } from "react";
import type { Post } from "@/contracts/post";
import { PostGridTile } from "./post-grid-tile";

type PostGridProps = {
  posts: Post[];
  channelName?: string;
  channelService?: string;
  selectedPostId?: string | null;
  onSelectPost?: (post: Post) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
};

export function PostGrid({
  posts,
  channelName,
  channelService,
  selectedPostId,
  onSelectPost,
  onLoadMore,
  hasMore,
  isLoading,
}: PostGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!(el && onLoadMore && hasMore) || isLoading) return;

    const handleScroll = () => {
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 400) {
        onLoadMore();
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [onLoadMore, hasMore, isLoading]);

  return (
    <div ref={scrollRef} className="h-full overflow-auto">
      <div className="mx-auto max-w-[960px] p-6 pb-8">
        <h2 className="mb-4 text-[22px] font-bold">{channelName || "Posts"}</h2>
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <PostGridTile
              key={post.id}
              post={post}
              channelName={channelName}
              channelService={channelService}
              isSelected={post.id === selectedPostId}
              onClick={() => onSelectPost?.(post)}
            />
          ))}
        </div>
        {(isLoading || hasMore) && (
          <div className="flex items-center justify-center gap-2 pt-6 text-sm text-neutral-600">
            {isLoading && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-neutral-300 border-t-accent" />
            )}
            <span>{isLoading ? "Loading more posts…" : hasMore ? "" : "You're all caught up"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
