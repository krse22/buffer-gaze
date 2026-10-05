"use client";

import Link from "next/link";
import { Avatar } from "@/components/avatar";
import type { BufferChannel } from "@/contracts/channel";
import { getPlatformInfo, PlatformIcon } from "@/utils/platform-icons";

type ChannelListProps = {
  channels: BufferChannel[];
  selectedId: string | null;
};

export function ChannelList({ channels, selectedId }: ChannelListProps) {
  return (
    <div className="flex flex-col gap-1">
      {channels.map((channel) => {
        const isSelected = channel.id === selectedId;
        const { name: platformName } = getPlatformInfo(channel.service);
        const displayName = channel.displayName || channel.name;

        return (
          <Link
            key={channel.id}
            href={`/channel/${channel.id}`}
            className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-left no-underline transition-colors ${
              isSelected
                ? "bg-surface text-foreground"
                : "text-foreground/70 hover:bg-surface/50 hover:text-foreground"
            }
              ${channel.isDisconnected ? "opacity-50" : ""}
            `}
          >
            <Avatar src={channel.avatar} alt={displayName} size="md" />
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold text-sm">{displayName}</div>
              <div className="flex items-center gap-1.5 text-foreground/50 text-xs">
                <PlatformIcon service={channel.service} className="h-3.5 w-3.5" />
                <span>{platformName}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
