'use client';

import type { Post } from '@/contracts/post';
import { Tag } from '@/components/tag';
import Button from '@/components/button';
import { PostTableRow } from './post-table-row';
import { PostTableSkeleton } from './skeletons';

type PostTableViewProps = {
  posts: Post[];
  selectedPostId?: string | null;
  onSelectPost?: (post: Post) => void;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore: () => void;
  isLoadingMore?: boolean;
  error?: Error | null;
};

export function PostTableView({
  posts,
  onSelectPost,
  isLoading,
  hasMore,
  onLoadMore,
  isLoadingMore,
  error,
}: PostTableViewProps) {
  if (error) {
    return (
      <div>{error.message}</div>
    );
  }

  if (isLoading) {
    return (<PostTableSkeleton />);
  }

  return (
    <>
      {posts.map((post) => 
        <PostTableRow
          key={post.id}
          post={post}
          onClick={() => onSelectPost?.(post)}
        />
      )}

      {hasMore && (
        <div className="pt-4">
          <Button variant="secondary" onClick={onLoadMore} disabled={isLoadingMore}>
            {isLoadingMore ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
    </>
  );
}
