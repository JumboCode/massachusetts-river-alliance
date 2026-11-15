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
            className={`flex items-center gap-3 px-6 py-4 transition-colors ${checked ? "my-0.5 rounded-md bg-accent" : "border-b border-border bg-card hover:bg-muted/50"}`}
        >
            {" "}
            <Checkbox
                checked={checked}
                onCheckedChange={onCheckedChange}
            ></Checkbox>
            <span className="text-body text-foreground">{siteName}</span>
            <span className="ml-auto text-body text-foreground">
                {reading.gageHeightFt.toFixed(2)} ft
            </span>
        </div>
    );
}
