'use client';

import type { Post } from '@/contracts/post';
import { Tag } from '@/components/tag';
import Button from '@/components/button';
import { PostCompactItem } from './post-compact-item';
import { PostCompactSkeleton } from './skeletons';

type PostCompactListProps = {
  posts: Post[];
  selectedPostId?: string | null;
  onSelectPost?: (post: Post) => void;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
};

export function PostCompactList({
  posts,
  selectedPostId,
  onSelectPost,
  isLoading,
  hasMore,
  onLoadMore,
  isLoadingMore,
}: PostCompactListProps) {
  return (
      <div className="flex-1 min-h-0 overflow-auto px-3 pb-4 flex flex-col gap-1">
        {isLoading && posts.length === 0 ? (
          <PostCompactSkeleton />
        ) : posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <PostCompactItem
                key={post.id}
                post={post}
                isSelected={post.id === selectedPostId}
                onClick={() => onSelectPost?.(post)}
              />
            ))}
            {hasMore && onLoadMore && (
              <Button variant="secondary" size="block" onClick={onLoadMore} disabled={isLoadingMore}>
                {isLoadingMore ? 'Loading...' : 'Load more'}
              </Button>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-foreground/50 text-sm">No posts found</div>
        )}
      </div>
  );
}
