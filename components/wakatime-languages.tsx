'use client';

import { useQuery } from '@tanstack/react-query';
import { CodeIcon } from 'lucide-react';
import Image from 'next/image';
import { Section } from '@/components/section';
import { languageSvgLinks } from '@/lib/data/language-svg-links';
import { orpc } from '@/lib/orpc';

function LanguageSvgIcon({ name }: { name: string }) {
  const match = languageSvgLinks.find(
    (entry) => entry.title.toLowerCase() === name.toLowerCase()
  );
  const route = match?.route as
    | string
    | { light: string; dark: string }
    | undefined;

  if (!route) {
    return (
      <CodeIcon
        aria-hidden="true"
        className="text-foreground opacity-80"
        size={16}
      />
    );
  }

  if (typeof route === 'string') {
    return (
      <Image
        alt={`${name} logo`}
        className="inline-block"
        height={16}
        src={route}
        unoptimized
        width={16}
      />
    );
  }

  return (
    <>
      <Image
        alt={`${name} logo`}
        className="inline-block dark:hidden"
        height={16}
        src={route.light}
        unoptimized
        width={16}
      />
      <Image
        alt={`${name} logo`}
        className="hidden dark:inline-block"
        height={16}
        src={route.dark}
        unoptimized
        width={16}
      />
    </>
  );
}

export function WakatimeLanguages() {
  const languagesQuery = useQuery(
    orpc.wakatime.languages.queryOptions({
      context: { cache: true },
    })
  );

  if (languagesQuery.isPending) {
    return (
      <Section>
        <div className="space-y-4">
          <div className="p-6">
            <div className="flex items-center justify-center py-8">
              <div className="space-y-3 text-center">
                <p className="text-foreground-lighter text-md">
                  <span className="animate-pulse">
                    Analyzing Milind's language preferences...
                  </span>
                </p>
                <p className="text-foreground-lighter/60 text-xs">
                  Counting semicolons and curly braces
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (languagesQuery.error) {
    return (
      <Section>
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border-destructive bg-destructive/10 p-4 transition-all hover:bg-destructive/20">
            <div className="flex items-center gap-2 text-destructive text-sm">
              <span>
                Oops! My language stats seem to have gone on a chai break.
              </span>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  const data = languagesQuery.data?.data;
  if (!data || data.length === 0) {
    return null;
  }

  const totalPercent = data.reduce((sum, lang) => sum + lang.percent, 0);
  const topLanguage = data[0];

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Section delay={0.1}>
          <div className="flex flex-col space-y-2 rounded-lg border bg-secondary p-4 shadow-sm">
            <h3 className="font-medium text-foreground text-sm">
              Top Language
            </h3>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-2xl text-foreground">
                {topLanguage.name}
              </p>
            </div>
            <p className="text-foreground-lighter text-sm">
              {topLanguage.percent.toFixed(1)}%
            </p>
          </div>
        </Section>
        <Section delay={0.2}>
          <div className="flex flex-col space-y-2 rounded-lg border bg-secondary p-4 shadow-sm">
            <h3 className="font-medium text-foreground text-sm">
              Languages Used
            </h3>
            <p className="font-semibold text-2xl text-foreground">
              {data.length}
            </p>
            <p className="text-foreground-lighter text-sm">
              Different languages
            </p>
          </div>
        </Section>
        <Section delay={0.3}>
          <div className="flex flex-col space-y-2 rounded-lg border bg-secondary p-4 shadow-sm">
            <h3 className="font-medium text-foreground text-sm">Coverage</h3>
            <p className="font-semibold text-2xl text-foreground">
              {totalPercent.toFixed(1)}%
            </p>
            <p className="text-foreground-lighter text-sm">Of tracked time</p>
          </div>
        </Section>
      </div>
      <div className="space-y-2">
        {data.map((language, index) => (
          <Section delay={0.35 + index * 0.06} key={language.name}>
            <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent/5">
              <div className="flex items-center gap-3">
                <LanguageSvgIcon name={language.name} />
                <span className="font-medium text-foreground">
                  {language.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-28 rounded-full bg-secondary sm:w-40 md:w-56 lg:w-72">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${language.percent}%`,
                      backgroundColor: language.color,
                    }}
                  />
                </div>
                <span className="min-w-[3rem] text-right text-foreground-lighter text-sm">
                  {language.percent.toFixed(1)}%
                </span>
              </div>
            </div>
          </Section>
        ))}
      </div>
    </div>
  );
}
