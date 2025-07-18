import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { env } from '@/lib/env';

// In-memory storage (for testing)
// Latter, will use redis or database, likely redis from upstash 
let visitorsData: { [key: string]: number } = {};

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

        // Current timestamp
        const now = Date.now();
        const expirationTime = 30 * 60 * 1000; // 30 minutes in milliseconds

        // Add or update the current visitor
        if (anonymizedIp !== 'unknown') {
            // Filter out expired visitors
            Object.keys(visitorsData).forEach(id => {
                if (now - visitorsData[id] > expirationTime) {
                    delete visitorsData[id];
                }
            });

            // Add or update current visitor
            visitorsData[anonymizedIp] = now;
        }

        // Count online users
        const count = Object.keys(visitorsData).length;

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