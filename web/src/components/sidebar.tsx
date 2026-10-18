"use client";

import { LogOut } from "lucide-react";
import { ChannelList } from "@/components/channel-list";
import type { BufferChannel } from "@/contracts/channel";

type SidebarProps = {
  channels: BufferChannel[];
  selectedChannelId: string | null;
  isLoading?: boolean;
};

function ChannelSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-2 rounded-md p-2">
      <div className="h-4 w-4 rounded bg-neutral-300" />
      <div className="h-4 w-24 rounded bg-neutral-300" />
    </div>
  );
}

export function Sidebar({ channels, selectedChannelId, isLoading }: SidebarProps) {
  return (
    <aside className="flex h-full w-[232px] min-w-[188px] flex-col p-3">
      {/* Logo */}
      <div className="mb-4 flex items-center gap-2 p-2">
        <span className="text-[17px] font-bold">Buffer Gaze</span>
      </div>

      {/* Channels */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto">
        <div className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
          Channels
        </div>
        {isLoading ? (
          <div className="space-y-0.5">
            <ChannelSkeleton />
            <ChannelSkeleton />
            <ChannelSkeleton />
            <ChannelSkeleton />
          </div>
        ) : (
          <ChannelList channels={channels} selectedId={selectedChannelId} />
        )}
      </nav>

      {/* Logout button */}
      <button
        type="button"
        className="mb-2 flex w-full items-center justify-start gap-2 rounded-md bg-transparent px-2 py-2 text-sm text-neutral-800 transition-colors hover:bg-neutral-200"
        onClick={() => (window.location.href = "/api/auth/logout")}
      >
        <LogOut className="h-4 w-4 flex-none" />
        Log out
      </button>

      {/* User */}
      <div className="flex items-center gap-2 border-t border-divider px-2 pt-3 pb-2">
        <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-accent2-200 text-[11px] font-bold text-accent2-800">
          U
        </span>
        <span className="text-sm font-semibold">User</span>
      </div>
    </aside>
  );
}
