import { execSync } from 'node:child_process';

export type CommitType = 'feat' | 'fix' | 'refactor' | 'chore' | 'other';

export type Commit = {
  hash: string;
  date: Date;
  type: CommitType;
  message: string;
  shortHash: string;
};

export type MonthlyStats = {
  month: string;
  monthIndex: number;
  year: number;
  count: number;
  commits: Commit[];
};

export type YearlyStats = {
  totalCommits: number;
  linesAdded: number;
  linesDeleted: number;
  totalChanges: number;
  featCommits: number;
  fixCommits: number;
  refactorCommits: number;
  choreCommits: number;
  otherCommits: number;
  mostActiveMonth: string;
  mostActiveDate: string;
  commitsByType: Record<CommitType, number>;
  commitsByMonth: MonthlyStats[];
};

function getCommitType(message: string): CommitType {
  const prefix = message.split(':')[0].toLowerCase();
  if (prefix.startsWith('feat')) {
    return 'feat';
  }
  if (prefix.startsWith('fix')) {
    return 'fix';
  }
  if (prefix.startsWith('refactor')) {
    return 'refactor';
  }
  if (prefix.startsWith('chore')) {
    return 'chore';
  }
  return 'other';
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getMonthName(month: number): string {
  return MONTH_NAMES[month];
}

export function getYearlyStats(year: number): YearlyStats {
  try {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const commitsOutput = execSync(
      `git log --since="${startDate}" --until="${endDate}" --pretty=format:"%h|%ad|%s" --date=short`,
      { encoding: 'utf-8' }
    );

    const statsOutput = execSync(
      `git log --since="${startDate}" --until="${endDate}" --numstat --pretty=format:""`,
      { encoding: 'utf-8' }
    );

    const commits: Commit[] = commitsOutput
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [hash, date, message] = line.split('|');
        return {
          hash,
          shortHash: hash.substring(0, 7),
          date: new Date(date),
          type: getCommitType(message),
          message,
        };
      });

    let linesAdded = 0;
    let linesDeleted = 0;

    for (const line of statsOutput.split('\n')) {
      const [added, deleted] = line.split('\t');
      if (added && !added.startsWith('-')) {
        linesAdded += Number.parseInt(added, 10) || 0;
      }
      if (deleted && !deleted.startsWith('-')) {
        linesDeleted += Number.parseInt(deleted, 10) || 0;
      }
    }

    const commitsByType: Record<CommitType, number> = {
      feat: 0,
      fix: 0,
      refactor: 0,
      chore: 0,
      other: 0,
    };

    for (const commit of commits) {
      commitsByType[commit.type] += 1;
    }

    const monthCounts = new Map<number, Commit[]>();

    for (const commit of commits) {
      const monthKey = commit.date.getMonth();
      if (!monthCounts.has(monthKey)) {
        monthCounts.set(monthKey, []);
      }
      monthCounts.get(monthKey)?.push(commit);
    }

    const commitsByMonth: MonthlyStats[] = Array.from(monthCounts.entries())
      .map(([monthIndex, monthCommits]) => ({
        month: getMonthName(monthIndex),
        monthIndex,
        year,
        count: monthCommits.length,
        commits: monthCommits,
      }))
      .sort((a, b) => a.monthIndex - b.monthIndex);

    const mostActiveMonthObj = commitsByMonth.reduce((max, current) =>
      current.count > max.count ? current : max
    );

    const dateCounts = new Map<string, number>();
    for (const commit of commits) {
      const dateKey = commit.date.toISOString().split('T')[0];
      dateCounts.set(dateKey, (dateCounts.get(dateKey) || 0) + 1);
    }

    const mostActiveDate = Array.from(dateCounts.entries()).reduce(
      (max, [date, count]) => (count > max.count ? { date, count } : max),
      { date: '', count: 0 }
    );

    return {
      totalCommits: commits.length,
      linesAdded,
      linesDeleted,
      totalChanges: linesAdded + linesDeleted,
      featCommits: commitsByType.feat,
      fixCommits: commitsByType.fix,
      refactorCommits: commitsByType.refactor,
      choreCommits: commitsByType.chore,
      otherCommits: commitsByType.other,
      mostActiveMonth: `${mostActiveMonthObj.month} ${mostActiveMonthObj.year}`,
      mostActiveDate: mostActiveDate.date,
      commitsByType,
      commitsByMonth,
    };
  } catch (_error) {
    return {
      totalCommits: 0,
      linesAdded: 0,
      linesDeleted: 0,
      totalChanges: 0,
      featCommits: 0,
      fixCommits: 0,
      refactorCommits: 0,
      choreCommits: 0,
      otherCommits: 0,
      mostActiveMonth: '',
      mostActiveDate: '',
      commitsByType: {
        feat: 0,
        fix: 0,
        refactor: 0,
        chore: 0,
        other: 0,
      },
      commitsByMonth: [],
    };
  }
}

export const WRAPPED_2025_STATS = getYearlyStats(2025);

export type HighlightIcon =
  | 'palette'
  | 'keyboard'
  | 'music'
  | 'chart'
  | 'file'
  | 'sparkles';

export type Highlight = {
  title: string;
  description: string;
  icon: HighlightIcon;
};

export const WRAPPED_HIGHLIGHTS: Highlight[] = [
  {
    title: 'Portfolio Redesign',
    description:
      'Completely redesigned the portfolio with new animations and project showcase',
    icon: 'palette',
  },
  {
    title: 'Command Palette',
    description:
      'Added lightning-fast keyboard navigation with command palette',
    icon: 'keyboard',
  },
  {
    title: 'Spotify Integration',
    description: 'Live now playing and top tracks displayed on the homepage',
    icon: 'music',
  },
  {
    title: 'Wakatime Stats',
    description: 'Integrated real-time coding statistics and insights',
    icon: 'chart',
  },
  {
    title: 'Guestbook',
    description: 'Interactive guestbook with real-time updates',
    icon: 'file',
  },
  {
    title: 'View Transitions',
    description: 'Smooth page transitions using the View Transition API',
    icon: 'sparkles',
  },
];
