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

import { z } from "zod";

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

export const REQUIRED = "This field is required";
export const INVALID_EMAIL = "Please enter a valid email address";

export const emailSchema = z
    .string({ error: REQUIRED })
    .trim()
    .min(1, REQUIRED)
    .pipe(z.email(INVALID_EMAIL));

// 1.15 * 100 is 114.99999999999999, so compare with a small tolerance.
const hasAtMostTwoDecimals = (n: number) =>
    Math.abs(n * 100 - Math.round(n * 100)) < 1e-6;

export const submissionSchema = z.object({
    siteId: z.string({ error: REQUIRED }).trim().min(1, REQUIRED),
    gageHeightFt: z
        .number({ error: REQUIRED })
        .min(-5, "Gage height must be between -5 and 50 ft")
        .max(50, "Gage height must be between -5 and 50 ft")
        .refine(hasAtMostTwoDecimals, "Use at most 2 decimal places"),
    date: z.string({ error: REQUIRED }).trim().min(1, REQUIRED),
    time: z.string({ error: REQUIRED }).trim().min(1, REQUIRED),
    monitorName: z.string({ error: REQUIRED }).trim().min(1, REQUIRED),
    monitorEmail: emailSchema,
    weather: z.string().optional(),
    conditions: z.string().optional(),
    notes: z.string().optional(),
});

export type Submission = z.infer<typeof submissionSchema>;
