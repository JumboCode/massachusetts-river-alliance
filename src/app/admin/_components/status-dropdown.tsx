/***************************************************************
 *
 *        src\app\admin\_components\status-dropdown.tsx
 *
 *         Author: Helen, Caitlyn
 *           Date: 11/17/2026
 *
 *        Summary: Status dropdown component that allows user to change
 *                 the status of a reading.
 *
 **************************************************************/

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { badgeVariants } from "@/components/ui/badge";
import { STATUSES, type Status } from "@/lib/arcgis/schemas";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_BADGE_VARIANT = {
    pending: "warning",
    approved: "success",
    rejected: "destructive",
} as const satisfies Record<Status, "warning" | "success" | "destructive">;

const STATUS_LABEL: Record<Status, string> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
};

export function StatusDropdown({
    status,
    onChange,
}: {
    status: Status;
    onChange: (status: Status) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    badgeVariants({
                        variant: STATUS_BADGE_VARIANT[status],
                    }),
                    "w-30 flex justify-between rounded-lg border-none py-3.5",
                )}
            >
                {STATUS_LABEL[status]}
                <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                    value={status}
                    onValueChange={(value) => {
                        const nextStatus = STATUSES.find(
                            (candidate) => candidate === value,
                        );
                        if (nextStatus) onChange(nextStatus);
                    }}
                >
                    {STATUSES.map((option) => (
                        <DropdownMenuRadioItem key={option} value={option}>
                            {STATUS_LABEL[option]}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
