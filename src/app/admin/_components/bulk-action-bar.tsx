/***************************************************************
 *
 *        src/app/admin/_components/bulk-action-bar.tsx
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

export function BulkActionBar({
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
        <div className="sticky bottom-0 flex shrink-0 items-center justify-between rounded-xl bg-warning p-2">
            <div className="flex items-center gap-2.5">
                <Button
                    onClick={onClear}
                    size="icon-sm"
                    aria-label="Clear selection"
                    className="size-7 rounded-full border-background bg-background text-foreground hover:bg-background"
                >
                    <X className="size-4" strokeWidth={2.625} />
                </Button>

                <p className="text-ui text-foreground">{count} selected</p>
            </div>
            <div className="flex gap-2.5">
                <Button
                    onClick={onApprove}
                    variant="approve"
                    className="h-7.5 w-27.5 text-body font-medium"
                >
                    Approve
                </Button>

                <Button
                    onClick={onReject}
                    variant="destructive"
                    className="h-7.5 w-27.5 text-body font-medium"
                >
                    Reject
                </Button>
            </div>
        </div>
    );
}
