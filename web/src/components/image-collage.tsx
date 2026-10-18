"use client";

type ImageCollageProps = {
  images: { thumbnail?: string; source: string }[];
  className?: string;
};

export function ImageCollage({ images, className = "" }: ImageCollageProps) {
  const count = images.length;
  const shown = Math.min(count, 4);
  const hasMore = count > 4;

  if (count === 0) {
    return (
      <div
        className={`grid place-items-center bg-neutral-900 text-neutral-100 text-sm font-medium ${className}`}
      >
        No media
      </div>
    );
  }

  const gridClass =
    shown === 1
      ? "grid-cols-1 grid-rows-1"
      : shown === 2
        ? "grid-cols-2 grid-rows-1"
        : "grid-cols-2 grid-rows-2";

  return (
    <div
      className={`relative grid gap-0.5 bg-background overflow-hidden ${gridClass} ${className}`}
    >
      {images.slice(0, shown).map((img, i) => {
        const isLastWithMore = i === 3 && hasMore;
        return (
          <div
            key={img.source}
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
      {count > 1 && (
        <span className="absolute top-2 right-2 rounded-full bg-neutral-900 px-2.5 py-0.5 text-[11px] font-bold text-background">
          {count} {count === 1 ? "image" : "images"}
        </span>
      )}
    </div>
  );
}
