import { NextResponse } from "next/server";
import { env } from "@/lib/env";

type TSpotifyTopTrack = {
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
  popularity: number;
  explicit: boolean;
  id: string;
  uri: string;
};

type TSpotifyTopTracksResponse = {
  items: TSpotifyTopTrack[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
};

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
    const errorData = await response.json();
    throw new Error(
      `Failed to get access token: ${response.status} - ${JSON.stringify(
        errorData
      )}`
    );
  }

  const data = await response.json();
  return data.access_token;
}

async function getTopTracks(
  accessToken: string
): Promise<TSpotifyTopTracksResponse> {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to get top tracks: ${response.status} - ${JSON.stringify(
        errorData
      )}`
    );
  }

  return response.json();
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const topTracksResponse = await getTopTracks(accessToken);

    const topTracks = topTracksResponse.items.map((track) => ({
      name: track.name,
      artists: track.artists.map((artist) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
      })),
      album: {
        name: track.album.name,
        image: track.album.images?.[0]?.url,
      },
      url: track.external_urls.spotify,
      previewUrl: track.preview_url,
      duration: track.duration_ms,
      popularity: track.popularity,
      explicit: track.explicit,
      id: track.id,
    }));

    return NextResponse.json({
      tracks: topTracks,
      total: topTracksResponse.total,
    });
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: track error
    console.error("Top tracks API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch top tracks",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
