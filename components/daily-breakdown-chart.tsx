"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Activity } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

type TWakatimeDay = {
    range: {
        text: string;
        date: string;
        timezone: string;
    };
    grand_total: {
        text: string;
        total_seconds: number;
    };
};

type TDailyBreakdownChartProps = {
    data: TWakatimeDay[];
};

const chartConfig = {
    codingTime: {
        label: "Coding Time",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export function DailyBreakdownChart({ data }: TDailyBreakdownChartProps) {
    // Transform data for the chart
    const chartData = data.map((day) => {
        const date = new Date(day.range.date);
        return {
            date: date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            }),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
            codingTime: Math.round(day.grand_total.total_seconds / 3600 * 100) / 100, // Convert to hours
            originalData: day,
        };
    });

    // Calculate total hours for display
    const totalHours = chartData.reduce((sum, item) => sum + item.codingTime, 0);
    const averageHours = totalHours / chartData.length;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Daily Coding Activity
                </CardTitle>
                <CardDescription>
                    From the last {data.length} days
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: -28,
                            right: 12,
                            top: 12,
                            bottom: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="weekday"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `${value}h`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={({ active, payload, label }) => {
                                if (!active || !payload?.length) return null;

                                const data = payload[0];
                                const originalData = data.payload.originalData;

                                return (
                                    <div className="border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                                        <div className="font-medium">{originalData.range.text}</div>
                                        <div className="grid gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: "var(--chart-1)" }} />
                                                <span className="text-muted-foreground">Coding Time</span>
                                                <span className="text-foreground font-mono font-medium tabular-nums ml-auto">
                                                    ({originalData.grand_total.text})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        <Line
                            dataKey="codingTime"
                            type="bump"
                            stroke="var(--chart-1)"
                            dot={false}
                            strokeWidth={2}
                            filter="url(#rainbow-line-glow)"
                        />
                        <defs>
                            <filter
                                id="rainbow-line-glow"
                                x="-20%"
                                y="-20%"
                                width="140%"
                                height="140%"
                            >
                                <feGaussianBlur stdDeviation="10" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
} 