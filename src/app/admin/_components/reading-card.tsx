/***************************************************************
 *
 *        src/app/admin/_components/reading-card.tsx
 *
 *         Author: Zander, Aray, Will, Grant
 *           Date: 11/10/2026
 *
 *        Summary: One reading in the review list, with its details
 *                 when expanded
 *
 **************************************************************/

import { Checkbox } from "@/components/ui/checkbox";
import type { Reading, Status } from "@/lib/arcgis/schemas";
import { SITES } from "@/lib/sites";
import { cn } from "@/lib/utils";

export function ReadingCard({
    reading,
    checked,
    onCheckedChange,
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
        <div
            className={cn(
                "flex items-center gap-3 py-3 pr-3.5 pl-6",
                checked
                    ? "rounded-xl bg-accent"
                    : "border-b border-border bg-card",
            )}
        >
            <Checkbox
                checked={checked}
                onCheckedChange={onCheckedChange}
                aria-label={`Select reading: ${siteName}, ${reading.gageHeightFt.toFixed(2)} ft`}
            />
            <span className="text-body text-foreground">{siteName}</span>
            <span className="ml-auto text-body text-foreground">
                {reading.gageHeightFt.toFixed(2)} ft
            </span>
        </div>
    );
}
