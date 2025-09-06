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
    error,
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
        <div className="space-y-4">
          <div className="p-6">
            <div className="flex items-center justify-center py-8">
              <div className="space-y-3 text-center">
                <p className="text-foreground-lighter text-md">
                  <span className="animate-pulse">
                    Loading GitHub contributions...
                  </span>
                </p>
                <p className="text-foreground-lighter/60 text-xs">
                  Fetching those green squares
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section>
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border-destructive bg-destructive/10 p-4 transition-all hover:bg-destructive/20">
            <div className="flex items-center gap-2 text-destructive text-sm">
              <span>
                GitHub contributions took a coffee break
              </span>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (!contributionsData?.contributions?.length) {
    return (
      <Section>
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground text-sm">
            No contributions found
          </div>
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
            className="w-full"
          >
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {contributionsData.years.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {year === "last"
                      ? "Until last year"
                      : year === "all"
                        ? `${contributionsData.years.length} years (${contributionsData.years.join(", ")})`
                        : `Year ${year}`}
                  </p>
                )}
                <ContributionGraphTotalCount className="text-sm" />
              </div>

              <ContributionGraphCalendar className="w-full">
                {({ activity, dayIndex, weekIndex }) => (
                  <Tooltip key={`${weekIndex}-${dayIndex}`}>
                    <TooltipTrigger asChild>
                      <g>
                        <ContributionGraphBlock
                          activity={activity}
                          dayIndex={dayIndex}
                          weekIndex={weekIndex}
                          className="cursor-pointer transition-opacity hover:opacity-80"
                        />
                      </g>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">{activity.date}</p>
                      <p>
                        {activity.count} contribution{activity.count !== 1 ? "s" : ""}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </ContributionGraphCalendar>

              <ContributionGraphFooter>
                <ContributionGraphLegend />
              </ContributionGraphFooter>
            </div>
          </ContributionGraph>
        </div>
      </TooltipProvider>
    </Section>
  );
}
