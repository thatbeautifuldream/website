/** biome-ignore-all lint/performance/noImgElement: need to use img element for discord activity image */
'use client';

import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import type { JSX } from 'react';
import { useLanyardWS } from 'use-lanyard';
import { ImageZoom } from './image-zoom';
import { Link } from './link';
import { Section } from './section';

const DISCORD_ID = '451669359866413076';

// Type for Discord activity (minimal, for image extraction)
type TDiscordActivity = {
  id?: string;
  name?: string;
  application_id?: string;
  assets?: {
    large_image?: string;
    small_image?: string;
  };
  state?: string;
  details?: string;
};

// Type for Spotify (minimal, for image extraction)
type TSpotify = {
  album_art_url?: string | null;
  song?: string | null;
  artist?: string | null;
  track_id?: string | null;
};

function getActivityImage(activity: TDiscordActivity | null): string | null {
  if (!activity?.assets) {
    return null;
  }
  const { large_image, small_image } = activity.assets;
  const image = large_image || small_image;
  if (!image) {
    return null;
  }
  // Handle mp:external/ images (Discord external asset proxy)
  if (image.startsWith('mp:external/')) {
    // Extract the actual external URL after '/https/'
    const httpsIndex = image.indexOf('/https/');
    if (httpsIndex !== -1) {
      return `https://${image.slice(httpsIndex + '/https/'.length)}`;
    }
    return null;
  }
  if (image.startsWith('spotify:')) {
    // handled by Spotify section
    return null;
  }
  if (activity.application_id && image) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`;
  }
  return null;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function ActivityCard({ activity }: { activity: TDiscordActivity }) {
  const image = getActivityImage(activity);
  return (
    <div className="flex items-center gap-3 p-3">
      <ImageZoom>
        {image ? (
          <motion.img
            alt={activity?.name ? `${activity.name} icon` : 'Activity icon'}
            className="size-16 rounded-md object-cover"
            height={56}
            src={image}
            whileHover={{ scale: 1.05 }}
            width={56}
          />
        ) : (
          <div className="flex size-16 items-center justify-center rounded-md bg-muted">
            <span className="text-3xl">🎮</span>
          </div>
        )}
      </ImageZoom>
      <div className="min-w-0 flex-1 space-y-1">
        <span className="block truncate font-medium text-base text-foreground">
          {activity?.name}
        </span>
        {activity?.state && (
          <span className="block truncate text-foreground-light text-xs">
            {activity.state}
          </span>
        )}
        {activity?.details && (
          <span className="block truncate text-foreground-light text-xs">
            {activity.details}
          </span>
        )}
      </div>
    </div>
  );
}

function SpotifyCard({
  spotify,
}: {
  spotify: TSpotify & { timestamps?: { start?: number; end?: number } };
}) {
  // Try to get progress and duration if timestamps are available
  let progress = 0;
  let duration = 0;
  let progressLabel: JSX.Element | null = null;
  if (spotify.timestamps?.start && spotify.timestamps?.end) {
    const now = Date.now();
    progress = Math.max(
      0,
      Math.min(
        now - spotify.timestamps.start,
        spotify.timestamps.end - spotify.timestamps.start
      )
    );
    duration = spotify.timestamps.end - spotify.timestamps.start;
    progressLabel = (
      <div className="mt-1 flex items-center gap-2 text-foreground-light text-xs">
        <span>{formatTime(progress)}</span>
        <div className="relative mx-1 h-1 min-w-[40px] flex-1 overflow-hidden rounded bg-muted">
          <div
            className="absolute top-0 left-0 h-full bg-primary/50"
            style={{ width: `${(progress / duration) * 100}%` }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 p-3">
      <ImageZoom>
        {spotify.album_art_url ? (
          <motion.img
            alt={spotify.song ? `${spotify.song} cover` : 'Spotify album cover'}
            className="size-16 rounded-md object-cover"
            height={56}
            src={spotify.album_art_url}
            whileHover={{ scale: 1.05 }}
            width={56}
          />
        ) : (
          <div className="flex size-16 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <span className="text-3xl">🎵</span>
          </div>
        )}
      </ImageZoom>
      <div className="min-w-0 flex-1 space-y-1">
        {spotify.track_id ? (
          <Link
            className="flex items-center gap-1 truncate font-medium text-base text-foreground hover:underline"
            href={`https://open.spotify.com/track/${spotify.track_id}`}
          >
            {spotify.song}
            <ExternalLink className="size-3" />
          </Link>
        ) : (
          <span className="block truncate font-medium text-base text-foreground">
            {spotify.song}
          </span>
        )}
        <span className="block truncate text-foreground-light text-xs">
          by {spotify.artist}
        </span>
        {progressLabel}
      </div>
    </div>
  );
}

export function DiscordPresence() {
  const data = useLanyardWS(DISCORD_ID);
  if (!data) {
    return null;
  }

  const { activities, listening_to_spotify, spotify } = data;
  const hasSpotify: boolean = Boolean(listening_to_spotify && spotify);
  const hasActivity = activities && activities.length > 0;
  const spotifyObj:
    | (TSpotify & { timestamps?: { start?: number; end?: number } })
    | null =
    hasSpotify && spotify
      ? (spotify as TSpotify & {
        timestamps?: { start?: number; end?: number };
      })
      : null;

  // Filter out the Spotify activity from the activities array
  const filteredActivities = hasActivity
    ? activities.filter(
      (activity: TDiscordActivity) =>
        activity.name?.toLowerCase() !== 'spotify'
    )
    : [];

  if (!hasSpotify && filteredActivities.length === 0) {
    return (
      <Section className="gap-2">
        <div className="flex items-center gap-3 p-3">
          <ImageZoom>
            <div className="flex size-16 items-center justify-center rounded-md bg-muted">
              <span className="text-3xl">🕺🏻</span>
            </div>
          </ImageZoom>
          <div className="min-w-0 flex-1 space-y-1">
            <span className="block truncate font-medium text-base text-foreground">
              No activity
            </span>
            <span className="block truncate text-foreground-light text-xs">
              Nothing on my mind right now
            </span>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section className="gap-2">
      {hasSpotify && spotifyObj && <SpotifyCard spotify={spotifyObj} />}
      {filteredActivities.length > 0 &&
        filteredActivities.map((activity: TDiscordActivity, idx: number) => (
          <ActivityCard activity={activity} key={activity.id || idx} />
        ))}
    </Section>
  );
}
