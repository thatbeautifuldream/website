import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { env } from '@/lib/env';
import { cache } from '@/cache/redis';

const EXPIRATION_SECONDS = 30 * 60; // 30 minutes
const WRITE_THROTTLE_SECONDS = 60;  // How often we update Redis per user -> 60 seconds

export async function GET(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent') || '';
        if (isBot(userAgent)) {
            return NextResponse.json({ success: true, count: 0 });
        }

        // Get (and hash) the user's IP
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0]
            || request.headers.get('x-real-ip')
            || request.headers.get('remote-addr')
            || 'unknown';

        if (ip === 'unknown') {
            return NextResponse.json({ success: true, count: 0 });
        }

        const anonymizedIp = crypto
            .createHash('sha256')
            .update(ip + (env.IP_SALT || ''))
            .digest('hex')
            .substring(0, 16);

        const now = Date.now();
        const lastSeenKey = `last_seen:${anonymizedIp}`;
        const lastSeen: string | null = await cache.get(lastSeenKey);

        // Only update Redis if this user hasn't been seen recently
        if (!lastSeen || now - parseInt(lastSeen, 10) > WRITE_THROTTLE_SECONDS * 1000) {
            const meta = {
                userAgent,
                timestamp: now,
            };

            // Pipeline (batch) for speed
            await cache
                .multi()
                .zadd('visitors_online', { score: now, member: anonymizedIp })
                .set(lastSeenKey, now, { ex: EXPIRATION_SECONDS })
                .hmset(`visitor_meta:${anonymizedIp}`, meta)
                .expire(`visitor_meta:${anonymizedIp}`, EXPIRATION_SECONDS)
                .exec();
        }

        // Cleanup expired entries right before counting
        await cache.zremrangebyscore(
            'visitors_online',
            0,
            now - EXPIRATION_SECONDS * 1000
        );

        // Instant online user count!
        const count = await cache.zcount(
            'visitors_online',
            now - EXPIRATION_SECONDS * 1000,
            '+inf'
        );

        return NextResponse.json({ success: true, count });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: 'Server error' }, { status: 500 }
        );
    }
}

function isBot(userAgent: string): boolean {
    if (!userAgent) return true;
    const botPatterns = [
        /bot/i, /crawler/i, /spider/i, /googlebot/i, /bingbot/i, /yahoo/i,
        /yandex/i, /baidu/i, /slurp/i, /facebook/i, /crawl/i, /scrape/i,
        /archive\.org/i, /ahrefs/i, /semrush/i, /rogerbot/i, /mj12bot/i,
        /lighthouse/i, /pingdom/i, /headless/i, /chrome-lighthouse/i,
        /dataminr/i, /screaming frog/i, /sitebulb/i,
    ];
    return botPatterns.some(pattern => pattern.test(userAgent));
}