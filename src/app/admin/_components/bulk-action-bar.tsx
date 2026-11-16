/***************************************************************
 *
 *        src/app/admin/_components/reading-card.tsx
 *
 *         Author: Grant, Will
 *           Date: 11/15/2026
 *
 *        Summary: Component for the bulk action bar that
 *                 features X, approve, and reject buttons
 *
 **************************************************************/
"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function ActionBar({
    count,
    onApprove,
    onReject,
    onClear,
}: {
    count: number;
    onApprove: () => void;
    onReject: () => void;
    onClear: () => void;
}) {
    return (
        <div className="mx-1 mb-1 flex shrink-0 items-center justify-between gap-3 rounded-md bg-warning-foreground px-3 py-2">
            <div className="flex gap-3 items-center">
                <Button
                    onClick={onClear}
                    aria-label="Clear selection"
                    className="size-7 rounded-full bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground"
                >
                    <X className="size-4" />
                </Button>

                <p className="text-body text-foreground">{count} selected</p>
            </div>
            <div className="flex gap-2">
                <Button
                    onClick={onApprove}
                    className="h-8 w-28 bg-success-foreground font-semibold tracking-wider text-background"
                >
                    Approve
                </Button>

                <Button
                    onClick={onReject}
                    variant="destructive"
                    className="h-8 w-28 bg-destructive font-semibold tracking-wider text-background"
                >
                    Reject
                </Button>
            </div>
        </div>
    );
}
