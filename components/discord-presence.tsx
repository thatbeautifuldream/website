"use client";

import { useLanyardWS } from "use-lanyard";
import { ExternalLink, Music, Gamepad2 } from "lucide-react";
import { ImageZoom } from "./image-zoom";

const DISCORD_ID = "451669359866413076";

export function DiscordPresence() {
  const data = useLanyardWS(DISCORD_ID);
  if (!data) return null;

  const { discord_user, activities, listening_to_spotify, spotify } = data;
  const hasSpotify = listening_to_spotify && spotify;
  const hasActivity = activities && activities.length > 0;

  // Discord badges (basic, can be extended)
  const badges = [];
  if (discord_user?.avatar_decoration) badges.push({ icon: discord_user.avatar_decoration, label: "Decoration" });
  if (discord_user?.bot) badges.push({ icon: "/bot-badge.svg", label: "Bot" });
  // Add more badges as needed

  return (
    <div className="rounded-xl bg-[#181A20] border border-[#23262F] shadow-lg p-4 w-full max-w-md mx-auto">
      {/* User header */}
      <div className="flex items-center gap-3 pb-2">
        <div className="relative">
          <img
            src={`https://cdn.discordapp.com/avatars/${discord_user?.id}/${discord_user?.avatar}.png?size=128`}
            alt={discord_user?.username || "Discord Avatar"}
            width={48}
            height={48}
            className="rounded-full border border-[#23262F]"
          />
          {/* Status dot could go here */}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-base truncate">
              {discord_user?.username}
              {discord_user?.discriminator && (
                <span className="text-[#A3A6B3] font-normal">#{discord_user.discriminator}</span>
              )}
            </span>
            {badges.map((badge, i) => (
              <span key={i} title={badge.label} className="inline-block">
                <Image src={badge.icon} alt={badge.label} width={18} height={18} />
              </span>
            ))}
          </div>
          <a
            href={`https://github.com/${discord_user?.username?.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#A3A6B3] hover:underline flex items-center gap-1"
          >
            github.com/{discord_user?.username?.toLowerCase()}
          </a>
        </div>
      </div>
      <div className="border-t border-[#23262F] my-2" />

      {/* Spotify or activity */}
      {hasSpotify && (
        <div className="flex gap-3 items-center mt-2">
          <div className="flex-shrink-0">
            <ImageZoom>
              <img
                src={spotify.album_art_url}
                alt={spotify.song}
                className="rounded-md shadow"
                width={56}
                height={56}
                loading="lazy"
              />
            </ImageZoom>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-green-500 text-xs font-semibold tracking-wide mb-1">LISTENING TO SPOTIFY...</span>
            <span className="text-white font-medium truncate text-base">{spotify.song}</span>
            <span className="text-[#A3A6B3] text-xs truncate">By {spotify.artist}</span>
            <a
              href={`https://open.spotify.com/track/${spotify.track_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-400 hover:underline mt-1 flex items-center gap-1"
            >
              Listen on Spotify <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      )}
      {!hasSpotify && hasActivity && (
        <div className="flex gap-3 items-center mt-2">
          <div className="flex-shrink-0">
            <div className="rounded-md bg-[#23262F] flex items-center justify-center w-14 h-14">
              <Gamepad2 className="text-[#A3A6B3]" size={28} />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[#A3A6B3] text-xs font-semibold tracking-wide mb-1">ACTIVITY</span>
            <span className="text-white font-medium truncate text-base">{activities[0].name}</span>
            {activities[0].state && (
              <span className="text-[#A3A6B3] text-xs truncate">{activities[0].state}</span>
            )}
            {activities[0].details && (
              <span className="text-[#A3A6B3] text-xs truncate">{activities[0].details}</span>
            )}
          </div>
        </div>
      )}
      {!hasSpotify && !hasActivity && (
        <div className="text-[#A3A6B3] text-xs text-center py-4">No activity</div>
      )}
    </div>
  );
}
