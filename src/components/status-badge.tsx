/***************************************************************
 *
 *                src/components/status-badge.tsx
 *
 *         Author: Zander
 *           Date: 10/26/2026
 *
 *        Summary: Pill showing a reading's review status
 *
 **************************************************************/

import { Badge } from "@/components/ui/badge";
import type { Status } from "@/lib/arcgis/schemas";

const VARIANT = {
    pending: "warning",
    approved: "success",
    rejected: "destructive",
    hidden: "muted",
} as const satisfies Record<Status, string>;

const LABEL: Record<Status, string> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    hidden: "Hidden",
};

export function StatusBadge({ status }: { status: Status }) {
    return <Badge variant={VARIANT[status]}>{LABEL[status]}</Badge>;
}
