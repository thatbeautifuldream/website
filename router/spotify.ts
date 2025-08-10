import { os } from "@orpc/server";
import { z } from "zod";
import { env } from "@/lib/env";

// --- Types ---
const SpotifyArtistSchema = z.object({
  name: z.string(),
  url: z.string(),
});
const SpotifyAlbumSchema = z.object({
  name: z.string(),
  image: z.string().nullable().optional(),
});
const SpotifyTrackSchema = z.object({
  name: z.string(),
  artists: z.array(SpotifyArtistSchema),
  album: SpotifyAlbumSchema,
  url: z.string(),
  previewUrl: z.string().nullable(),
  isPlaying: z.boolean(),
  progress: z.number().nullable().optional(),
  type: z.literal("track"),
});
const SpotifyEpisodeSchema = z.object({
  name: z.string(),
  description: z.string(),
  show: z.object({
    name: z.string(),
    publisher: z.string(),
    image: z.string().nullable().optional(),
  }),
  image: z.string().nullable().optional(),
  url: z.string(),
  duration: z.number(),
  isPlaying: z.boolean(),
  progress: z.number().nullable().optional(),
  type: z.literal("episode"),
  releaseDate: z.string(),
  resumePoint: z.any().optional(),
});

// --- Helpers ---
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

// --- currentlyPlaying ---
export const currentlyPlaying = os
  .output(
    z.object({
      isPlaying: z.boolean(),
      track: SpotifyTrackSchema.nullable().optional(),
      episode: SpotifyEpisodeSchema.nullable().optional(),
      currentlyPlayingType: z.string().optional(),
    })
  )
  .handler(async () => {
    const accessToken = await getAccessToken();
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (response.status === 204) {
      return { isPlaying: false, track: null };
    }
    if (!response.ok) {
      throw new Error(`Failed to get current track: ${response.status}`);
    }
    const currentTrack = await response.json();
    if (!currentTrack?.item) {
      return { isPlaying: false, track: null };
    }
    if (currentTrack.currently_playing_type === "track") {
      const trackItem = currentTrack.item;
      return {
        isPlaying: currentTrack.is_playing,
        track: {
          name: trackItem.name,
          artists: trackItem.artists.map((artist: any) => ({
            name: artist.name,
            url: artist.external_urls.spotify,
          })),
          album: {
            name: trackItem.album.name,
            image: trackItem.album.images?.[0]?.url ?? null,
          },
          url: trackItem.external_urls.spotify,
          previewUrl: trackItem.preview_url,
          isPlaying: currentTrack.is_playing,
          progress: currentTrack.progress_ms,
          type: "track",
        },
      };
    }
    if (currentTrack.currently_playing_type === "episode") {
      const episodeItem = currentTrack.item;
      return {
        isPlaying: currentTrack.is_playing,
        episode: {
          name: episodeItem.name,
          description: episodeItem.description,
          show: {
            name: episodeItem.show.name,
            publisher: episodeItem.show.publisher,
            image: episodeItem.show.images?.[0]?.url ?? null,
          },
          image: episodeItem.images?.[0]?.url ?? null,
          url: episodeItem.external_urls.spotify,
          duration: episodeItem.duration_ms,
          isPlaying: currentTrack.is_playing,
          progress: currentTrack.progress_ms,
          type: "episode",
          releaseDate: episodeItem.release_date,
          resumePoint: episodeItem.resume_point,
        },
      };
    }
    return {
      isPlaying: currentTrack.is_playing,
      currentlyPlayingType: currentTrack.currently_playing_type,
      track: null,
    };
  });

// --- topTracks ---
export const topTracks = os
  .output(
    z.object({
      tracks: z.array(
        SpotifyTrackSchema.extend({
          popularity: z.number(),
          explicit: z.boolean(),
          id: z.string(),
        })
      ),
      total: z.number(),
    })
  )
  .handler(async () => {
    const accessToken = await getAccessToken();
    const response = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to get top tracks: ${response.status}`);
    }
    const topTracksResponse = await response.json();
    const topTracks = topTracksResponse.items.map((track: any) => ({
      name: track.name,
      artists: track.artists.map((artist: any) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
      })),
      album: {
        name: track.album.name,
        image: track.album.images?.[0]?.url ?? null,
      },
      url: track.external_urls.spotify,
      previewUrl: track.preview_url,
      isPlaying: false,
      progress: null,
      type: "track",
      popularity: track.popularity,
      explicit: track.explicit,
      id: track.id,
    }));
    return {
      tracks: topTracks,
      total: topTracksResponse.total,
    };
  });

// --- authUrl ---
export const authUrl = os.output(z.object({ url: z.string() })).handler(() => {
  const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-top-read",
  ].join(" ");
  const redirectUri = `https://${env.VERCEL_PROJECT_PRODUCTION_URL}/api/spotify/callback`;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: env.SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: redirectUri,
    state: "some-random-state-value",
  });
  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return { url };
});

// --- callback ---
export const callback = os
  .input(z.object({ code: z.string() }))
  .output(
    z.object({
      message: z.string(),
      access_token: z.string(),
      refresh_token: z.string(),
      expires_in: z.number(),
    })
  )
  .handler(async ({ input }) => {
    const code = input.code;
    const redirectUri = `https://${env.VERCEL_PROJECT_PRODUCTION_URL}/api/spotify/callback`;
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to exchange code for tokens: ${
          response.status
        } - ${JSON.stringify(errorData)}`
      );
    }
    const tokens = await response.json();
    return {
      message:
        "Authorization successful! Copy the refresh_token to your .env file as SPOTIFY_REFRESH_TOKEN",
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
    };
  });
