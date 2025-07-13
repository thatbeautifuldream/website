import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json(
      { error: `Spotify authorization failed: ${error}` },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code not found" },
      { status: 400 }
    );
  }

  const redirectUri = `https://${env.VERCEL_PROJECT_PRODUCTION_URL}/api/spotify/callback`;

  try {
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
      return NextResponse.json(
        {
          error: "Failed to exchange code for tokens",
          status: response.status,
          details: errorData,
          redirectUri,
          // Include this for debugging
          debugInfo: {
            clientId: env.SPOTIFY_CLIENT_ID,
            hasSecret: !!env.SPOTIFY_CLIENT_SECRET,
            codeLength: code.length,
          },
        },
        { status: 500 }
      );
    }

    const tokens = await response.json();

    // In a real app, you'd save the refresh_token to your database
    // For now, we'll just return it so you can copy it to your .env file
    return NextResponse.json({
      message:
        "Authorization successful! Copy the refresh_token to your .env file as SPOTIFY_REFRESH_TOKEN",
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to exchange authorization code for tokens",
        message: err instanceof Error ? err.message : "Unknown error",
        redirectUri,
      },
      { status: 500 }
    );
  }
}
