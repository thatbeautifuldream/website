'use client';

import { useQuery } from '@tanstack/react-query';
import { Activity } from 'lucide-react';
import { Section } from '@/components/section';
import { orpc } from '@/lib/orpc';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
});

export function Wakatime() {
    const wakatimeQuery = useQuery(orpc.wakatime.queryOptions({
        context: { cache: true },
    }));

    if (wakatimeQuery.isPending) {
        return (
            <Section>
                <div className="space-y-4">
                    <div className="rounded-lg border border-border/50 bg-card p-6">
                        <div className="flex items-center justify-center py-8">
                            <div className="text-center space-y-3">
                                <p className="text-foreground-lighter text-md">
                                    <span className="animate-pulse">Analyzing my coding habits...</span>
                                </p>
                                <p className="text-foreground-lighter/60 text-xs">
                                    Counting how many times I've typed "console.log" today
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        );
    }

    if (wakatimeQuery.error) {
        return (
            <Section>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-lg border-destructive bg-destructive/10 p-4 transition-all hover:bg-destructive/20">
                        <div className="flex items-center gap-2 text-destructive text-sm">
                            <span>Oops! My coding stats seem to have gone on a chai break.</span>
                        </div>
                    </div>
                </div>
            </Section>
        );
    }

    const data = wakatimeQuery.data?.data;
    if (!data || data.length === 0) {
        return null;
    }

    // Calculate total time across all days
    const totalSeconds = data.reduce((sum, day) => sum + day.grand_total.total_seconds, 0);
    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const totalText = `${totalHours}h ${totalMinutes}m`;

    // Calculate daily average
    const dailyAverageSeconds = totalSeconds / data.length;
    const dailyAverageHours = Math.floor(dailyAverageSeconds / 3600);
    const dailyAverageMinutes = Math.floor((dailyAverageSeconds % 3600) / 60);
    const dailyAverageText = `${dailyAverageHours}h ${dailyAverageMinutes}m`;

    // Get date range
    const firstDay = data[0];
    const lastDay = data[data.length - 1];

    return (
        <div className="flex flex-col space-y-6">
            <Section className="gap-1">
                <div className="flex items-center gap-2">
                    <Activity className="size-4 text-primary" />
                    <h1 className="text-foreground">Wakatime Stats</h1>
                </div>
                <p className="text-foreground-lighter text-sm">
                    My coding activity from {firstDay.range.text} to {lastDay.range.text}
                </p>
            </Section>

            <Section delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-lg border border-border/50 bg-card p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Total Time</h3>
                        <p className="text-2xl font-bold text-foreground">{totalText}</p>
                    </div>
                    <div className="rounded-lg border border-border/50 bg-card p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Daily Average</h3>
                        <p className="text-2xl font-bold text-foreground">{dailyAverageText}</p>
                    </div>
                    <div className="rounded-lg border border-border/50 bg-card p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Days Tracked</h3>
                        <p className="text-2xl font-bold text-foreground">{data.length}</p>
                    </div>
                </div>
            </Section>

            <div className="flex flex-col space-y-10">
                <Section delay={0.2}>
                    <h2 className="font-normal text-foreground-lighter text-sm">Daily Breakdown (Last 7 days)</h2>
                    <ul className="grid gap-6 list-none pl-0">
                        {data.map((day, index) => (
                            <li key={day.range.date}>
                                <div className="group flex flex-col gap-1 border-none text-sm sm:flex-row sm:items-center sm:gap-2">
                                    <p className="text-foreground">{day.range.text}</p>
                                    <span className="hidden h-px grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
                                    <p className="text-foreground-lighter transition-colors group-hover:text-foreground-light">
                                        {day.grand_total.text}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Section >
                <Section delay={0.3}>
                    <h2 className="font-normal text-foreground-lighter text-sm">
                        Additional Stats
                    </h2>
                    <ul className="grid gap-6 list-none pl-0">
                        <li>
                            <div className="group flex flex-col gap-1 border-none text-sm sm:flex-row sm:items-center sm:gap-2">
                                <p className="text-foreground">Total Hours</p>
                                <span className="hidden h-px grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
                                <p className="text-foreground-lighter transition-colors group-hover:text-foreground-light">
                                    {(totalSeconds / 3600).toFixed(2)}h
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="group flex flex-col gap-1 border-none text-sm sm:flex-row sm:items-center sm:gap-2">
                                <p className="text-foreground">Average per Day</p>
                                <span className="hidden h-px grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
                                <p className="text-foreground-lighter transition-colors group-hover:text-foreground-light">
                                    {(dailyAverageSeconds / 3600).toFixed(2)}h
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="group flex flex-col gap-1 border-none text-sm sm:flex-row sm:items-center sm:gap-2">
                                <p className="text-foreground">Most Active Day</p>
                                <span className="hidden h-px grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
                                <p className="text-foreground-lighter transition-colors group-hover:text-foreground-light">
                                    {data.reduce((max, day) =>
                                        day.grand_total.total_seconds > max.grand_total.total_seconds ? day : max
                                    ).range.text}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="group flex flex-col gap-1 border-none text-sm sm:flex-row sm:items-center sm:gap-2">
                                <p className="text-foreground">Timezone</p>
                                <span className="hidden h-px grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
                                <p className="text-foreground-light transition-colors group-hover:text-foreground-light">
                                    {firstDay.range.timezone}
                                </p>
                            </div>
                        </li>
                    </ul>
                </Section>
            </div>
        </div >
    );
};