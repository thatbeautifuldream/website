import type { ReactNode } from "react";
import { getCachedContributions } from "@/backend/github/helpers";
import type { TContributionsResponse } from "@/backend/github/types";
import { GitHubContributionGraphClient } from "@/components/github-contribution-graph-client";

type GitHubContributionGraphProps = {
  username?: string;
  year?: "last" | "all" | string;
  format?: "flat" | "nested";
  className?: string;
};

type GitHubContributionGraphRendererProps = {
  contributionsData: TContributionsResponse;
  username: string;
  className?: string;
};

const GitHubContributionGraphFallback = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <div className="flex items-center justify-center py-10 text-muted-foreground text-sm">
      {children}
    </div>
  </div>
);

export function GitHubContributionGraphRenderer({
  contributionsData,
  username,
  className,
}: GitHubContributionGraphRendererProps) {
  if (!contributionsData.contributions.length) {
    return (
      <GitHubContributionGraphFallback className={className}>
        No contributions found
      </GitHubContributionGraphFallback>
    );
  }

  return (
    <GitHubContributionGraphClient
      className={className}
      contributions={contributionsData.contributions}
      total={contributionsData.total}
      username={username}
    />
  );
}

export async function GitHubContributionGraph({
  username = "thatbeautifuldream",
  year = "last",
  format = "flat",
  className,
}: GitHubContributionGraphProps) {
  try {
    const contributionsData = await getCachedContributions({
      username,
      year,
      format,
    });

    return (
      <GitHubContributionGraphRenderer
        className={className}
        contributionsData={contributionsData}
        username={username}
      />
    );
  } catch {
    return (
      <GitHubContributionGraphFallback className={className}>
        GitHub contributions took a coffee break
      </GitHubContributionGraphFallback>
    );
  }
}
