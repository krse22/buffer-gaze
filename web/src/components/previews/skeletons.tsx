export function PostTableSkeleton() {
  return (
    <div className="animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="grid gap-4 p-3 border-b border-divider"
          style={{ gridTemplateColumns: 'minmax(0, 2.5fr) 100px 100px' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-200 rounded-lg flex-none" />
            <div className="flex-1">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-1" />
              <div className="h-3 bg-neutral-200 rounded w-1/2" />
            </div>
          </div>
          <div className="h-5 bg-neutral-200 rounded-full w-16" />
          <div className="h-4 bg-neutral-200 rounded w-14 ml-auto" />
        </div>
      ))}
    </div>
  );
}

export function PostCompactSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-1">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-3 rounded-xl">
          <div className="h-4 bg-neutral-200 rounded w-full mb-2" />
          <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
          <div className="flex items-center gap-2">
            <div className="h-5 bg-neutral-200 rounded-full w-16" />
            <div className="h-3 bg-neutral-200 rounded w-12 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
