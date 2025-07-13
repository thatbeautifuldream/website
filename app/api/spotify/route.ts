import { NextResponse } from "next/server";
import { env } from "@/lib/env";

type TSpotifyTrack = {
  name: string;
  artists: {
    name: string;
    external_urls: {
      spotify: string;
    };
  }[];
  album: {
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
  duration_ms: number;
  type: "track";
};

type TSpotifyEpisode = {
  name: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  type: "episode";
  uri: string;
  restrictions?: {
    reason: string;
  };
  show: {
    available_markets: string[];
    copyrights: {
      text: string;
      type: string;
    }[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
  };
};

type TSpotifyResponse = {
  item: TSpotifyTrack | TSpotifyEpisode;
  is_playing: boolean;
  currently_playing_type: "track" | "episode" | "ad" | "unknown";
  progress_ms: number;
} | null;

async function getAccessToken(): Promise<string> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function getCurrentTrack(accessToken: string): Promise<TSpotifyResponse> {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 204) {
    return null; // No track currently playing
  }

  if (!response.ok) {
    throw new Error(`Failed to get current track: ${response.status}`);
  }

  return response.json();
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const currentTrack = await getCurrentTrack(accessToken);

    if (!currentTrack?.item) {
      return NextResponse.json({
        isPlaying: false,
        track: null,
      });
    }

    // Handle track response
    if (currentTrack.currently_playing_type === "track") {
      const trackItem = currentTrack.item as TSpotifyTrack;
      const track = {
        name: trackItem.name,
        artists: trackItem.artists.map((artist) => ({
          name: artist.name,
          url: artist.external_urls.spotify,
        })),
        album: {
          name: trackItem.album.name,
          image: trackItem.album.images?.[0]?.url,
        },
        url: trackItem.external_urls.spotify,
        previewUrl: trackItem.preview_url,
        isPlaying: currentTrack.is_playing,
        progress: currentTrack.progress_ms,
        type: "track" as const,
      };

      return NextResponse.json({
        isPlaying: currentTrack.is_playing,
        track,
      });
    }

    // Handle episode response
    if (currentTrack.currently_playing_type === "episode") {
      const episodeItem = currentTrack.item as TSpotifyEpisode;
      const episode = {
        name: episodeItem.name,
        description: episodeItem.description,
        show: {
          name: episodeItem.show.name,
          publisher: episodeItem.show.publisher,
          image: episodeItem.show.images?.[0]?.url,
        },
        image: episodeItem.images?.[0]?.url,
        url: episodeItem.external_urls.spotify,
        duration: episodeItem.duration_ms,
        isPlaying: currentTrack.is_playing,
        progress: currentTrack.progress_ms,
        type: "episode" as const,
        releaseDate: episodeItem.release_date,
        resumePoint: episodeItem.resume_point,
      };

      return NextResponse.json({
        isPlaying: currentTrack.is_playing,
        episode,
      });
    }

    // Handle other types (ad, unknown)
    return NextResponse.json({
      isPlaying: currentTrack.is_playing,
      currentlyPlayingType: currentTrack.currently_playing_type,
      track: null,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch current track" },
      { status: 500 }
    );
  }
}
