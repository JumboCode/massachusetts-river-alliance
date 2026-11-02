/***************************************************************
 *
 *                src/components/measurement-history-chart.tsx
 *
 *         Author: Will and Bethiah
 *           Date: 11/1/2026
 *
 *        Summary: Measurement history card for gauge measurement submissions
 *
 **************************************************************/
"use client";
import type { PublicReading } from "@/lib/arcgis/schemas";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart";
import { formatMassTime, TIME_ZONE } from "@/lib/time";

export type ChartReading = Pick<
    PublicReading,
    "id" | "gageHeightFt" | "observedAt"
>;

export function MeasurementHistoryCard({
    readings,
}: {
    readings: ChartReading[];
}) {
    const conf: ChartConfig = {
        gageHeightFt: {
            label: "Gage height (ft)",
            color: "var(--chart-1)",
        },
    };

    type ChartData = {
        t: number;
        ft: number;
    };

    const data: ChartData[] = readings.map((r) => ({
        t: r.observedAt.getTime(),
        ft: r.gageHeightFt,
    }));

    const formatDate = (t: number) =>
        new Date(t).toLocaleDateString("en-US", {
            timeZone: TIME_ZONE,
            month: "short",
            day: "numeric",
        });
    return readings && readings.length > 0 ? (
        <ChartContainer config={conf}>
            <LineChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="t"
                    tickFormatter={formatDate}
                    tickLine={false}
                />
                <YAxis
                    tickFormatter={(v) => `${Number(v).toFixed(1)} ft`}
                    tickLine={false}
                    axisLine={false}
                />
                <ChartTooltip
                    labelFormatter={(t) => formatMassTime(t)}
                    formatter={(ft) => {
                        return ft;
                    }}
                />
                <Line
                    dataKey="ft"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={{
                        r: 4,
                        fill: "var(--color-1)",
                        stroke: "white",
                        strokeWidth: 2,
                    }}
                    activeDot={{
                        r: 6,
                        fill: "var(--color-1)",
                        stroke: "white",
                        strokeWidth: 2,
                    }}
                />
            </LineChart>
        </ChartContainer>
    ) : (
        <p>No readings yet</p>
    );
}
