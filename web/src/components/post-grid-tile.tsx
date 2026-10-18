"use client";

import type { Post } from "@/contracts/post";
import { PlatformIcon } from "@/utils/platform-icons";

type PostGridTileProps = {
  post: Post;
  channelName?: string;
  channelService?: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export function PostGridTile({
  post,
  channelName,
  channelService,
  isSelected,
  onClick,
}: PostGridTileProps) {
  const images = post.assets;
  const count = images.length;
  const shown = Math.min(count, 4);
  const hasMore = count > 4;
  const hasImages = count > 0;

  const gridClass =
    shown === 1
      ? "grid-cols-1 grid-rows-1"
      : shown === 2
        ? "grid-cols-2 grid-rows-1"
        : "grid-cols-2 grid-rows-2";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative aspect-square w-full cursor-pointer overflow-hidden rounded-sm border-0 bg-neutral-900 p-0 text-left ${
        isSelected ? "ring-2 ring-accent ring-offset-2" : ""
      }`}
    >
      {hasImages ? (
        <div className={`grid h-full w-full gap-0.5 ${gridClass}`}>
          {images.slice(0, shown).map((img, i) => {
            const isLastWithMore = i === 3 && hasMore;
            return (
              <div
                key={img.id || i}
                className={`relative bg-neutral-300 ${shown === 3 && i === 0 ? "row-span-2" : ""}`}
                style={{
                  backgroundImage: `url(${img.thumbnail || img.source})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {isLastWithMore && (
                  <div className="absolute inset-0 grid place-items-center bg-neutral-900/60">
                    <span className="text-xl font-bold text-background">+{count - 3}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid h-full w-full place-items-center p-4">
          <span className="line-clamp-6 text-center text-sm font-semibold leading-relaxed text-neutral-100">
            {post.text?.slice(0, 150) || "No content"}
          </span>
        </div>
      )}

      {/* Channel badge */}
      {channelName && (
        <span className="absolute top-2 left-2 flex max-w-[calc(100%-16px)] items-center gap-1.5 rounded-full bg-background px-2 py-0.5">
          {channelService && (
            <PlatformIcon service={channelService} className="h-3 w-3 flex-none opacity-80" />
          )}
          <span className="truncate text-[11px] font-bold text-foreground">{channelName}</span>
        </span>
      )}

      {/* Image count badge */}
      {count > 1 && (
        <span className="absolute top-2 right-2 rounded-full bg-neutral-900 px-2 py-0.5 text-[11px] font-bold text-background">
          {count} images
        </span>
      )}

      {/* Caption overlay for images */}
      {hasImages && post.text && (
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-neutral-900/80 to-transparent p-3 pt-6">
          <span className="line-clamp-2 text-xs font-medium leading-snug text-neutral-100">
            {post.text.slice(0, 100)}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-neutral-900/25 opacity-0 transition-opacity hover:opacity-100" />
    </button>
  );
}
