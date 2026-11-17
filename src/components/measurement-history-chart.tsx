/***************************************************************
 *
 *                src/components/measurement-history-chart.tsx
 *
 *         Author: Will and Bethiah
 *           Date: 11/1/2026
 *
 *        Summary: Line chart of a station's gage height readings over time
 *
 **************************************************************/
"use client";
import type { PublicReading } from "@/lib/arcgis/schemas";
import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceDot,
    XAxis,
    YAxis,
} from "recharts";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { formatMassTime, TIME_ZONE } from "@/lib/time";

export type ChartReading = Pick<
    PublicReading,
    "id" | "gageHeightFt" | "observedAt"
>;

// Keyed by the data key, so ChartContainer defines --color-ft.
const chartConfig = {
    ft: { label: "Gage height", color: "var(--chart-1)" },
} satisfies ChartConfig;

const dayFormat = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    month: "short",
    day: "numeric",
});

export function MeasurementHistoryChart({
    readings,
}: {
    readings: ChartReading[];
}) {
    if (readings.length === 0) {
        return (
            <p className="text-meta text-muted-foreground">No readings yet</p>
        );
    }

    // Oldest first, so the line runs left to right in time.
    const data = readings
        .map((r) => ({ t: r.observedAt.getTime(), ft: r.gageHeightFt }))
        .sort((a, b) => a.t - b.t);
    const latest = data[data.length - 1];

    return (
        <ChartContainer config={chartConfig}>
            <LineChart data={data} margin={{ right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="t"
                    type="number"
                    scale="time"
                    domain={["dataMin", "dataMax"]}
                    tickFormatter={(t: number) => dayFormat.format(t)}
                    tickLine={false}
                />
                <YAxis
                    domain={["auto", "auto"]}
                    tickFormatter={(v: number) => `${v.toFixed(2)} ft`}
                    tickLine={false}
                    axisLine={false}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            hideIndicator
                            labelFormatter={(_, payload) =>
                                formatMassTime(new Date(payload[0]?.payload.t))
                            }
                            formatter={(ft) => (
                                <span className="text-section">
                                    {Number(ft).toFixed(2)} ft
                                </span>
                            )}
                        />
                    }
                />
                <Line
                    dataKey="ft"
                    stroke="var(--color-ft)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                        r: 6,
                        fill: "var(--color-ft)",
                        stroke: "var(--card)",
                        strokeWidth: 2,
                    }}
                />
                {/* Marks the current level. */}
                <ReferenceDot
                    x={latest.t}
                    y={latest.ft}
                    r={4}
                    fill="var(--color-ft)"
                    stroke="var(--card)"
                    strokeWidth={2}
                />
            </LineChart>
        </ChartContainer>
    );
}
