/***************************************************************
 *
 *                src\lib\arcgis\readings.ts
 *
 *         Author: Caitlyn, Tanish
 *           Date: 11/10/2026
 *
 *        Summary: Functions for retrieving and filtering readings
 *
 **************************************************************/

import type { PublicReading, Reading } from "./schemas";

const SAMPLE: Reading[] = [
    {
        id: "sample-id",
        siteId: "mystic",
        status: "approved",
        gageHeightFt: 10.5,
        observedAt: new Date("2026-09-27T14:42:00Z"),
        monitorName: "Sample Monitor",
        weather: "Sunny",
        conditions: "Clear",
        notes: "Sample notes",
        photoUrl: "/logo-waves.png",
    },
    {
        id: "sample-id-2",
        siteId: "charles",
        status: "pending",
        gageHeightFt: 12.3,
        observedAt: new Date("2026-08-27T14:42:00Z"),
        monitorName: "Sample Monitor 2",
        weather: "Cloudy",
        conditions: "Overcast",
        notes: "Sample notes 2",
        photoUrl: "/logo-waves.png",
    },
    {
        id: "sample-id-3",
        siteId: "nashua",
        status: "pending",
        gageHeightFt: 20.3,
        observedAt: new Date("2026-10-28T14:42:00Z"),
        monitorName: "Sample Monitor 3",
        weather: "Sunny",
        conditions: "Overcast",
        notes: "Sample notes 3",
        photoUrl: "/logo-waves.png",
    },
    {
        id: "sample-id-4",
        siteId: "neponset",
        status: "approved",
        gageHeightFt: 4.7,
        observedAt: new Date("2026-10-10T14:42:00Z"),
        monitorName: "Sample Monitor 4",
        weather: "Cloudy",
        conditions: "Overcast",
        notes: "Sample notes 4",
        photoUrl: "/logo-waves.png",
    },
    {
        id: "sample-id-5",
        siteId: "taunton",
        status: "approved",
        gageHeightFt: 6,
        observedAt: new Date("2026-10-11T14:42:00Z"),
        monitorName: "Sample Monitor 5",
        weather: "Sunny",
        conditions: "Overcast",
        notes: "Sample notes 5",
        photoUrl: "/logo-waves.png",
    },
    {
        id: "sample-id-6",
        siteId: "charles",
        status: "pending",
        gageHeightFt: 72,
        observedAt: new Date("2026-07-30T14:42:00Z"),
        monitorName: "Sample Monitor 6",
        weather: "Cloudy",
        conditions: "Overcast",
        notes: "Sample notes 6",
        photoUrl: "/logo-waves.png",
    },
    {
        id: "sample-id-7",
        siteId: "mystic",
        status: "rejected",
        gageHeightFt: 12.4,
        observedAt: new Date("2026-04-05T14:42:00Z"),
        monitorName: "Sample Monitor 7",
        weather: "Sunny",
        conditions: "Overcast",
        notes: "Sample notes 7",
        photoUrl: "/logo-waves.png",
    },
    {
        id: "sample-id-8",
        siteId: "nashua",
        status: "approved",
        gageHeightFt: 10.12,
        observedAt: new Date("2026-04-10T14:42:00Z"),
        monitorName: "Sample Monitor 8",
        weather: "Cloudy",
        conditions: "Overcast",
        notes: "Sample notes 8",
        photoUrl: "/logo-waves.png",
    },
];

export function getReadings(): Reading[] {
    const sortedReadings = [...SAMPLE].sort(
        (a, b) => b.observedAt.getTime() - a.observedAt.getTime(),
    );
    return sortedReadings;
}

export function getApprovedReadings(siteId?: string): PublicReading[] {
    const approvedReadings = getReadings().filter(
        (reading) =>
            reading.status === "approved" &&
            (!siteId || reading.siteId === siteId),
    );
    return approvedReadings.map(
        ({ id, siteId, gageHeightFt, observedAt, weather, conditions }) => ({
            id,
            siteId,
            gageHeightFt,
            observedAt,
            weather,
            conditions,
        }),
    );
}
