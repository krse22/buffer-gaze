"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { use, useMemo } from "react";
import { PostGrid } from "@/components/post-grid";
import { PostSlideOver } from "@/components/post-slide-over";
import type { BufferChannel } from "@/contracts/channel";
import type { Post, PostsConnection } from "@/contracts/post";

type ChannelLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ channelId: string }>;
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

async function fetchPost(postId: string): Promise<Post> {
  const response = await fetch(`/api/posts/${postId}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to fetch post");
  }
  return data;
}

async function fetchChannels(): Promise<BufferChannel[]> {
  const response = await fetch("/api/channels");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to fetch channels");
  }
  return data;
}

export default function ChannelLayout({ params }: ChannelLayoutProps) {
  const { channelId } = use(params);
  const router = useRouter();
  const pathname = usePathname();

  const postIdMatch = pathname.match(/\/channel\/[^/]+\/posts\/([^/]+)/);
  const selectedPostId = postIdMatch ? postIdMatch[1] : null;

  // Fetch channels to get channel info
  const { data: channels = [] } = useQuery({
    queryKey: ["channels"],
    queryFn: fetchChannels,
  });

  const currentChannel = channels.find((c) => c.id === channelId);
  const channelName = currentChannel?.displayName || currentChannel?.name || "Posts";
  const channelService = currentChannel?.service;

  // Fetch posts with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPosts,
  } = useInfiniteQuery({
    queryKey: ["posts", channelId],
    queryFn: ({ pageParam }) => fetchPosts(channelId, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    initialPageParam: undefined as string | undefined,
  });

  // Flatten all pages into a single array of posts
  const allPosts = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.edges.map((e) => e.node));
  }, [data]);

  // Fetch selected post details
  const { data: selectedPost } = useQuery({
    queryKey: ["post", selectedPostId],
    queryFn: () => {
      if (!selectedPostId) throw new Error("No post ID");
      return fetchPost(selectedPostId);
    },
    enabled: !!selectedPostId,
  });

  function handleSelectPost(post: Post) {
    router.push(`/channel/${channelId}/posts/${post.id}`, { scroll: false });
  }

  function handleClose() {
    router.push(`/channel/${channelId}`, { scroll: false });
  }

  function handleLoadMore() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  return (
    <>
      <PostGrid
        posts={allPosts}
        channelName={channelName}
        channelService={channelService}
        selectedPostId={selectedPostId}
        onSelectPost={handleSelectPost}
        onLoadMore={handleLoadMore}
        hasMore={hasNextPage}
        isLoading={isLoadingPosts || isFetchingNextPage}
      />

      {selectedPostId && selectedPost && (
        <PostSlideOver
          post={selectedPost}
          channelName={currentChannel?.displayName || currentChannel?.name}
          onClose={handleClose}
        />
      )}
    </>
  );
}
