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
    return (
        <nav className="flex flex-col p-4">
            <p className="mb-6 text-muted-foreground text-field-label">
                {" "}
                READING STATUS
            </p>
            <div className="flex flex-col gap-2">
                <Button
                    variant="ghost"
                    aria-current={status === "pending" ? "page" : undefined}
                    className={
                        status === "pending"
                            ? "justify-between bg-accent bg-primary text-body"
                            : "justify-between text-body"
                    }
                    onClick={() => onStatusChange("pending")}
                >
                    Pending review
                    <span>{counts.pending}</span>
                </Button>

                <Button
                    variant="ghost"
                    aria-current={status === "approved" ? "page" : undefined}
                    className={
                        status === "approved"
                            ? "justify-between bg-accent bg-primary text-body"
                            : "justify-between text-body"
                    }
                    onClick={() => onStatusChange("approved")}
                >
                    Approved
                    <span>{counts.approved}</span>
                </Button>

                <Button
                    variant="ghost"
                    aria-current={status === "rejected" ? "page" : undefined}
                    className={
                        status === "rejected"
                            ? "justify-between bg-accent bg-primary text-body"
                            : "justify-between text-body"
                    }
                    onClick={() => onStatusChange("rejected")}
                >
                    Rejected
                    <span>{counts.rejected}</span>
                </Button>

                <Button
                    variant="ghost"
                    aria-current={status === "all" ? "page" : undefined}
                    className={
                        status === "all"
                            ? "justify-between bg-accent bg-primary text-body"
                            : "justify-between text-body"
                    }
                    onClick={() => onStatusChange("all")}
                >
                    All readings
                    <span>{counts.all}</span>
                </Button>
            </div>
        </nav>
    );
}
