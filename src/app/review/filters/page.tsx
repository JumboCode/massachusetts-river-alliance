/***************************************************************
 *
 *                src/app/review/filters/page.tsx
 *
 *         Author: Zander
 *           Date: 10/22/2026
 *
 *        Summary: Filters for reviewing submissions
 *
 **************************************************************/
"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";
import { useEffect, useState } from "react";
import { SITES } from "@/lib/sites";

const SUBMISSIONS = [
    {
        id: 1,
        siteId: "charles",
        gageHeight: 4.82,
        status: "Pending",
        daysAgo: 0,
    },
    {
        id: 2,
        siteId: "charles",
        gageHeight: 4.76,
        status: "Approved",
        daysAgo: 3,
    },
    {
        id: 3,
        siteId: "nashua",
        gageHeight: 3.21,
        status: "Pending",
        daysAgo: 1,
    },
    {
        id: 4,
        siteId: "nashua",
        gageHeight: 3.05,
        status: "Rejected",
        daysAgo: 12,
    },
    {
        id: 5,
        siteId: "mystic",
        gageHeight: 2.4,
        status: "Approved",
        daysAgo: 5,
    },
    {
        id: 6,
        siteId: "mystic",
        gageHeight: 2.62,
        status: "Pending",
        daysAgo: 45,
    },
];

export default function ReviewFiltersPage() {
    const [site, setSite] = useState("allsites");
    const [date, setDate] = useState("alltime");
    const [status, setStatus] = useState("allstatuses");
    const [shown, setShown] = useState(SUBMISSIONS);

    useEffect(() => {
        setShown(
            SUBMISSIONS.filter(
                (s) =>
                    (status === "allstatuses" || s.status === status) &&
                    (date === "alltime" || s.daysAgo <= parseInt(date)) &&
                    (site === "allsites" || s.siteId === site),
            ),
        );
    }, [site, date, status]);

    return (
        <div>
            <h1 className="font-heading text-xl">Submission Review</h1>
            {shown.map((s) => (
                <p key={s.id}>
                    {SITES.find((site) => site.id === s.siteId)?.name} |{" "}
                    {s.gageHeight} ft | {s.status} | {s.daysAgo} days ago
                </p>
            ))}
            {shown.length === 0 && <p>No submissions match these filters</p>}

            <div className="flex flex-row gap-2">
                <Field>
                    <FieldLabel htmlFor="site" required>
                        SITE
                    </FieldLabel>
                    <NativeSelect
                        id="site"
                        value={site}
                        onChange={(e) => setSite(e.target.value)}
                    >
                        <option value="allsites">All sites</option>
                        {SITES.map((site) => (
                            <option key={site.id} value={site.id}>
                                {site.name}
                            </option>
                        ))}
                    </NativeSelect>
                </Field>
                <Field>
                    <FieldLabel htmlFor="date" required>
                        DATE
                    </FieldLabel>
                    <NativeSelect
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    >
                        <option value="alltime">All times</option>
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                    </NativeSelect>
                </Field>
                <Field>
                    <FieldLabel htmlFor="status" required>
                        STATUS
                    </FieldLabel>
                    <NativeSelect
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="allstatuses">All statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </NativeSelect>
                </Field>
            </div>
        </div>
    );
}
