'use client';

import { useQuery } from '@tanstack/react-query';
import { Section } from '@/components/section';
import { orpc } from '@/lib/orpc';

export function WakatimeEditors() {
    const editorsQuery = useQuery(orpc.wakatime.editors.queryOptions({
        context: { cache: true },
    }));

    if (editorsQuery.isPending) {
        return (
            <Section>
                <div className="space-y-4">
                    <div className="p-6">
                        <div className="flex items-center justify-center py-8">
                            <div className="text-center space-y-3">
                                <p className="text-foreground-lighter text-md">
                                    <span className="animate-pulse">Analyzing Milind's editor preferences...</span>
                                </p>
                                <p className="text-foreground-lighter/60 text-xs">
                                    Counting keyboard shortcuts and extensions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        );
    }

    if (editorsQuery.error) {
        return (
            <Section>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-lg border-destructive bg-destructive/10 p-4 transition-all hover:bg-destructive/20">
                        <div className="flex items-center gap-2 text-destructive text-sm">
                            <span>Oops! My editor stats seem to have gone on a chai break.</span>
                        </div>
                    </div>
                </div>
            </Section>
        );
    }

    const data = editorsQuery.data?.data;
    if (!data || data.length === 0) {
        return null;
    }

    const totalPercent = data.reduce((sum, editor) => sum + editor.percent, 0);
    const topEditor = data[0];

    return (
        <div className="flex flex-col space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Section delay={0.1}>
                    <div className="rounded-lg border shadow-sm bg-secondary p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Favorite Editor</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-semibold text-foreground">{topEditor.name}</p>
                        </div>
                        <p className="text-sm text-foreground-lighter">{topEditor.percent.toFixed(1)}%</p>
                    </div>
                </Section>
                <Section delay={0.2}>
                    <div className="rounded-lg border shadow-sm bg-secondary p-4 flex flex-col space-y-2">
                        <h3 className="font-medium text-foreground text-sm">Editors Used</h3>
                        <p className="text-2xl font-semibold text-foreground">{data.length}</p>
                        <p className="text-sm text-foreground-lighter">Different editors</p>
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
                {data.map((editor, index) => (
                    <Section delay={0.35 + index * 0.06} key={editor.name}>
                        <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent/5">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: editor.color }}
                                />
                                <span className="font-medium text-foreground">{editor.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-secondary rounded-full h-2 w-28 sm:w-40 md:w-56 lg:w-72">
                                    <div
                                        className="h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${editor.percent}%`,
                                            backgroundColor: editor.color,
                                        }}
                                    />
                                </div>
                                <span className="text-sm text-foreground-lighter min-w-[3rem] text-right">
                                    {editor.percent.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </Section>
                ))}
            </div>
        </div>
    );
}