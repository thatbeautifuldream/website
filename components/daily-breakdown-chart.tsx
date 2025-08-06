"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
    ChartTooltip
} from "@/components/ui/chart";
import { Badge } from "./ui/badge";

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

// Utility functions for calculations
const convertSecondsToHours = (seconds: number): number => {
    return Math.round(seconds / 3600 * 100) / 100;
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};

const formatWeekday = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const calculatePercentageChange = (data: TWakatimeDay[]) => {
    if (data.length < 2) return null;

    const today = data[data.length - 1]; // Last element (most recent day)
    const yesterday = data[data.length - 2]; // Second to last element

    const todaySeconds = today.grand_total.total_seconds;
    const yesterdaySeconds = yesterday.grand_total.total_seconds;

    // If both days have no coding time, don't show any change
    if (todaySeconds === 0 && yesterdaySeconds === 0) {
        return null;
    }

    // If yesterday had no coding time and today has some, show increase
    if (yesterdaySeconds === 0 && todaySeconds > 0) {
        return { value: 100, isIncrease: true };
    }

    // If today has no coding time and yesterday had some, show decrease
    if (todaySeconds === 0 && yesterdaySeconds > 0) {
        return { value: 100, isIncrease: false };
    }

    // Calculate percentage change
    const change = ((todaySeconds - yesterdaySeconds) / yesterdaySeconds) * 100;
    return {
        value: Math.abs(Math.round(change * 10) / 10), // Round to 1 decimal place
        isIncrease: change > 0
    };
};

export function DailyBreakdownChart({ data }: TDailyBreakdownChartProps) {
    // Transform data for the chart
    const chartData = data.map((day) => ({
        date: formatDate(day.range.date),
        weekday: formatWeekday(day.range.date),
        codingTime: convertSecondsToHours(day.grand_total.total_seconds),
        originalData: day,
    }));

    // Calculate statistics
    const totalHours = chartData.reduce((sum, item) => sum + item.codingTime, 0);
    const averageHours = totalHours / chartData.length;

    // Calculate percentage change
    const percentageChange = calculatePercentageChange(data);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Daily Coding Activity
                    {percentageChange && (
                        <Badge
                            variant="outline"
                            className={`ml-2 border-none ${percentageChange.isIncrease
                                ? "text-success bg-success/10 border-success/20"
                                : "text-destructive bg-destructive/10 border-destructive/20"
                                }`}
                        >
                            {percentageChange.isIncrease ? (
                                <TrendingUp className="h-4 w-4" />
                            ) : (
                                <TrendingDown className="h-4 w-4" />
                            )}
                            <span>{percentageChange.value}%</span>
                        </Badge>
                    )}
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