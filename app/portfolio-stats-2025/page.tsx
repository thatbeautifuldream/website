import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { WRAPPED_2025_STATS, WRAPPED_HIGHLIGHTS } from '@/lib/data/wrapped';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createMetadata({
  title: 'Portfolio Stats 2025',
  description: 'Git statistics and highlights from the portfolio repository in 2025',
  image: `/og?title=${encodeURIComponent('Portfolio Stats 2025')}&description=${encodeURIComponent('Portfolio repository statistics for 2025')}`,
});

const WITTY_MESSAGES = [
  {
    title: 'Portfolio Evolution',
    message: 'Continuously improving and evolving the personal website.',
  },
  {
    title: 'Iterative Development',
    message: "Building better experiences, one commit at a time.",
  },
  {
    title: 'Personal Project',
    message: 'A space for learning, experimenting, and showcasing work.',
  },
  {
    title: 'Always Building',
    message: 'Consistently adding features and refining the portfolio.',
  },
];

function StatCard({
  title,
  value,
  description,
  delay,
  className,
}: {
  title: string;
  value: string | number;
  description: string;
  delay?: number;
  className?: string;
}) {
  return (
    <Section className={cn('flex h-full flex-col', className)} delay={delay}>
      <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent/5">
        <h3 className="shrink-0 font-medium text-foreground-lighter text-xs uppercase tracking-wider">
          {title}
        </h3>
        <div className="mt-2 flex shrink-0 items-baseline gap-2">
          <p className="font-bold text-3xl text-foreground">{value}</p>
        </div>
        <p className="mt-1 text-muted-foreground text-xs">{description}</p>
      </div>
    </Section>
  );
}

