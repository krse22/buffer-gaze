"use client";

import Link from "next/link";
import type { BufferChannel } from "@/contracts/channel";
import { PlatformIcon } from "@/utils/platform-icons";

type ChannelListProps = {
  channels: BufferChannel[];
  selectedId: string | null;
};

export function ChannelList({ channels, selectedId }: ChannelListProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {channels.map((channel) => {
        const isSelected = channel.id === selectedId;
        const displayName = channel.displayName || channel.name;

        return (
          <Link
            key={channel.id}
            href={`/channel/${channel.id}`}
            className={`flex items-center gap-2 rounded-md px-2 py-[7px] text-sm no-underline transition-colors ${
              isSelected
                ? "bg-neutral-900 font-bold text-background"
                : "font-medium text-neutral-800 hover:bg-neutral-200"
            } ${channel.isDisconnected ? "opacity-50" : ""}`}
          >
            <PlatformIcon
              service={channel.service}
              className={`h-4 w-4 flex-none ${isSelected ? "opacity-100" : "opacity-80"}`}
            />
            <span className="min-w-0 truncate">{displayName}</span>
          </Link>
        );
      })}
    </div>
  );
}
