'use client';

import { useQuery } from '@tanstack/react-query';
import { Section } from '@/components/section';
import { orpc } from '@/lib/orpc';
import Image from 'next/image';
import { CodeIcon } from 'lucide-react';
import { languageSvgLinks } from '@/lib/data/language-svg-links';

function LanguageSvgIcon({ name }: { name: string }) {
    const match = languageSvgLinks.find((entry) => entry.title.toLowerCase() === name.toLowerCase());
    const route = match?.route as string | { light: string; dark: string } | undefined;

    if (!route) {
        return (
            <CodeIcon
                className="opacity-80 text-foreground"
                size={16}
                aria-hidden="true"
            />
        );
    }

    if (typeof route === 'string') {
        return (
            <Image
                src={route}
                alt={`${name} logo`}
                width={16}
                height={16}
                className="inline-block"
                unoptimized
            />
        );
    }

    return (
        <>
            <Image
                src={route.light}
                alt={`${name} logo`}
                width={16}
                height={16}
                className="inline-block dark:hidden"
                unoptimized
            />
            <Image
                src={route.dark}
                alt={`${name} logo`}
                width={16}
                height={16}
                className="hidden dark:inline-block"
                unoptimized
            />
        </>
    );
}

export function WakatimeLanguages() {
    const languagesQuery = useQuery(orpc.wakatime.languages.queryOptions({
        context: { cache: true },
    }));

    if (languagesQuery.isPending) {
        return (
            <Section>
                <div className="space-y-4">
                    <div className="p-6">
                        <div className="flex items-center justify-center py-8">
                            <div className="text-center space-y-3">
                                <p className="text-foreground-lighter text-md">
                                    <span className="animate-pulse">Analyzing Milind's language preferences...</span>
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
                            <span>Oops! My language stats seem to have gone on a chai break.</span>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Section delay={0.1}>
                    <div className="rounded-lg border shadow-sm bg-secondary p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Top Language</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-semibold text-foreground">{topLanguage.name}</p>
                        </div>
                        <p className="text-sm text-foreground-lighter">{topLanguage.percent.toFixed(1)}%</p>
                    </div>
                </Section>
                <Section delay={0.2}>
                    <div className="rounded-lg border shadow-sm bg-secondary p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Languages Used</h3>
                        <p className="text-2xl font-semibold text-foreground">{data.length}</p>
                        <p className="text-sm text-foreground-lighter">Different languages</p>
                    </div>
                </Section>
                <Section delay={0.3}>
                    <div className="rounded-lg border shadow-sm bg-secondary p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Coverage</h3>
                        <p className="text-2xl font-semibold text-foreground">{totalPercent.toFixed(1)}%</p>
                        <p className="text-sm text-foreground-lighter">Of tracked time</p>
                    </div>
                </Section>
            </div>
            <div className="space-y-2">
                {data.map((language, index) => (
                    <Section delay={0.35 + index * 0.06} key={language.name}>
                        <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent/5">
                            <div className="flex items-center gap-3">
                                <LanguageSvgIcon name={language.name} />
                                <span className="font-medium text-foreground">{language.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-secondary rounded-full h-2 w-28 sm:w-40 md:w-56 lg:w-72">
                                    <div
                                        className="h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${language.percent}%`,
                                            backgroundColor: language.color,
                                        }}
                                    />
                                </div>
                                <span className="text-sm text-foreground-lighter min-w-[3rem] text-right">
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