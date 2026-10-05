"use client";

import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { use } from "react";
import { PostDetail } from "@/components/post-detail";
import { PostPreviewList } from "@/components/previews/post-preview-list";
import type { Post } from "@/contracts/post";

type ChannelLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ channelId: string }>;
};

async function fetchPost(postId: string): Promise<Post> {
  const response = await fetch(`/api/posts/${postId}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to fetch post");
  }
  return data;
}

export default function ChannelLayout({ params }: ChannelLayoutProps) {
  const { channelId } = use(params);
  const router = useRouter();
  const pathname = usePathname();

  const postIdMatch = pathname.match(/\/channel\/[^/]+\/posts\/([^/]+)/);
  const selectedPostId = postIdMatch ? postIdMatch[1] : null;

  const { data: selectedPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["post", selectedPostId],
    queryFn: () => fetchPost(selectedPostId!),
    enabled: !!selectedPostId,
  });

  function handleSelectPost(post: Post) {
    router.push(`/channel/${channelId}/posts/${post.id}`, { scroll: false });
  }

  function handleClose() {
    router.push(`/channel/${channelId}`, { scroll: false });
  }

  // No post selected - show full-width list
  if (!selectedPostId) {
    return (
      <div className="flex h-full min-h-0">
        <PostPreviewList
          channelId={channelId}
          selectedPostId={null}
          onSelectPost={handleSelectPost}
        />
      </div>
    );
  }

  // Post selected - show list + detail
  return (
    <div className="flex h-full min-h-0">
      <PostPreviewList
        channelId={channelId}
        selectedPostId={selectedPostId}
        onSelectPost={handleSelectPost}
        compact
      />

      {selectedPost ? (
        <PostDetail post={selectedPost} onClose={handleClose} />
      ) : (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="flex flex-none items-center gap-3 p-6 pb-3">
            <div className="flex-1" />
            <button
              onClick={handleClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-divider transition-colors hover:bg-neutral-200"
            >
              <X className="h-4 w-4" />
            </button>
          </header>
          <div className="flex flex-1 items-center justify-center text-neutral-500 text-sm">
            {isLoadingPost ? "Loading..." : "Post not found"}
          </div>
        </div>
      )}
    </div>
  );
}
