'use client';

import type { BufferChannel } from '@/contracts/channel';
import { ChannelList } from '@/components/channel-list';
import { LogoutButton } from '@/components/logout-button';

type SidebarProps = {
  channels: BufferChannel[];
  selectedChannelId: string | null;
  isLoading?: boolean;
};

function ChannelSkeleton() {
  return (
    <div className="flex items-center gap-3 p-2 animate-pulse">
      <div className="w-10 h-10 bg-neutral-300 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-neutral-300 rounded w-24 mb-1" />
        <div className="h-3 bg-neutral-300 rounded w-16" />
      </div>
    </div>
  );
}

export function Sidebar({ channels, selectedChannelId, isLoading }: SidebarProps) {
  return (
    <aside className="w-64 bg-surface flex flex-col h-full">
      <div className="p-4 border-b border-divider">
        <h1 className="font-heading text-xl text-foreground">Buffer Gaze</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="text-[10px] font-semibold text-foreground/50 uppercase tracking-widest mb-2 px-3">
          Channels
        </div>
        {isLoading ? (
          <div className="space-y-1">
            <ChannelSkeleton />
            <ChannelSkeleton />
            <ChannelSkeleton />
          </div>
        ) : (
          <ChannelList
            channels={channels}
            selectedId={selectedChannelId}
          />
        )}
      </div>

      <div className="p-4 border-t border-divider">
        <LogoutButton fullWidth />
      </div>
    </aside>
  );
}
