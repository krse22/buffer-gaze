"use client";

import { ChannelList } from "@/components/channel-list";
import { LogoutButton } from "@/components/logout-button";
import type { BufferChannel } from "@/contracts/channel";

type SidebarProps = {
  channels: BufferChannel[];
  selectedChannelId: string | null;
  isLoading?: boolean;
};

function ChannelSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-3 p-2">
      <div className="h-10 w-10 rounded-full bg-neutral-300" />
      <div className="flex-1">
        <div className="mb-1 h-4 w-24 rounded bg-neutral-300" />
        <div className="h-3 w-16 rounded bg-neutral-300" />
      </div>
    </div>
  );
}

export function Sidebar({ channels, selectedChannelId, isLoading }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col bg-surface">
      <div className="border-divider border-b p-4">
        <h1 className="font-heading text-foreground text-xl">Buffer Gaze</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="mb-2 px-3 font-semibold text-[10px] text-foreground/50 uppercase tracking-widest">
          Channels
        </div>
        {isLoading ? (
          <div className="space-y-1">
            <ChannelSkeleton />
            <ChannelSkeleton />
            <ChannelSkeleton />
          </div>
        ) : (
          <ChannelList channels={channels} selectedId={selectedChannelId} />
        )}
      </div>

      <div className="border-divider border-t p-4">
        <LogoutButton fullWidth />
      </div>
    </aside>
  );
}
