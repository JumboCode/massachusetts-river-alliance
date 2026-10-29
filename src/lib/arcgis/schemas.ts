/***************************************************************
 *
 *                src/lib/arcgis/schemas.ts
 *
 *         Author: Zander
 *           Date: 10/28/2026
 *
 *        Summary: Types for readings
 *
 **************************************************************/

export const STATUSES = ["pending", "approved", "rejected"] as const;
export type Status = (typeof STATUSES)[number];

export type Reading = {
    id: string;
    siteId: string;
    status: Status;
    gageHeightFt: number;
    observedAt: Date;
    // Personal data. Never logged, never shown to the public.
    monitorName: string;
    weather: string | null;
    conditions: string | null;
    notes: string | null;
    photoUrl: string | null;
};

// Fields safe to show the public.
export type PublicReading = Pick<
    Reading,
    "id" | "siteId" | "gageHeightFt" | "observedAt" | "weather" | "conditions"
>;
