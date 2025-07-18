import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { env } from '@/lib/env';
import { cache } from '@/cache/redis';

// Expiration time for online visitors (in seconds)
const EXPIRATION_SECONDS = 30 * 60; // 30 minutes

export async function GET(request: NextRequest) {
    try {
        // Check if request is from a bot
        const userAgent = request.headers.get('user-agent') || '';
        const isUserBot = isBot(userAgent);

        if (isUserBot) {
            return NextResponse.json({ success: true, count: 0 });
        }

        // Get user's IP
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            request.headers.get('remote-addr') ||
            'unknown';

        // Hash the IP address for privacy
        const anonymizedIp = crypto
            .createHash('sha256')
            .update(ip + (env.IP_SALT || ''))
            .digest('hex')
            .substring(0, 16);

        if (anonymizedIp !== 'unknown') {
            // Use a Redis SET to store online visitors
            // Key: "visitors_online", Value: anonymizedIp, Expiry: 30 min
            await cache.sadd('visitors_online', anonymizedIp);
            await cache.expire('visitors_online', EXPIRATION_SECONDS);

            // set a per-IP key for more granular expiry
            await cache.set(`visitor:${anonymizedIp}`, Date.now(), { ex: EXPIRATION_SECONDS });
        }

        // Count online users
        const count = await cache.scard('visitors_online');

        return NextResponse.json({ success: true, count });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        );
    }
}

// Function to check if the request is from a bot
function isBot(userAgent: string): boolean {
    if (!userAgent) return true;

    const botPatterns = [
        /bot/i,
        /crawler/i,
        /spider/i,
        /googlebot/i,
        /bingbot/i,
        /yahoo/i,
        /yandex/i,
        /baidu/i,
        /slurp/i,
        /facebook/i,
        /crawl/i,
        /scrape/i,
        /archive\.org/i,
        /ahrefs/i,
        /semrush/i,
        /rogerbot/i,
        /mj12bot/i,
        /lighthouse/i,
        /pingdom/i,
        /headless/i,
        /chrome-lighthouse/i,
        /dataminr/i,
        /screaming frog/i,
        /sitebulb/i,
    ];

    return botPatterns.some((pattern) => pattern.test(userAgent));
}