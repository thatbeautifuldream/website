'use client';

import GitHubCalendar, { type Activity } from 'react-github-calendar';
import { useMemo } from 'react';

type GitHubContributionsProps = {
    username: string;
    months?: number;
    className?: string;
};

const selectLastNMonths = (contributions: Activity[], months: number) => {
    const now = new Date();
    const cutoffDate = new Date(now);
    cutoffDate.setMonth(now.getMonth() - months);
    return contributions.filter((activity) => {
        const activityDate = new Date(activity.date);
        return activityDate >= cutoffDate && activityDate <= now;
    });
};

export const GitHubContributions = ({
    username,
    months = 10,
    className,
}: GitHubContributionsProps) => {
    const theme = useMemo(
        () => ({
            dark: [
                'var(--color-secondary)',
                'var(--github-contrib-1)',
                'var(--github-contrib-2)',
                'var(--github-contrib-3)',
                'var(--github-contrib-4)',
            ],
            light: [
                'var(--color-secondary)',
                'var(--github-contrib-1)',
                'var(--github-contrib-2)',
                'var(--github-contrib-3)',
                'var(--github-contrib-4)',
            ],
        }),
        []
    );

    return (
        <div className={className}>
            <GitHubCalendar
                username={username}
                colorScheme="dark"
                transformData={(data) => selectLastNMonths(data, months)}
                labels={{
                    totalCount: `{{count}} contributions in the last ${months} months`,
                }}
                fontSize={12}
                errorMessage="Error loading GitHub contributions"
                theme={theme}
            />
        </div>
    );
};
