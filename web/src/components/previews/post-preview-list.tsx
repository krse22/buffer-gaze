"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Tag } from "@/components/tag";
import type { Post, PostsConnection } from "@/contracts/post";
import { PostCompactList } from "./post-compact-list";
import { PostTableView } from "./post-table-view";

type PostPreviewListProps = {
  channelId: string;
  selectedPostId?: string | null;
  onSelectPost?: (post: Post) => void;
  compact?: boolean;
};

async function fetchPosts(channelId: string, cursor?: string): Promise<PostsConnection> {
  const params = new URLSearchParams({ channelId });
  if (cursor) params.set("after", cursor);

  const response = await fetch(`/api/posts?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to fetch posts");
  }

  return data;
}

export function PostPreviewList({
  channelId,
  selectedPostId,
  onSelectPost,
  compact,
}: PostPreviewListProps) {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["posts", channelId, cursor ?? "initial"],
    queryFn: () => fetchPosts(channelId, cursor),
  });

  useEffect(() => {
    if (data) {
      const newPosts = data.edges.map((e) => e.node);
      if (cursor) {
        setAllPosts((prev) => [...prev, ...newPosts]);
      } else {
        setAllPosts(newPosts);
      }
    }
  }, [data, cursor]);

  function handleLoadMore() {
    if (data?.pageInfo.endCursor) {
      setCursor(data.pageInfo.endCursor);
    }
  }

  const hasMore = data?.pageInfo.hasNextPage ?? false;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-3 p-6 pb-3">
        <h2 className="font-heading text-2xl">Posts</h2>
        <Tag variant="neutral" className="ml-auto">
          {allPosts.length}
          {hasMore ? "+" : ""}
        </Tag>
      </div>

      {compact && (
        <PostCompactList
          posts={allPosts}
          selectedPostId={selectedPostId}
          onSelectPost={onSelectPost}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          isLoadingMore={isFetching && !!cursor}
        />
      )}

      {!compact && (
        <div className="min-h-0 flex-1 overflow-auto px-6 pb-6">
          <div className="min-w-[500px]">
            <div
              className="grid gap-4 border-divider border-b px-3 pb-2 font-bold text-[11px] text-neutral-600 uppercase tracking-wider"
              style={{ gridTemplateColumns: "minmax(0, 2.5fr) 100px 100px" }}
            >
              <div>Post</div>
              <div>Status</div>
              <div className="text-right">Scheduled</div>
            </div>

            <PostTableView
              posts={allPosts}
              selectedPostId={selectedPostId}
              onSelectPost={onSelectPost}
              isLoading={isLoading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              isLoadingMore={isFetching && !!cursor}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
}
