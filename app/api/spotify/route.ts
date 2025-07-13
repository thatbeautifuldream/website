import { NextResponse } from "next/server";
import { env } from "@/lib/env";

type TSpotifyTrack = {
  item: {
    name: string;
    artists: Array<{
      name: string;
      external_urls: {
        spotify: string;
      };
    }>;
    album: {
      name: string;
      images: Array<{
        url: string;
        height: number;
        width: number;
      }>;
    };
    external_urls: {
      spotify: string;
    };
    preview_url: string | null;
  };
  is_playing: boolean;
  currently_playing_type: string;
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
      refresh_token: "1234567890", // TODO: Replace with actual refresh token from env
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function getCurrentTrack(accessToken: string): Promise<TSpotifyTrack> {
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

    const track = {
      name: currentTrack.item.name,
      artists: currentTrack.item.artists.map((artist) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
      })),
      album: {
        name: currentTrack.item.album.name,
        image: currentTrack.item.album.images?.[0]?.url,
      },
      url: currentTrack.item.external_urls.spotify,
      previewUrl: currentTrack.item.preview_url,
      isPlaying: currentTrack.is_playing,
      progress: currentTrack.progress_ms,
    };

    return NextResponse.json({
      isPlaying: currentTrack.is_playing,
      track,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch current track" },
      { status: 500 }
    );
  }
}
