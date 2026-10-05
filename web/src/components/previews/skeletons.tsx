export function PostTableSkeleton() {
  return (
    <div className="animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="grid gap-4 border-divider border-b p-3"
          style={{ gridTemplateColumns: "minmax(0, 2.5fr) 100px 100px" }}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex-none rounded-lg bg-neutral-200" />
            <div className="flex-1">
              <div className="mb-1 h-4 w-3/4 rounded bg-neutral-200" />
              <div className="h-3 w-1/2 rounded bg-neutral-200" />
            </div>
          </div>
          <div className="h-5 w-16 rounded-full bg-neutral-200" />
          <div className="ml-auto h-4 w-14 rounded bg-neutral-200" />
        </div>
      ))}
    </div>
  );
}

export function PostCompactSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-1">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-xl p-3">
          <div className="mb-2 h-4 w-full rounded bg-neutral-200" />
          <div className="mb-2 h-4 w-3/4 rounded bg-neutral-200" />
          <div className="flex items-center gap-2">
            <div className="h-5 w-16 rounded-full bg-neutral-200" />
            <div className="ml-auto h-3 w-12 rounded bg-neutral-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
