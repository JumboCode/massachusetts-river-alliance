/***************************************************************
 *
 *                src/app/review/cards/page.tsx
 *
 *         Author: Grant and Tycho
 *           Date: 10/22/2026
 *
 *        Summary: Submission cards grouped by river
 *
 **************************************************************/

"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Status } from "@/lib/arcgis/schemas";
import { SITES } from "@/lib/sites";

const SUBMISSIONS: {
    id: number;
    siteId: string;
    gageHeight: number;
    monitorName: string;
    time: string;
    photos: number;
    status: Status;
}[] = [
    {
        id: 1,
        siteId: "charles",
        gageHeight: 4.82,
        monitorName: "Zander Barba",
        time: "Today, 10:42 AM",
        photos: 1,
        status: "pending",
    },
    {
        id: 2,
        siteId: "charles",
        gageHeight: 4.76,
        monitorName: "Maria Lopez",
        time: "Yesterday, 4:15 PM",
        photos: 2,
        status: "pending",
    },
    {
        id: 3,
        siteId: "nashua",
        gageHeight: 3.21,
        monitorName: "John Smith",
        time: "Today, 9:05 AM",
        photos: 1,
        status: "pending",
    },
    {
        id: 4,
        siteId: "nashua",
        gageHeight: 3.05,
        monitorName: "Sam Chen",
        time: "Oct 14, 8:30 AM",
        photos: 0,
        status: "approved",
    },
    {
        id: 5,
        siteId: "mystic",
        gageHeight: 2.4,
        monitorName: "Maria Lopez",
        time: "Oct 12, 11:20 AM",
        photos: 1,
        status: "rejected",
    },
];

export default function SubmissionCardsPage() {
    const [selected, setSelected] = useState<Set<number>>(new Set());
    const toggle = (id: number) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };
    return (
        <div className="flex w-full max-w-125 flex-col gap-4 px-6 py-5">
            <h1 className="text-heading text-foreground">Submission review</h1>
            <div className="flex flex-col gap-4">
                {SITES.map((site) => {
                    const cards = SUBMISSIONS.filter(
                        (s) => s.siteId === site.id,
                    );
                    if (cards.length === 0) return null;
                    return (
                        <div key={site.id} className="flex flex-col gap-2">
                            <h2 className="text-label text-label-foreground">
                                {site.name.toUpperCase()}
                            </h2>

                            {cards.map((s) => {
                                const isChecked = selected.has(s.id);
                                return (
                                    <label
                                        key={s.id}
                                        className={`flex cursor-pointer items-center gap-2.5 rounded-control border border-border px-3 py-2.5 transition-colors ${
                                            isChecked ? "bg-muted" : "bg-card"
                                        }`}
                                    >
                                        <Checkbox
                                            checked={isChecked}
                                            onCheckedChange={() => toggle(s.id)}
                                            aria-label={`Select ${s.gageHeight.toFixed(2)} ft reading by ${s.monitorName}`}
                                        />
                                        <div className="flex min-w-0 flex-col">
                                            <span className="text-meta font-semibold text-foreground">
                                                {s.gageHeight.toFixed(2)} ft
                                            </span>
                                            <span className="text-meta text-muted-foreground">
                                                {s.monitorName} | {s.time} |{" "}
                                                {s.photos}{" "}
                                                {s.photos === 1
                                                    ? "photo"
                                                    : "photos"}
                                            </span>
                                        </div>
                                        <div className="ml-auto shrink-0">
                                            <StatusBadge status={s.status} />
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
