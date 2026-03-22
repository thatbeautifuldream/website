'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  type Activity,
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from './contribution-graph';

type GitHubContributionGraphClientProps = {
  contributions: Activity[];
  total: number;
  username: string;
  className?: string;
};

export function GitHubContributionGraphClient({
  contributions,
  total,
  username,
  className,
}: GitHubContributionGraphClientProps) {
  return (
    <TooltipProvider>
      <div className={cn('w-full', className)}>
        <ContributionGraph
          blockMargin={4}
          blockRadius={0}
          blockSize={11}
          className="w-full text-[15px]"
          data={contributions}
          totalCount={total}
        >
          <div className="space-y-3">
            <ContributionGraphCalendar className="w-full overflow-x-auto pb-1">
              {({ activity, dayIndex, weekIndex }) => (
                <Tooltip key={`${weekIndex}-${dayIndex}`}>
                  <TooltipTrigger asChild>
                    <g>
                      <ContributionGraphBlock
                        activity={activity}
                        className={cn(
                          'cursor-pointer transition-opacity hover:opacity-80',
                          'data-[level="0"]:fill-foreground/6',
                          'data-[level="1"]:fill-foreground/18',
                          'data-[level="2"]:fill-foreground/32',
                          'data-[level="3"]:fill-foreground/48',
                          'data-[level="4"]:fill-foreground/72'
                        )}
                        dayIndex={dayIndex}
                        weekIndex={weekIndex}
                      />
                    </g>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={8}>
                    <p className="font-semibold">{activity.date}</p>
                    <p>
                      {activity.count} contribution
                      {activity.count !== 1 ? 's' : ''}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </ContributionGraphCalendar>

            <ContributionGraphFooter className="items-end justify-between gap-3 text-xs">
              <ContributionGraphTotalCount className="text-muted-foreground text-xs">
                {({ totalCount, year: contributionYear }) => (
                  <p className="text-balance text-muted-foreground text-xs">
                    {totalCount.toLocaleString('en-US')} contributions in{' '}
                    {contributionYear} on{' '}
                    <a
                      className="font-medium text-foreground underline underline-offset-4"
                      href={`https://github.com/${username}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                )}
              </ContributionGraphTotalCount>
              <ContributionGraphLegend className="text-muted-foreground text-xs">
                {({ level }) => (
                  <svg aria-hidden="true" height={11} width={11}>
                    <rect
                      className={cn(
                        'data-[level="0"]:fill-foreground/6',
                        'data-[level="1"]:fill-foreground/18',
                        'data-[level="2"]:fill-foreground/32',
                        'data-[level="3"]:fill-foreground/48',
                        'data-[level="4"]:fill-foreground/72'
                      )}
                      data-level={level}
                      height={11}
                      rx={0}
                      ry={0}
                      width={11}
                    />
                  </svg>
                )}
              </ContributionGraphLegend>
            </ContributionGraphFooter>
          </div>
        </ContributionGraph>
      </div>
    </TooltipProvider>
  );
}
