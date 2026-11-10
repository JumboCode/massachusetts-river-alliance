/***************************************************************
 *
 *                src/app/readings/page.tsx
 *
 *         Author: Tycho & Vienna
 *           Date: 11/1/2026
 *
 *        Summary: Test page for the approved readings table
 *
 **************************************************************/
import {
    ApprovedReadingsTable,
    type Reading,
} from "@/components/approved-readings-table";

const readings: Reading[] = [
    {
        id: "r1",
        observedAt: new Date("2026-09-23T19:20:00Z"),
        gageHeightFt: 4.76,
    },
    {
        id: "r2",
        observedAt: new Date("2026-09-23T07:05:00Z"),
        gageHeightFt: 3.92,
    },
    {
        id: "r3",
        observedAt: new Date("2026-09-24T02:40:00Z"),
        gageHeightFt: 5.31,
    },
    {
        id: "r4",
        observedAt: new Date("2026-09-22T23:55:00Z"),
        gageHeightFt: 4.18,
    },
    {
        id: "r5",
        observedAt: new Date("2026-09-23T13:30:00Z"),
        gageHeightFt: 4.44,
    },
];

export default function Page() {
    return (
        <>
            <ApprovedReadingsTable readings={readings} />
            <ApprovedReadingsTable readings={[]} />
        </>
    );
}
