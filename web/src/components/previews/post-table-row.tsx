'use client';

import type { Post } from '@/contracts/post';
import { Tag } from '@/components/tag';
import { getStatusVariant } from './utils';

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
      className={`
        grid gap-4 items-center p-3 border-b border-divider rounded-xl cursor-pointer transition-colors hover:bg-neutral-200
      `}
      style={{ gridTemplateColumns: 'minmax(0, 2.5fr) 100px 100px' }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {post.assets.length > 0 ? (
          <img
            src={post.assets[0].thumbnail || post.assets[0].source}
            alt=""
            className="w-10 h-10 rounded-lg object-cover flex-none"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-neutral-200 flex-none" />
        )}
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-sm font-semibold truncate">
            {post.text?.slice(0, 50) || 'No text'}
          </span>
          <span className="text-xs text-neutral-700 truncate">
            {wordCount > 0 ? `${wordCount} words` : ''}
            {assetCount > 0 ? ` · ${assetCount} asset${assetCount > 1 ? 's' : ''}` : ''}
          </span>
        </div>
      </div>
      <div>
        <Tag variant={getStatusVariant(post.status)}>{post.status}</Tag>
      </div>
      <div className="text-sm text-neutral-700 text-right">
        {post.dueAt
          ? new Date(post.dueAt).toLocaleDateString(undefined, { weekday: 'short', hour: '2-digit', minute: '2-digit' })
          : '—'
        }
      </div>
    </div>
  );
}
