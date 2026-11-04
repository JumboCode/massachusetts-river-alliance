/***************************************************************
 *
 *        src\app\admin\_components\submission-details-card.tsx
 *
 *         Author: Caitlyn, Michele
 *           Date: 11/3/2026
 *
 *        Summary: Admin card for editting/rejecting/approving
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
import { SITES } from "@/lib/sites";
import { Submission } from "../submissions/page";

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
    return (
        <Card className="p-8 h-screen">
            <h2 className="text-title">Submission Details</h2>
            <div className="flex flex-row justify-between items-center">
                <div className="text-meta text-label-foreground">
                    #{submission.id}
                </div>
                <StatusBadge status={submission.status} />
            </div>

            <div>
                <p className="text-field-label uppercase">SITE</p>
                <p className="text-body">
                    {SITES.find((s) => s.id === submission.siteId)?.name}
                </p>
            </div>

            <div>
                <p className="text-field-label uppercase">VOLUNTEER</p>
                <p className="text-body">{submission.monitorName}</p>
            </div>

            <div>
                <p className="text-field-label uppercase">GAGE HEIGHT</p>
                <p className="text-body">{submission.gageHeightFt} ft</p>
            </div>

            <div>
                <p className="text-field-label uppercase">MEASURED</p>
                <p className="text-body">
                    {formatMassTime(submission.observedAt)}
                </p>
            </div>

            <div className="flex p-3 justify-center border-3 rounded-control text-body underline text-label-foreground bg-muted h-40 items-center">
                {submission.photoUrl ? (
                    <Dialog>
                        {/**Should it be text or full box that's clickable...*/}
                        <DialogTrigger className="flex flex-col gap-2 items-center">
                            <span>SUBMISSION PHOTO</span>
                            <span>Tap to enlarge</span>
                        </DialogTrigger>
                        <DialogContent aria-describedby={undefined}>
                            {/**Radix keeps giving errors without dialogtitle ? Not sure what to put here */}
                            <DialogTitle>SUBMISSION PHOTO</DialogTitle>
                            <Image
                                alt="SUBMISSION PHOTO"
                                className="h-fit w-fit object-contain"
                                src={submission.photoUrl}
                                width={100}
                                height={100}
                            />
                        </DialogContent>
                    </Dialog>
                ) : (
                    <p>No photo available</p>
                )}
            </div>

            <div className="rounded-control bg-muted p-3">
                <p className="text-field-label uppercase">NOTES</p>
                <p className="text-body break-words max-h-13 overflow-auto">
                    {submission.notes}
                </p>
            </div>

            <div className="flex flex-row gap-2">
                {/** leaving edit blank for now (no onClick)*/}
                <Button
                    className="flex-auto"
                    key="outline"
                    variant="outline"
                    size="default"
                    disabled={resolved}
                >
                    Edit
                </Button>
                <Button
                    className="flex-auto"
                    key="destructive"
                    variant="destructive"
                    size="default"
                    disabled={resolved}
                    onClick={onReject}
                >
                    Reject
                </Button>
                <Button
                    className="flex-auto"
                    key="default"
                    variant="default"
                    size="default"
                    disabled={resolved}
                    onClick={onApprove}
                >
                    Approve
                </Button>
            </div>
        </Card>
    );
}
