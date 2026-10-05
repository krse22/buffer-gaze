'use client';

import { use } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/contracts/post';
import { PostPreviewList } from '@/components/previews/post-preview-list';
import { PostDetail } from '@/components/post-detail';
import { X } from 'lucide-react';

type ChannelLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ channelId: string }>;
};

async function fetchPost(postId: string): Promise<Post> {
  const response = await fetch(`/api/posts/${postId}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to fetch post');
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
    queryKey: ['post', selectedPostId],
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
      <div className="flex min-h-0 h-full">
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
    <div className="flex min-h-0 h-full">
      <PostPreviewList
        channelId={channelId}
        selectedPostId={selectedPostId}
        onSelectPost={handleSelectPost}
        compact
      />

      {selectedPost ? (
        <PostDetail
          post={selectedPost}
          onClose={handleClose}
        />
      ) : (
        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          <header className="flex-none flex items-center gap-3 p-6 pb-3">
            <div className="flex-1" />
            <button
              onClick={handleClose}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-divider hover:bg-neutral-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </header>
          <div className="flex-1 flex items-center justify-center text-neutral-500 text-sm">
            {isLoadingPost ? 'Loading...' : 'Post not found'}
          </div>
        </div>
      )}
    </div>
  );
}
