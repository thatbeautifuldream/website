import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { TSubmission } from './submissions';

type TDailyChallengeSubmissionsProps = {
  submissions: TSubmission[];
};

export function DailyChallengeSubmissions({
  submissions,
}: TDailyChallengeSubmissionsProps) {
  return (
    <div className="flex flex-col gap-4">
      {submissions.map((submission, index) => (
        <Section
          className="flex w-full flex-col"
          delay={0.1 + 0.01 * index}
          key={submission.id}
        >
          <div className="relative h-auto max-h-[340px] overflow-hidden rounded-[12px] border border-border p-2">
            <div className="absolute top-4 left-4 z-10">
              <Badge className="px-1.5 text-[10px]" variant="secondary">
                {submission.title}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <Badge className="px-1.5 text-[10px]" variant="secondary">
                Day {index + 1}/7
              </Badge>
            </div>
            <Button
              asChild
              className="absolute right-4 bottom-4 z-10 h-5 gap-1 px-1.5 text-[10px] hover:text-brand"
              size="sm"
              variant="secondary"
            >
              <Link href={`/ixd/${submission.slug}`}>
                <ExternalLink className="size-3" />
                <span>View</span>
              </Link>
            </Button>
            <div className="flex h-64 w-full items-center justify-center rounded-[8px] bg-primary-foreground transition-opacity duration-300">
              {submission.component}
            </div>
          </div>
        </Section>
      ))}
    </div>
  );
}
