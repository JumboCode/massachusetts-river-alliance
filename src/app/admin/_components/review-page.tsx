/***************************************************************
 *
 *        src/app/admin/_components/review-page.tsx
 *
 *         Author: Zander, Aray, Will, Grant
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
import { Checkbox } from "@/components/ui/checkbox";
import { ActionBar } from "./bulk-action-bar";
import { Label } from "@/components/ui/label";

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

    function updateStatus(ids: string[], next: Status) {
        setReadings((prev) =>
            prev.map((r) => (ids.includes(r.id) ? { ...r, status: next } : r)),
        );
    }

    // Side effects of switching tabs or filters go in these handlers, not in
    // a useEffect.
    function changeTab(next: Status | "all") {
        setStatus(next);
        setSelectedIds(new Set());
    }

    function changeFilters(next: Filters) {
        setFilters(next);
        setSelectedIds(new Set());
    }

    const visible = readings.filter(
        (r) => status === "all" || r.status === status,
    );
    const checked = visible.filter((r) => selectedIds.has(r.id));

    return (
        <main className="flex min-h-0 flex-1">
            {/* Sidebar */}
            <aside className="w-51 shrink-0 border-r border-border"></aside>

            <section className="flex w-148.5 shrink-0 flex-col border-r border-border">
                {/* Select all and filters */}
                <div className="flex h-16 shrink-0 items-center gap-4 border-b border-border pr-2 pl-6">
                    <Checkbox
                        checked={
                            visible.length > 0 &&
                            visible.every((r) => selectedIds.has(r.id))
                                ? true
                                : visible.some((r) => selectedIds.has(r.id))
                                  ? "indeterminate"
                                  : false
                        }
                        onCheckedChange={(isChecked) => {
                            setSelectedIds((prevIds) => {
                                const newIds = new Set(prevIds);

                                visible.forEach((r) => {
                                    if (isChecked) {
                                        newIds.add(r.id);
                                    } else {
                                        newIds.delete(r.id);
                                    }
                                });

                                return newIds;
                            });
                        }}
                        id="select-all"
                    />
                    <Label
                        htmlFor="select-all"
                        className="text-body text-muted-foreground"
                    >
                        Select All
                    </Label>
                </div>
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
                                onCheckedChange={() => {
                                    if (selectedIds.has(reading.id)) {
                                        setSelectedIds((prevIds) => {
                                            const newIds = new Set(prevIds);
                                            newIds.delete(reading.id);
                                            return newIds;
                                        });
                                    } else {
                                        setSelectedIds((prevIds) => {
                                            const newIds = new Set(prevIds);
                                            newIds.add(reading.id);
                                            return newIds;
                                        });
                                    }
                                }}
                                onStatusChange={(next) =>
                                    updateStatus([reading.id], next)
                                }
                            />
                        </li>
                    ))}
                </ul>

                {/* Bulk action bar */}
                {checked.length > 0 && (
                    <ActionBar
                        count={checked.length}
                        onClear={() => setSelectedIds(new Set())}
                        onApprove={() => {
                            updateStatus(
                                checked.map((r) => r.id),
                                "approved",
                            );
                            setSelectedIds(new Set());
                        }}
                        onReject={() => {
                            updateStatus(
                                checked.map((r) => r.id),
                                "rejected",
                            );
                            setSelectedIds(new Set());
                        }}
                    />
                )}
            </section>

            {/* Map */}
            <section className="flex-1"></section>
        </main>
    );
}
/* eslint-enable @typescript-eslint/no-unused-vars -- End of the slots. */
