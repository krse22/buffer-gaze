'use client';

import Link from 'next/link';
import type { BufferChannel } from '@/contracts/channel';
import { getPlatformInfo, PlatformIcon } from '@/utils/platform-icons';
import { Avatar } from '@/components/avatar';

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
            className={`
              flex items-center gap-3 px-3 py-2 rounded-2xl text-left transition-colors no-underline
              ${isSelected
                ? 'bg-surface text-foreground'
                : 'text-foreground/70 hover:bg-surface/50 hover:text-foreground'
              }
              ${channel.isDisconnected ? 'opacity-50' : ''}
            `}
          >
            <Avatar
              src={channel.avatar}
              alt={displayName}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{displayName}</div>
              <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                <PlatformIcon service={channel.service} className="w-3.5 h-3.5" />
                <span>{platformName}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
