/***************************************************************
 *
 *        src/app/admin/submissions/page.tsx
 *
 *         Author: Caitlyn, Michele
 *           Date: 11/3/2026
 *
 *        Summary: Test page with sample data to be passed as
 *                 props to the SubmissionDetailsCard component.
 *
 **************************************************************/
"use client";
import { useState } from "react";
// eslint-disable-next-line no-restricted-imports -- This route intentionally uses the admin submission card.
import {
    SubmissionDetailsCard,
    type Submission,
} from "../_components/submission-details-card";

const SAMPLE: Submission = {
    id: "MR-2048",
    siteId: "charles",
    monitorName: "John Smith",
    gageHeightFt: 4.82,
    observedAt: new Date("2026-10-27T14:42:00Z"),
    notes: "Water level looks higher than last week. Some debris near the gage.",
    photoUrl: "/logo-waves.png",
    status: "pending",
};

export default function SubmissionsPage() {
    const [submission, setSubmission] = useState(SAMPLE);
    return (
        <div className="w-full max-w-100">
            <SubmissionDetailsCard
                submission={submission}
                onApprove={() => {
                    setSubmission({ ...submission, status: "approved" });
                }}
                onReject={() => {
                    setSubmission({ ...submission, status: "rejected" });
                }}
            />
        </div>
    );
}
