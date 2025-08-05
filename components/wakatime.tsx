'use client';

import { useQuery } from '@tanstack/react-query';
import { Activity } from 'lucide-react';
import { Section } from '@/components/section';
import { orpc } from '@/lib/orpc';
import { DailyBreakdownChart } from '@/components/daily-breakdown-chart';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
});

export function Wakatime() {
    const wakatimeQuery = useQuery(orpc.wakatime.queryOptions({
        context: { cache: true },
    }));

    if (wakatimeQuery.isPending) {
        return (
            <Section>
                <div className="space-y-4">
                    <div className="p-6">
                        <div className="flex items-center justify-center py-8">
                            <div className="text-center space-y-3">
                                <p className="text-foreground-lighter text-md">
                                    <span className="animate-pulse">Analyzing Milind's coding habits...</span>
                                </p>
                                <p className="text-foreground-lighter/60 text-xs">
                                    Counting how many times he has typed "console.log" today
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

    const totalSeconds = data.reduce((sum, day) => sum + day.grand_total.total_seconds, 0);
    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const totalText = `${totalHours}h ${totalMinutes}m`;

    const dailyAverageSeconds = totalSeconds / data.length;
    const dailyAverageHours = Math.floor(dailyAverageSeconds / 3600);
    const dailyAverageMinutes = Math.floor((dailyAverageSeconds % 3600) / 60);
    const dailyAverageText = `${dailyAverageHours}h ${dailyAverageMinutes}m`;

    return (
        <div className="flex flex-col space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Section delay={0.1}>
                    <div className="rounded-lg border shadow-sm bg-secondary p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Total Time</h3>
                        <p className="text-2xl font-semibold text-foreground">{totalText}</p>
                    </div>
                </Section>
                <Section delay={0.2}>
                    <div className="rounded-lg border shadow-sm bg-secondary p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Daily Average</h3>
                        <p className="text-2xl font-semibold text-foreground">{dailyAverageText}</p>
                    </div>
                </Section>
                <Section delay={0.3}>
                    <div className="rounded-lg border shadow-sm bg-secondary p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Most Active Day</h3>
                        <p className="text-2xl font-semibold text-foreground">{dateFormatter.format(new Date(data.reduce((max, day) =>
                            day.grand_total.total_seconds > max.grand_total.total_seconds ? day : max
                        ).range.date))}</p>
                    </div>
                </Section>
            </div>
            <div className="flex flex-col space-y-10">
                <Section delay={0.4}>
                    <DailyBreakdownChart data={data} />
                </Section >
            </div>
        </div >
    );
};