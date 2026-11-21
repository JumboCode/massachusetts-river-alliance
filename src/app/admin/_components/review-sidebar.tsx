/***************************************************************
 *
 *        src/app/admin/_components/review-sidebar.tsx
 *
 *         Author: Tanish, Micah
 *           Date: 11/12/2026
 *
 *        Summary: Reading status sidebar with counts
 *
 **************************************************************/

import { Button } from "@/components/ui/button";
import type { Status } from "@/lib/arcgis/schemas";

export function ReviewSidebar({
    status,
    counts,
    onStatusChange,
}: {
    status: Status | "all";
    counts: Record<Status | "all", number>;
    onStatusChange: (status: Status | "all") => void;
}) {
    const statusOptions: [Status | "all", string][] = [
        ["pending", "Pending review"],
        ["approved", "Approved history"],
        ["rejected", "Rejected"],
        ["all", "All readings"],
    ];
    return (
        <nav className="flex flex-col p-4">
            <p
                className="mb-6 text-muted-foreground text-field-label
            "
            >
                READING STATUS
            </p>
            <div className="flex flex-col gap-2">
                {statusOptions.map(([value, label]) => (
                    <Button
                        key={value}
                        variant="ghost"
                        aria-current={status === value ? "page" : undefined}
                        className={
                            status === value
                                ? "justify-between text-body bg-accent"
                                : "justify-between text-body"
                        }
                        onClick={() => onStatusChange(value)}
                    >
                        {label}
                        <span>{counts[value]}</span>
                    </Button>
                ))}
            </div>
        </nav>
    );
}
