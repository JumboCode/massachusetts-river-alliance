/***************************************************************
 *
 *                src/app/chart-test/page.tsx
 *
 *         Author: Will, Bethiah
 *           Date: 10/27/2026
 *
 *        Summary: Volunteer form for submitting a gage height measurement
 *
 **************************************************************/

import {
    ChartReading,
    MeasurementHistoryCard,
} from "@/components/measurement-history-chart";

const READINGS: ChartReading[] = [
    {
        id: "r1",
        gageHeightFt: 3.92,
        observedAt: new Date("2026-09-28T13:00:00Z"),
    },
    {
        id: "r2",
        gageHeightFt: 4.01,
        observedAt: new Date("2026-10-01T14:15:00Z"),
    },
    {
        id: "r3",
        gageHeightFt: 3.97,
        observedAt: new Date("2026-10-07T12:30:00Z"),
    },
    {
        id: "r4",
        gageHeightFt: 4.18,
        observedAt: new Date("2026-10-10T15:00:00Z"),
    },
    {
        id: "r5",
        gageHeightFt: 4.29,
        observedAt: new Date("2026-10-14T16:10:00Z"),
    },
    {
        id: "r6",
        gageHeightFt: 4.3,
        observedAt: new Date("2026-10-18T13:45:00Z"),
    },
    {
        id: "r7",
        gageHeightFt: 4.45,
        observedAt: new Date("2026-10-22T14:00:00Z"),
    },
    {
        id: "r8",
        gageHeightFt: 4.65,
        observedAt: new Date("2026-10-25T14:42:00Z"),
    },
];

export default function ChartTestPage() {
    return (
        <MeasurementHistoryCard readings={READINGS}></MeasurementHistoryCard>
    );
}
