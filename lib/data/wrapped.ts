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

export const WRAPPED_2025_STATS: YearlyStats = {
  totalCommits: 232,
  linesAdded: 65466,
  linesDeleted: 29005,
  totalChanges: 94471,
  featCommits: 193,
  fixCommits: 16,
  refactorCommits: 5,
  choreCommits: 4,
  otherCommits: 14,
  mostActiveMonth: 'August 2025',
  mostActiveDate: '2025-11-29',
  commitsByType: {
    feat: 193,
    fix: 16,
    refactor: 5,
    chore: 4,
    other: 14,
  },
  commitsByMonth: [
    {
      month: 'January',
      monthIndex: 0,
      year: 2025,
      count: 0,
      commits: [],
    },
    {
      month: 'February',
      monthIndex: 1,
      year: 2025,
      count: 0,
      commits: [],
    },
    {
      month: 'March',
      monthIndex: 2,
      year: 2025,
      count: 0,
      commits: [],
    },
    {
      month: 'April',
      monthIndex: 3,
      year: 2025,
      count: 0,
      commits: [],
    },
    {
      month: 'May',
      monthIndex: 4,
      year: 2025,
      count: 0,
      commits: [],
    },
    {
      month: 'June',
      monthIndex: 5,
      year: 2025,
      count: 14,
      commits: [],
    },
    {
      month: 'July',
      monthIndex: 6,
      year: 2025,
      count: 68,
      commits: [],
    },
    {
      month: 'August',
      monthIndex: 7,
      year: 2025,
      count: 96,
      commits: [],
    },
    {
      month: 'September',
      monthIndex: 8,
      year: 2025,
      count: 8,
      commits: [],
    },
    {
      month: 'October',
      monthIndex: 9,
      year: 2025,
      count: 2,
      commits: [],
    },
    {
      month: 'November',
      monthIndex: 10,
      year: 2025,
      count: 29,
      commits: [],
    },
    {
      month: 'December',
      monthIndex: 11,
      year: 2025,
      count: 15,
      commits: [],
    },
  ],
};

export type Highlight = {
  title: string;
  description: string;
};

export const WRAPPED_HIGHLIGHTS: Highlight[] = [
  {
    title: 'Portfolio Redesign',
    description:
      'Completely redesigned the portfolio with new animations and project showcase',
  },
  {
    title: 'Command Palette',
    description:
      'Added lightning-fast keyboard navigation with command palette',
  },
  {
    title: 'Spotify Integration',
    description: 'Live now playing and top tracks displayed on the homepage',
  },
  {
    title: 'Wakatime Stats',
    description: 'Integrated real-time coding statistics and insights',
  },
  {
    title: 'Guestbook',
    description: 'Interactive guestbook with real-time updates',
  },
  {
    title: 'View Transitions',
    description: 'Smooth page transitions using the View Transition API',
  },
];
