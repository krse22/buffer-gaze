'use client';

import type { Post } from '@/contracts/post';
import { Tag } from '@/components/tag';
import { getStatusVariant } from './utils';

type PostCompactItemProps = {
  post: Post;
  isSelected?: boolean;
  onClick?: () => void;
};

export function PostCompactItem({ post, isSelected, onClick }: PostCompactItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col gap-1 text-left p-3 border-0 rounded-xl cursor-pointer
        font-body text-foreground transition-colors
        ${isSelected
          ? 'bg-neutral-200 shadow-[inset_3px_0_0_var(--color-accent)]'
          : 'bg-transparent hover:bg-neutral-200'
        }
      `}
    >
      <span className="text-sm font-semibold line-clamp-2 text-neutral-800">
        {post.text?.slice(0, 60) || 'No text'}
      </span>
      <span className="flex items-center gap-2 text-xs text-neutral-600">
        <Tag variant={getStatusVariant(post.status)}>{post.status}</Tag>
        {post.dueAt && (
          <span className="ml-auto">
            {new Date(post.dueAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        )}
      </span>
    </button>
  );
}