function CommitTypeBar({
  type,
  count,
  total,
  delay,
}: {
  type: string;
  count: number;
  total: number;
  delay?: number;
}) {
  const percentageNumber = total > 0 ? (count / total) * 100 : 0;

  return (
    <Section className="space-y-2" delay={delay}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="font-medium text-foreground text-sm capitalize">
            {type}
          </span>
        </div>
        <span className="text-muted-foreground text-sm">{count} commits</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${percentageNumber.toFixed(1)}%` }}
        />
      </div>
      <p className="text-muted-foreground text-xs">{percentageNumber.toFixed(1)}% of total</p>
    </Section>
  );
}

function MonthBar({
  month,
  count,
  maxCount,
  delay,
}: {
  month: string;
  count: number;
  maxCount: number;
  delay?: number;
}) {
  const height =
    maxCount > 0 ? Math.max(Math.round((count / maxCount) * 100), 5) : 5;

  return (
    <Section className="flex flex-col items-center gap-2" delay={delay}>
      <div className="flex h-40 w-full items-end justify-center">
        {count > 0 ? (
          <div
            className="w-full max-w-[3rem] rounded-t-lg bg-primary transition-all duration-500 hover:bg-primary/80"
            style={{ height: `${height}%` }}
          />
        ) : (
          <div className="w-full max-w-[3rem] border-t-2 border-dashed border-border" />
        )}
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground text-sm">
          {count > 0 ? count : '-'}
        </p>
        <p className="text-muted-foreground text-xs">{month.substring(0, 3)}</p>
      </div>
    </Section>
  );
}

const WrappedPage = () => {
  const stats = WRAPPED_2025_STATS;
  const maxMonthCount = Math.max(
    ...stats.commitsByMonth.map((m) => m.count),
    1
  );
  const randomMessage =
    WITTY_MESSAGES[Math.floor(Math.random() * WITTY_MESSAGES.length)];

  return (
    <>
      <Section className="gap-0">
        <div className="mb-8">
          <h1 className="font-bold text-4xl text-foreground">
            Portfolio Stats 2025
          </h1>
          <p className="text-muted-foreground">
            Git statistics and highlights from the portfolio repository
          </p>
        </div>

        <div className="my-6 rounded-lg border border-border bg-accent/5 p-4">
          <p className="text-foreground-lighter text-sm">
            <span className="font-semibold text-foreground">
              {randomMessage.title}
            </span>
            <span className="mx-2">•</span>
            {randomMessage.message}
          </p>
        </div>
      </Section>

      <Section delay={0.2}>
        <h2 className="mb-4 font-bold text-foreground text-xl">The Numbers</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            delay={0.25}
            description="Commits to the portfolio repository"
            title="Total Commits"
            value={stats.totalCommits}
          />
          <StatCard
            delay={0.3}
            description="Lines added to the portfolio"
            title="Lines Added"
            value={stats.linesAdded.toLocaleString()}
          />
          <StatCard
            delay={0.35}
            description="New portfolio features shipped"
            title="Features Shipped"
            value={stats.featCommits}
          />
          <StatCard
            delay={0.4}
            description="Total lines changed in portfolio"
            title="Code Changes"
            value={stats.totalChanges.toLocaleString()}
          />
        </div>
      </Section>

      <Section delay={0.5}>
        <h2 className="mb-4 font-bold text-foreground text-xl">
          Commit Activity by Month
        </h2>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="mb-6 text-muted-foreground text-sm">
            Most active month:{' '}
            <span className="font-semibold text-foreground">
              {stats.mostActiveMonth}
            </span>{' '}
            with{' '}
            <span className="font-semibold text-foreground">
              {Math.max(...stats.commitsByMonth.map((m) => m.count))} commits
            </span>
          </p>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
            {stats.commitsByMonth.map((month, index) => (
              <MonthBar
                count={month.count}
                delay={0.55 + index * 0.05}
                key={month.month}
                maxCount={maxMonthCount}
                month={month.month}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section delay={0.7}>
        <h2 className="mb-4 font-bold text-foreground text-xl">
          Commit Breakdown
        </h2>
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <CommitTypeBar
            count={stats.featCommits}
            delay={0.75}
            total={stats.totalCommits}
            type="features"
          />
          <CommitTypeBar
            count={stats.fixCommits}
            delay={0.8}
            total={stats.totalCommits}
            type="fixes"
          />
          <CommitTypeBar
            count={stats.refactorCommits}
            delay={0.85}
            total={stats.totalCommits}
            type="refactors"
          />
          <CommitTypeBar
            count={stats.choreCommits}
            delay={0.9}
            total={stats.totalCommits}
            type="chores"
          />
          <CommitTypeBar
            count={stats.otherCommits}
            delay={0.95}
            total={stats.totalCommits}
            type="other"
          />
        </div>
      </Section>

      <Section delay={1.1}>
        <h2 className="mb-4 font-bold text-foreground text-xl">
          Portfolio Highlights
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {WRAPPED_HIGHLIGHTS.map((highlight, index) => (
            <Section
              className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent/5"
              delay={1.15 + index * 0.05}
              key={highlight.title}
            >
              <h3 className="mb-2 shrink-0 font-semibold text-foreground text-sm">
                {highlight.title}
              </h3>
              <p className="line-clamp-3 text-muted-foreground text-xs">
                {highlight.description}
              </p>
            </Section>
          ))}
        </div>
      </Section>

      <Section delay={1.5}>
        <h2 className="mb-4 font-bold text-foreground text-xl">Portfolio Insights</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
            <p className="mb-2 shrink-0 text-muted-foreground text-xs uppercase">
              Most Active Day
            </p>
            <p className="shrink-0 font-semibold text-foreground text-lg">
              {stats.mostActiveDate || 'N/A'}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Day with the most portfolio commits
            </p>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
            <p className="mb-2 shrink-0 text-muted-foreground text-xs uppercase">
              Code Growth
            </p>
            <p className="shrink-0 font-semibold text-foreground text-lg">
              {(
                ((stats.linesAdded - stats.linesDeleted) /
                  (stats.linesAdded || 1)) *
                100
              ).toFixed(1)}
              %
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Net portfolio code growth rate
            </p>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
            <p className="mb-2 shrink-0 text-muted-foreground text-xs uppercase">
              Avg. Commits/Day
            </p>
            <p className="shrink-0 font-semibold text-foreground text-lg">
              {(stats.totalCommits / 365).toFixed(1)}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Daily portfolio development pace
            </p>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
            <p className="mb-2 shrink-0 text-muted-foreground text-xs uppercase">
              Lines per Commit
            </p>
            <p className="shrink-0 font-semibold text-foreground text-lg">
              {(stats.totalChanges / (stats.totalCommits || 1)).toFixed(0)}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Average changes per portfolio commit
            </p>
          </div>
        </div>
      </Section>

      <Section delay={1.7}>
        <div className="rounded-lg border border-border bg-accent/5 p-6 text-center">
          <p className="mb-4 font-bold text-foreground text-xl">
            Here's to an even better portfolio in 2026!
          </p>
          <p className="text-muted-foreground text-sm">
            Keep building, keep shipping, keep improving
          </p>
        </div>
      </Section>
    </>
  );
};

export default WrappedPage;
