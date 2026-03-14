"use client";

import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from "./contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GitHubContributionGraphProps {
  username?: string;
  year?: "last" | "all" | string;
  format?: "flat" | "nested";
  noCache?: boolean;
  className?: string;
}

export function GitHubContributionGraph({
  username = "thatbeautifuldream",
  year = "last",
  format = "flat",
  noCache = false,
  className,
}: GitHubContributionGraphProps) {
  const {
    data: contributionsData,
    isLoading,
    isError,
  } = useQuery({
    ...orpc.github.contributions.queryOptions({
      input: { username, year, format, noCache },
    }),
    staleTime: 1000 * 60 * 60, // 1 hour to match backend cache
    retry: 3,
  });

  if (isLoading) {
    return (
      <Section>
        <div className="flex items-center justify-center py-10">
          <p className="text-sm text-muted-foreground">
            <span className="animate-pulse">Loading GitHub contributions...</span>
          </p>
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section>
        <div className="flex items-center justify-center py-10 text-sm text-destructive">
          GitHub contributions took a coffee break
        </div>
      </Section>
    );
  }

  if (!contributionsData?.contributions?.length) {
    return (
      <Section>
        <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
          No contributions found
        </div>
      </Section>
    );
  }

  const contributions: Activity[] = contributionsData.contributions;

  return (
    <Section delay={0.05}>
      <TooltipProvider>
        <div className={cn("w-full", className)}>
          <ContributionGraph
            data={contributions}
            totalCount={contributionsData.total}
            blockSize={11}
            blockMargin={4}
            blockRadius={0}
            className="w-full text-[15px]"
          >
            <div className="space-y-3">
              <ContributionGraphCalendar className="w-full overflow-x-auto pb-1">
                {({ activity, dayIndex, weekIndex }) => (
                  <Tooltip key={`${weekIndex}-${dayIndex}`}>
                    <TooltipTrigger asChild>
                      <g>
                        <ContributionGraphBlock
                          activity={activity}
                          dayIndex={dayIndex}
                          weekIndex={weekIndex}
                          className={cn(
                            "cursor-pointer transition-opacity hover:opacity-80",
                            'data-[level="0"]:fill-foreground/6',
                            'data-[level="1"]:fill-foreground/18',
                            'data-[level="2"]:fill-foreground/32',
                            'data-[level="3"]:fill-foreground/48',
                            'data-[level="4"]:fill-foreground/72'
                          )}
                        />
                      </g>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={8}>
                      <p className="font-semibold">{activity.date}</p>
                      <p>
                        {activity.count} contribution{activity.count !== 1 ? "s" : ""}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </ContributionGraphCalendar>

              <ContributionGraphFooter className="items-end justify-between gap-3 text-xs">
                <ContributionGraphTotalCount className="text-xs text-muted-foreground">
                  {({ totalCount, year: contributionYear }) => (
                    <p className="text-balance text-xs text-muted-foreground">
                      {totalCount.toLocaleString("en-US")} contributions in{" "}
                      {contributionYear} on{" "}
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
                <ContributionGraphLegend className="text-xs text-muted-foreground">
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
    </Section>
  );
}
