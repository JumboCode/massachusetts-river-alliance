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

import { SITES } from "@/lib/sites";
import { useState } from "react";

const SUBMISSIONS = [
    {
        id: 1,
        siteId: "charles",
        gageHeight: 4.82,
        monitorName: "Zander Barba",
        time: "Today, 10:42 AM",
        photos: 1,
        status: "Pending",
    },
    {
        id: 2,
        siteId: "charles",
        gageHeight: 4.76,
        monitorName: "Maria Lopez",
        time: "Yesterday, 4:15 PM",
        photos: 2,
        status: "Pending",
    },
    {
        id: 3,
        siteId: "nashua",
        gageHeight: 3.21,
        monitorName: "John Smith",
        time: "Today, 9:05 AM",
        photos: 1,
        status: "Pending",
    },
    {
        id: 4,
        siteId: "nashua",
        gageHeight: 3.05,
        monitorName: "Sam Chen",
        time: "Oct 14, 8:30 AM",
        photos: 0,
        status: "Approved",
    },
    {
        id: 5,
        siteId: "mystic",
        gageHeight: 2.4,
        monitorName: "Maria Lopez",
        time: "Oct 12, 11:20 AM",
        photos: 1,
        status: "Rejected",
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
        <div className="w-[500px] self-stretch px-6 py-5 bg-neutral-50 border-r border-zinc-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
            <h1 className="justify-start text-zinc-900 text-xl font-semibold font-['Inter']">
                Submission review
            </h1>
            <div className="grid grid-cols-1 gap-4">
                {SITES.map((site) => {
                    const cards = SUBMISSIONS.filter(
                        (s) => s.siteId === site.id,
                    );
                    if (cards.length === 0) return null;
                    return (
                        <div
                            key={site.id}
                            className="w-[452px] inline-flex flex-col justify-start items-start gap-2 overflow-hidden"
                        >
                            <h2 className="justify-start text-zinc-600 text-[10px] font-semibold font-['Inter'] tracking-wide">
                                {site.name.toUpperCase()}
                            </h2>

                            {cards.map((s) => {
                                const isChecked = selected.has(s.id);
                                return (
                                    <div
                                        key={s.id}
                                        className={`w-[452px] h-16 px-3 py-2.5 rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-start items-center gap-2.5 overflow-hidden transition-colors ${
                                            isChecked
                                                ? "bg-stone-300"
                                                : "bg-white"
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggle(s.id)}
                                            className={`size-4 rounded-[3px] border border-stone-300 ${
                                                isChecked
                                                    ? "bg-neutral-700"
                                                    : "bg-transparent"
                                            }`}
                                        />

                                        <div className="flex flex-col">
                                            <span className="w-72 text-zinc-900 text-xs font-semibold font-['Inter']">
                                                {s.gageHeight} ft
                                            </span>
                                            <span className="w-72 text-muted-foreground text-xs font-normal font-['Inter']">
                                                {s.monitorName} | {s.time} |{" "}
                                                {s.photos}{" "}
                                                {s.photos === 1
                                                    ? "photo"
                                                    : "photos"}
                                            </span>
                                        </div>
                                        <div className="ml-auto flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-zinc-600 outline outline-1 outline-offset-[-1px] outline-stone-300">
                                            {s.status.toUpperCase()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
