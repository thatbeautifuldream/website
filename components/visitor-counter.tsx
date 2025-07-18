'use client';

import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import NumberFlow from '@number-flow/react'

async function fetchVisitors() {
    const res = await fetch('/api/visitors');
    const data = await res.json();
    return data.count ?? 0;
}

export function VisitorCounter() {
    const { data: count = 0, isLoading, error, refetch } = useQuery({
        queryKey: ['visitors'],
        queryFn: fetchVisitors,
        refetchInterval: 30_000, // 30 seconds

    });

    if (isLoading) {
        return (
            <div
                className={cn(
                    'fixed right-5 top-4 flex items-center gap-2 rounded-full bg-secondary/80 px-3 py-1 ring-1 ring-border shadow transition-all'
                )}
                aria-label="Loading visitor count"
            >
                <span className="inline-block size-2 animate-pulse rounded-full bg-muted" />
                <span className="font-mono text-sm text-foreground">~</span>
            </div>
        );
    }

    if (error) {
        console.error('Error fetching visitor count:', error);
        return (
            <div
                className={cn(
                    'fixed right-5 top-4 flex items-center gap-2 rounded-full bg-secondary/80 px-3 py-1 ring-1 ring-border shadow transition-all'
                )}
                aria-label="Error fetching visitor count"
            >
                <span className="inline-block size-2 rounded-full bg-destructive" />
                <span className="font-mono text-sm text-foreground">?</span>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'fixed right-5 top-4 flex items-center gap-2 rounded-full bg-secondary/80 px-3 py-1 ring-1 ring-border shadow transition-all cursor-pointer hover:bg-secondary/90 active:scale-95 hover:scale-105 select-none'
            )}
            aria-label="Live visitor count"
            onClick={() => refetch()}
        >
            <span className="inline-block size-2 rounded-full bg-green-500" />
            <span className="font-mono text-sm text-foreground"><NumberFlow value={count} /></span>
        </div>
    );
}