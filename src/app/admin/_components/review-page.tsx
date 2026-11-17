/***************************************************************
 *
 *        src/app/admin/_components/review-page.tsx
 *
 *         Author: Zander, Aray, Tanish, Micah
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
import { ReviewSidebar } from "./review-sidebar";
import { Button } from "@/components/ui/button";

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
    const counts = {
        pending: readings.filter((reading) => reading.status === "pending")
            .length,
        approved: readings.filter((reading) => reading.status === "approved")
            .length,
        rejected: readings.filter((reading) => reading.status === "rejected")
            .length,
        all: readings.length,
    };

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

    return (
        <main className="flex min-h-0 flex-1">
            {/* Sidebar */}
            <aside className="w-51 shrink-0 border-r border-border">
                <ReviewSidebar
                    status={status}
                    counts={counts}
                    onStatusChange={changeTab}
                />
            </aside>

            <section className="flex w-148.5 shrink-0 flex-col border-r border-border">
                {/* Select all and filters */}
                <div className="border-b border-border px-6 py-4"></div>

                <ul className="flex flex-1 flex-col">
                    {visible.map((reading) => (
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
