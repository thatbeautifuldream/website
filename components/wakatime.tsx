'use client';

import { ActivityIcon, CodeIcon, MonitorIcon, PaletteIcon, TerminalIcon } from "lucide-react";

import { Section } from '@/components/section';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { WakatimeCodingActivity } from './wakatime-coding-activity';
import { WakatimeLanguages } from './wakatime-languages';
import { WakatimeEditors } from './wakatime-editors';
import { WakatimeOperatingSystem } from './wakatime-operating-system';
import { WakatimeCategories } from './wakatime-categories';

export function Wakatime() {
    return (
        <Section delay={0.05}>
            <Tabs defaultValue="coding-activity">
                <ScrollArea>
                    <TabsList className="mb-3 gap-1 bg-transparent w-auto">
                        <TabsTrigger
                            value="coding-activity"
                            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-lg data-[state=active]:shadow-none data-[state=active]:border whitespace-nowrap flex-none"
                        >
                            <ActivityIcon
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            Coding Activity
                        </TabsTrigger>
                        <TabsTrigger
                            value="languages"
                            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-lg data-[state=active]:shadow-none data-[state=active]:border whitespace-nowrap flex-none"
                        >
                            <CodeIcon
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            Languages
                        </TabsTrigger>
                        <TabsTrigger
                            value="editors"
                            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-lg data-[state=active]:shadow-none data-[state=active]:border whitespace-nowrap flex-none"
                        >
                            <TerminalIcon
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            Editors
                        </TabsTrigger>
                        <TabsTrigger
                            value="operating-systems"
                            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-lg data-[state=active]:shadow-none data-[state=active]:border whitespace-nowrap flex-none"
                        >
                            <MonitorIcon
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            Operating Systems
                        </TabsTrigger>
                        <TabsTrigger
                            value="categories"
                            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-lg data-[state=active]:shadow-none data-[state=active]:border whitespace-nowrap flex-none"
                        >
                            <PaletteIcon
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            Categories
                        </TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <TabsContent value="coding-activity">
                    <WakatimeCodingActivity />
                </TabsContent>
                <TabsContent value="languages">
                    <WakatimeLanguages />
                </TabsContent>
                <TabsContent value="editors">
                    <WakatimeEditors />
                </TabsContent>
                <TabsContent value="operating-systems">
                    <WakatimeOperatingSystem />
                </TabsContent>
                <TabsContent value="categories">
                    <WakatimeCategories />
                </TabsContent>
            </Tabs>
        </Section>
    );
};