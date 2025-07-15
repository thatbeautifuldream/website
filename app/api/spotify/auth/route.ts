import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export function GET() {
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

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(authUrl);
}
