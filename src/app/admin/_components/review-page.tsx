/***************************************************************
 *
 *        src/app/admin/_components/review-page.tsx
 *
 *         Author: Zander, Aray
 *         Edited: Tycho
 *           Date: 11/10/2026
 *
 *        Summary: Review page layout and state: status tab, filters,
 *                 expanded row and selection
 *
 **************************************************************/

"use client";

// The Sprint 6 tickets use the state and handlers below. Remove this once
// they've all merged.
/* eslint-disable @typescript-eslint/no-unused-vars -- Slots for tickets in progress. */

import { useState } from "react";
import type { Reading, Status } from "@/lib/arcgis/schemas";
import { ReadingCard } from "./reading-card";
import { ReviewFilters } from "./review-filters";
import { dateToMassTime } from "@/lib/time";
export type Filters = {
    siteId: string;
    date: "today" | "week" | "month" | "all";
    sort: "newest" | "oldest";
};

export const DEFAULT_FILTERS: Filters = {
    siteId: "all",
    date: "all",
    sort: "newest",
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function ReviewPage({
    readings: initialReadings,
    now,
}: {
    readings: Reading[];
    now: Date;
}) {
    const [readings, setReadings] = useState(initialReadings);
    const [status, setStatus] = useState<Status | "all">("pending");
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    function updateStatus(ids: string[], next: Status) {
        setReadings((prev) =>
            prev.map((r) => (ids.includes(r.id) ? { ...r, status: next } : r)),
        );
    }

    // Side effects of switching tabs or filters go in these handlers, not in
    // a useEffect.
    function changeTab(next: Status | "all") {
        setStatus(next);
    }

    function changeFilters(next: Filters) {
        setFilters(next);
    }

    const visible = readings.filter(
        (r) => status === "all" || r.status === status,
    );

    const byLocation = visible.filter(
        (r) => filters.siteId === "all" || r.siteId === filters.siteId,
    );

    const byDate = byLocation.filter((r) => {
        if (filters.date === "all") return true;

        if (filters.date === "today") {
            return (
                dateToMassTime(r.observedAt).date === dateToMassTime(now).date
            );
        }
        const days = filters.date === "week" ? 7 : 30;
        return now.getTime() - r.observedAt.getTime() <= days * MS_PER_DAY;
    });

    return (
        <main className="flex min-h-0 flex-1">
            {/* Sidebar */}
            <aside className="w-51 shrink-0 border-r border-border"></aside>

            <section className="flex w-148.5 shrink-0 flex-col border-r border-border">
                {/* Select all and filters */}
                <div className="border-b border-border px-6 py-4">
                    <ReviewFilters filters={filters} onChange={changeFilters} />
                </div>
                <ul className="flex flex-1 flex-col">
                    {byDate.map((reading) => (
                        <li key={reading.id}>
                            <ReadingCard
                                reading={reading}
                                expanded={expandedId === reading.id}
                                onToggleExpand={() =>
                                    setExpandedId(
                                        expandedId === reading.id
                                            ? null
                                            : reading.id,
                                    )
                                }
                                checked={selectedIds.has(reading.id)}
                                onCheckedChange={() => {}}
                                onStatusChange={(next) =>
                                    updateStatus([reading.id], next)
                                }
                            />
                        </li>
                    ))}
                </ul>

                {/* Bulk action bar */}
            </section>

            {/* Map */}
            <section className="flex-1"></section>
        </main>
    );
}
/* eslint-enable @typescript-eslint/no-unused-vars -- End of the slots. */
