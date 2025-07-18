'use client';

import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

async function fetchVisitors() {
    const res = await fetch('/api/visitors');
    const data = await res.json();
    return data.count ?? 0;
}

export function VisitorCounter() {
    const { data: count = 0 } = useQuery({
        queryKey: ['visitors'],
        queryFn: fetchVisitors,
        refetchInterval: 30_000, // 30 seconds
    });

    return (
        <div
            className={cn(
                'fixed right-5 top-4 flex items-center gap-2 rounded-full bg-secondary/80 px-3 py-1 ring-1 ring-border shadow transition-all'
            )}
            aria-label="Live visitor count"
        >
            <span className="inline-block size-2 rounded-full bg-green-500" />
            <span className="font-mono text-sm text-foreground">{count ?? 1}</span>
        </div>
    );
}