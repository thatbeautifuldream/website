import {
  BarChart3Icon,
  Code2Icon,
  FileTextIcon,
  FlameIcon,
  GitCommitIcon,
  KeyboardIcon,
  MusicIcon,
  PaletteIcon,
  RocketIcon,
  SparklesIcon,
  TrophyIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { WRAPPED_2025_STATS, WRAPPED_HIGHLIGHTS } from '@/lib/data/wrapped';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createMetadata({
  title: 'Milind Wrapped 2025',
  description: 'A year in review of Milind Mishra coding journey in 2025',
  image: `/og?title=${encodeURIComponent('Milind Wrapped 2025')}&description=${encodeURIComponent('A year in review of 2025')}`,
});

const WITTY_MESSSAGES = [
  {
    title: 'Code Commit Champion',
    message: 'More commits than some people have thoughts in a day!',
  },
  {
    title: 'Feature Factory',
    message: "Shipping features like it's a pizza delivery service.",
  },
  {
    title: 'Bug Slayer',
    message: 'Fixing bugs with surgical precision (and some duct tape).',
  },
  {
    title: 'Full Stack Warrior',
    message: "Frontend, backend, database - you name it, I've done it.",
  },
];

function getHighlightIcon(iconName: string) {
  switch (iconName) {
    case 'palette':
      return PaletteIcon;
    case 'keyboard':
      return KeyboardIcon;
    case 'music':
      return MusicIcon;
    case 'chart':
      return BarChart3Icon;
    case 'file':
      return FileTextIcon;
    case 'sparkles':
      return SparklesIcon;
    default:
      return SparklesIcon;
  }
}

function StatCard({
  icon: Icon,
  title,
  value,
  description,
  delay,
  className,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  description: string;
  delay?: number;
  className?: string;
}) {
  return (
    <Section className={cn('flex h-full flex-col', className)} delay={delay}>
      <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent/5">
        <div className="mb-3 flex shrink-0 items-start justify-between">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
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
  color,
  delay,
}: {
  type: string;
  count: number;
  total: number;
  color: string;
  delay?: number;
}) {
  const percentage = ((count / total) * 100).toFixed(1);

  return (
    <Section className="space-y-2" delay={delay}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('h-3 w-3 rounded-full', color)} />
          <span className="font-medium text-foreground text-sm capitalize">
            {type}
          </span>
        </div>
        <span className="text-muted-foreground text-sm">{count} commits</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            color
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-muted-foreground text-xs">{percentage}% of total</p>
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
        <div
          className="w-full max-w-[3rem] rounded-t-lg bg-primary transition-all duration-500 hover:bg-primary/80"
          style={{ height: `${height}%` }}
        />
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground text-sm">{count}</p>
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
    WITTY_MESSSAGES[Math.floor(Math.random() * WITTY_MESSSAGES.length)];

  const COLORS = {
    feat: 'bg-primary',
    fix: 'bg-destructive',
    refactor: 'bg-accent',
    chore: 'bg-secondary',
    other: 'bg-muted-foreground',
  };

  return (
    <>
      <Section className="gap-0">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-primary/10">
            <SparklesIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-4xl text-foreground">
              Milind Wrapped 2025
            </h1>
            <p className="text-muted-foreground">
              A year in review of code & creativity
            </p>
          </div>
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
            description="Pushed to git this year"
            icon={GitCommitIcon}
            title="Total Commits"
            value={stats.totalCommits}
          />
          <StatCard
            delay={0.3}
            description="Fresh code written"
            icon={Code2Icon}
            title="Lines Added"
            value={stats.linesAdded.toLocaleString()}
          />
          <StatCard
            delay={0.35}
            description="New things built"
            icon={TrophyIcon}
            title="Features Shipped"
            value={stats.featCommits}
          />
          <StatCard
            delay={0.4}
            description="Total lines modified"
            icon={FlameIcon}
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
            color={COLORS.feat}
            count={stats.featCommits}
            delay={0.75}
            total={stats.totalCommits}
            type="features"
          />
          <CommitTypeBar
            color={COLORS.fix}
            count={stats.fixCommits}
            delay={0.8}
            total={stats.totalCommits}
            type="fixes"
          />
          <CommitTypeBar
            color={COLORS.refactor}
            count={stats.refactorCommits}
            delay={0.85}
            total={stats.totalCommits}
            type="refactors"
          />
          <CommitTypeBar
            color={COLORS.chore}
            count={stats.choreCommits}
            delay={0.9}
            total={stats.totalCommits}
            type="chores"
          />
          <CommitTypeBar
            color={COLORS.other}
            count={stats.otherCommits}
            delay={0.95}
            total={stats.totalCommits}
            type="other"
          />
        </div>
      </Section>

      <Section delay={1.1}>
        <h2 className="mb-4 font-bold text-foreground text-xl">
          Year Highlights
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {WRAPPED_HIGHLIGHTS.map((highlight, index) => {
            const Icon = getHighlightIcon(highlight.icon);
            return (
              <Section
                className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent/5"
                delay={1.15 + index * 0.05}
                key={highlight.title}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 shrink-0 font-semibold text-foreground text-sm">
                  {highlight.title}
                </h3>
                <p className="line-clamp-3 text-muted-foreground text-xs">
                  {highlight.description}
                </p>
              </Section>
            );
          })}
        </div>
      </Section>

      <Section delay={1.5}>
        <h2 className="mb-4 font-bold text-foreground text-xl">Fun Facts</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
            <p className="mb-2 shrink-0 text-muted-foreground text-xs uppercase">
              Most Productive Day
            </p>
            <p className="shrink-0 font-semibold text-foreground text-lg">
              {stats.mostActiveDate || 'N/A'}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              The day with most commits
            </p>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
            <p className="mb-2 shrink-0 text-muted-foreground text-xs uppercase">
              Code Efficiency
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
              Net code growth rate
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
              Daily commitment level
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
              Average impact per commit
            </p>
          </div>
        </div>
      </Section>

      <Section delay={1.7}>
        <div className="rounded-lg border border-border bg-accent/5 p-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <RocketIcon className="h-6 w-6 text-primary" />
            <p className="font-bold text-foreground text-xl">
              Here's to an even better 2026!
            </p>
            <RocketIcon className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">
            Keep building, keep shipping, keep growing
          </p>
        </div>
      </Section>
    </>
  );
};

export default WrappedPage;
