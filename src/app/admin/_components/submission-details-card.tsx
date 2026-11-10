/***************************************************************
 *
 *        src/app/admin/_components/submission-details-card.tsx
 *
 *         Author: Caitlyn, Michele
 *           Date: 11/3/2026
 *
 *        Summary: Admin card for editing/rejecting/approving
 *                 submissions under review. Shows all submission
 *                 details.
 *
 **************************************************************/

"use client";
import { StatusBadge } from "@/components/status-badge";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatMassTime } from "@/lib/time";
import type { Reading } from "@/lib/arcgis/schemas";
import { SITES } from "@/lib/sites";

export type Submission = Pick<
    Reading,
    | "id"
    | "siteId"
    | "monitorName"
    | "gageHeightFt"
    | "observedAt"
    | "notes"
    | "photoUrl"
    | "status"
>;

export function SubmissionDetailsCard({
    submission,
    onApprove,
    onReject,
}: {
    submission: Submission;
    onApprove: () => void;
    onReject: () => void;
}) {
    const resolved = submission.status !== "pending";
    const siteName =
        SITES.find((s) => s.id === submission.siteId)?.name ??
        submission.siteId;
    return (
        <Card className="p-8">
            <h2 className="text-heading">Submission Details</h2>
            <div className="flex flex-row justify-between items-center">
                <div className="text-meta text-label-foreground">
                    #{submission.id}
                </div>
                <StatusBadge status={submission.status} />
            </div>

            <div>
                <p className="text-field-label uppercase">Site</p>
                <p className="text-body">{siteName}</p>
            </div>

            <div>
                <p className="text-field-label uppercase">Volunteer</p>
                <p className="text-body">{submission.monitorName}</p>
            </div>

            <div>
                <p className="text-field-label uppercase">Gage height</p>
                <p className="text-body">{submission.gageHeightFt} ft</p>
            </div>

            <div>
                <p className="text-field-label uppercase">Measured</p>
                <p className="text-body">
                    {formatMassTime(submission.observedAt)}
                </p>
            </div>

            <div className="flex justify-center overflow-hidden border-3 rounded-control text-body text-label-foreground bg-muted h-40 items-center">
                {submission.photoUrl ? (
                    <Dialog>
                        <DialogTrigger
                            aria-label="Enlarge photo"
                            className="relative size-full"
                        >
                            <Image
                                alt=""
                                className="object-cover"
                                src={submission.photoUrl}
                                fill
                                sizes="400px"
                            />
                        </DialogTrigger>
                        <DialogContent
                            aria-describedby={undefined}
                            className="sm:max-w-3xl"
                        >
                            <DialogTitle className="sr-only">
                                Submission photo
                            </DialogTitle>
                            <Image
                                alt={`Photo from ${submission.monitorName}`}
                                className="h-auto max-h-[70vh] w-full object-contain"
                                src={submission.photoUrl}
                                width={1200}
                                height={900}
                            />
                        </DialogContent>
                    </Dialog>
                ) : (
                    <p>No photo submitted</p>
                )}
            </div>

            <div className="rounded-control bg-muted p-3">
                <p className="text-field-label uppercase">Notes</p>
                <p className="text-body break-words">
                    {submission.notes || "No notes"}
                </p>
            </div>

            <div className="flex flex-row gap-2">
                <Button
                    className="flex-auto"
                    variant="outline"
                    disabled={resolved}
                >
                    Edit
                </Button>
                <Button
                    className="flex-auto"
                    variant="destructive"
                    disabled={resolved}
                    onClick={onReject}
                >
                    Reject
                </Button>
                <Button
                    className="flex-auto"
                    variant="default"
                    disabled={resolved}
                    onClick={onApprove}
                >
                    Approve
                </Button>
            </div>
        </Card>
    );
}
