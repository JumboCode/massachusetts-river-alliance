/***************************************************************
 *
 *        src/app/admin/_components/reading-details.tsx
 *              renamed from: submission-details-card.tsx
 *
 *         Author: Caitlyn, Michele
 *           Date: 11/3/2026
 *      Edited By: Bethiah, Vienna
 *           Date: 11/14/2026
 *
 *        Summary: Admin card for submissions under review.
 *                 Shows submission details.
 *
 **************************************************************/

"use client";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { formatMassTime } from "@/lib/time";
import type { Reading } from "@/lib/arcgis/schemas";

export function ReadingDetails({ reading }: { reading: Reading }) {
    return (
        <Card className="p-6  bg-muted">
            <div className="flex gap-10">
                <div className="flex flex-col gap-1">
                    <p className="text-field-label uppercase text-label-foreground">
                        GAGE HEIGHT
                    </p>
                    <p className="text-section">
                        {reading.gageHeightFt.toFixed(2)} ft
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-field-label uppercase text-label-foreground">
                        OBSERVED
                    </p>
                    <p className="text-ui">
                        {formatMassTime(reading.observedAt)}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-field-label uppercase text-label-foreground">
                    FIELD NOTE
                </p>
                <p className="text-meta break-words">
                    {reading.notes || "No notes"}
                </p>
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-field-label uppercase text-label-foreground">
                    PHOTO
                </p>

                {reading.photoUrl ? (
                    <div className="relative h-24 w-32 overflow-hidden rounded-control">
                        <Dialog>
                            <DialogTrigger
                                aria-label="Enlarge photo"
                                className="relative size-full"
                            >
                                <Image
                                    alt=""
                                    className="object-cover"
                                    src={reading.photoUrl}
                                    fill
                                    sizes="400px"
                                />
                            </DialogTrigger>
                            <DialogContent
                                aria-describedby={undefined}
                                className="sm:max-w-3xl"
                            >
                                <DialogTitle className="sr-only">
                                    PHOTO
                                </DialogTitle>
                                <Image
                                    alt={`Photo from ${reading.monitorName}`}
                                    className="h-auto max-h-[70vh] w-full object-contain"
                                    src={reading.photoUrl}
                                    width={1200}
                                    height={900}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                ) : (
                    <p className="text-meta text-label-foreground">
                        No photo submitted
                    </p>
                )}
            </div>
        </Card>
    );
}
