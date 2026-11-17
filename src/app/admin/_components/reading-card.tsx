/***************************************************************
 *
 *        src/app/admin/_components/reading-card.tsx
 *
 *         Author: Bethiah, Vienna
 *           Date: 11/14/2026
 *
 *        Summary: One reading in the review list, with its details
 *                 when expanded
 *
 **************************************************************/

import type { Reading, Status } from "@/lib/arcgis/schemas";
import { SITES } from "@/lib/sites";
import { formatMassTime } from "@/lib/time";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReadingDetails } from "./reading-details";

const STATUS_LABELS: Record<Status, string> = {
    pending: "Pending review",
    approved: "Approved",
    rejected: "Rejected",
};

export function ReadingCard({
    reading,
    expanded,
    onToggleExpand,
}: {
    reading: Reading;
    expanded: boolean;
    onToggleExpand: () => void;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    onStatusChange: (status: Status) => void;
}) {
    const siteName =
        SITES.find((s) => s.id === reading.siteId)?.name ?? reading.siteId;
    return (
        <div className="border-b border-muted-foreground/20 flex flex-col">
            <div className="flex items-center gap-3 px-6 py-4 rounded-card">
                <div className="flex flex-col">
                    <span className="text-body text-foreground font-medium">
                        {siteName}
                    </span>
                    <span className="text-body text-muted-foreground text-meta">
                        {formatMassTime(reading.observedAt)}
                        {" | "}
                        {STATUS_LABELS[reading.status]}
                    </span>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <span className="text-body font-medium text-foreground">
                        {reading.gageHeightFt.toFixed(2)} ft
                    </span>

                    <Button
                        type="button"
                        size="icon-sm"
                        aria-label="Show details"
                        onClick={onToggleExpand}
                        aria-expanded={expanded}
                        className="bg-transparent! text-muted-foreground shadow-none hover:bg-transparent! hover:text-foreground aria-expanded:bg-transparent!"
                    >
                        <ChevronDown
                            className={cn(
                                "transition-transform",
                                expanded && "rotate-180",
                                "group-hover/button:stroke-3",
                            )}
                        />
                    </Button>
                </div>
            </div>
            {expanded && <ReadingDetails reading={reading} />}
        </div>
    );
}
