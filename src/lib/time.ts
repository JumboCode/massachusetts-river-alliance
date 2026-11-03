/***************************************************************
 *
 *                src/lib/time.ts
 *
 *         Author: Zander
 *           Date: 10/26/2026
 *
 *        Summary: Massachusetts-time helpers for observed dates and times
 *
 **************************************************************/

import { TZDate } from "@date-fns/tz";

export const TIME_ZONE = "America/New_York";

// UTC Date -> { date: "2026-10-26", time: "14:30" } in Massachusetts time,
// the format <input type="date"> and <input type="time"> expect.
export function dateToMassTime(value: Date) {
    const local = new TZDate(value.getTime(), TIME_ZONE);
    const pad = (n: number) => String(n).padStart(2, "0");
    return {
        date: `${local.getFullYear()}-${pad(local.getMonth() + 1)}-${pad(local.getDate())}`,
        time: `${pad(local.getHours())}:${pad(local.getMinutes())}`,
    };
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    dateStyle: "medium",
});
const timeFormat = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    timeStyle: "short",
});

// "Oct 26, 2026 • 2:30 PM"
export function formatMassTime(value: Date) {
    return `${dateFormat.format(value)} • ${timeFormat.format(value)}`;
}
