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

export const STATUSES = ["pending", "approved", "rejected", "hidden"] as const;
export type Status = (typeof STATUSES)[number];

export type Reading = {
    id: string;
    siteId: string;
    status: Status;
    source: "web" | "survey123" | "state" | "hobo";
    gageHeightFt: number;
    observedAt: Date;
    submittedGageHeightFt: number;
    submittedObservedAt: Date;
    // Personal data. Never logged, never shown to the public.
    monitorName: string;
    monitorEmail: string;
    weather: string | null;
    conditions: string | null;
    notes: string | null;
    photoUrl: string | null;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    rejectReason: string | null;
    createdAt: Date;
};

// Fields safe to show the public.
export type PublicReading = Pick<
    Reading,
    "id" | "siteId" | "gageHeightFt" | "observedAt" | "weather" | "conditions"
>;
