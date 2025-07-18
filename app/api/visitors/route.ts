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
            await cache.sadd('visitors_online', anonymizedIp);
            // Collect more metadata
            const referer = request.headers.get('referer') || '';
            const acceptLanguage = request.headers.get('accept-language') || '';
            const path = request.nextUrl.pathname;
            const method = request.method;
            // Parse device/browser info from user-agent
            const deviceType = /mobile|android|iphone|ipad/i.test(userAgent) ? 'mobile' : 'desktop';
            let browser = 'unknown', os = 'unknown';
            if (/chrome/i.test(userAgent)) browser = 'chrome';
            else if (/firefox/i.test(userAgent)) browser = 'firefox';
            else if (/safari/i.test(userAgent)) browser = 'safari';
            else if (/edge/i.test(userAgent)) browser = 'edge';
            else if (/opera/i.test(userAgent)) browser = 'opera';
            if (/windows/i.test(userAgent)) os = 'windows';
            else if (/mac/i.test(userAgent)) os = 'macos';
            else if (/linux/i.test(userAgent)) os = 'linux';
            else if (/android/i.test(userAgent)) os = 'android';
            else if (/iphone|ipad/i.test(userAgent)) os = 'ios';
            const meta = {
                userAgent,
                timestamp: Date.now(),
                ip: ip,
                forwarded: forwarded || '',
                referer,
                acceptLanguage,
                path,
                method,
                deviceType,
                browser,
                os,
            };
            await cache.hmset(`visitor_meta:${anonymizedIp}`, meta);
            await cache.expire(`visitor_meta:${anonymizedIp}`, EXPIRATION_SECONDS);
        }

        // Count only online users with valid metadata
        const allIps = await cache.smembers('visitors_online');
        let count = 0;
        for (const ip of allIps) {
            const exists = await cache.exists(`visitor_meta:${ip}`);
            if (exists) {
                count++;
            } else {
                // Clean up expired IPs and their metadata
                await cache.srem('visitors_online', ip);
                await cache.del(`visitor_meta:${ip}`);
            }
        }

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