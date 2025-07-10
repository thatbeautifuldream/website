import { ArrowLeftIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const wittyMessages = [
    {
        title: "404: Epic Not Found",
        message: "Yaar, this page is not in our current sprint. Maybe it's stuck in the backlog forever! 🏏",
        emoji: "📋"
    },
    {
        title: "Arrey Bhai, Kya Kar Rahe Ho?",
        message: "This URL is giving me 'jugaad gone wrong' vibes. Time to pivot to the homepage! 🛵",
        emoji: "🤷‍♂️"
    },
    {
        title: "Product-Market Fit = 0",
        message: "This page has zero user adoption. Even my maa won't use it! Time to deprecate 👩‍💻",
        emoji: "📊"
    },
    {
        title: "Acha, But Where's The Page?",
        message: "I've shipped features to millions of users, but couldn't ship this page to production! 🚢",
        emoji: "🚀"
    },
    {
        title: "Bro, Page Ka Chakkar Hai",
        message: "This page is more lost than finding parking in Koramangala during rush hour! 🚗",
        emoji: "🎯"
    },
    {
        title: "MVP Failed Successfully",
        message: "This page's user story: 'As a user, I want to see a page that doesn't exist' - Story points: ∞",
        emoji: "📝"
    },
    {
        title: "Kuch Toh Gadbad Hai",
        message: "My product sense is tingling, but this page's metrics are showing 404% failure rate! 📈",
        emoji: "⚡"
    },
    {
        title: "Chalo, Let's Go Back",
        message: "This page is like a startup without PMF - it sounds good in theory but doesn't work! 💡",
        emoji: "🔄"
    },
    {
        title: "Bas Karo, Enough Drama",
        message: "Even after A/B testing this URL 100 times, the conversion rate is still 0. Classic! 🧪",
        emoji: "🎭"
    },
    {
        title: "Haan Bhai, Problem Hai",
        message: "This page is giving me 'feature request from sales team' energy - sounds urgent but doesn't exist! 💼",
        emoji: "🤝"
    },
    {
        title: "Oye, Kahan Ja Rahe Ho?",
        message: "You're looking for a page that's rarer than a bug-free release on Friday evening! 🌙",
        emoji: "🔍"
    },
    {
        title: "Bhai, Galat Jagah Aa Gaye",
        message: "This URL has lower DAU than my abandoned side project. Time to sunset it! 📱",
        emoji: "🗺️"
    }
];

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
    const randomMessage =
        wittyMessages[Math.floor(Math.random() * wittyMessages.length)];

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="mb-8 text-8xl">{randomMessage.emoji}</div>
            <h1 className="mb-4 font-bold text-2xl text-foreground tracking-tight">
                {randomMessage.title}
            </h1>
            <p className="mb-8 max-w-md text-muted-foreground text-sm">
                {randomMessage.message}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        'min-w-[140px]'
                    )}
                    href="/"
                >
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Return Home
                </Link>
                <Link
                    className={cn(
                        buttonVariants({ variant: 'secondary' }),
                        'min-w-[140px]'
                    )}
                    href="/blog"
                >
                    Check Blog ?
                </Link>
            </div>
        </div>
    );
}
