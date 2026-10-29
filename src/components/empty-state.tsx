/***************************************************************
 *
 *                src/components/empty-state.tsx
 *
 *         Author: Zander
 *           Date: 10/26/2026
 *
 *        Summary: "Nothing here" message plus the next step to take
 *
 **************************************************************/

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";

export function EmptyState({
    title,
    description,
    action,
    className,
}: {
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}) {
    return (
        <Empty className={className}>
            <EmptyHeader>
                <EmptyTitle>{title}</EmptyTitle>
                {description && (
                    <EmptyDescription>{description}</EmptyDescription>
                )}
            </EmptyHeader>
            {action && <EmptyContent>{action}</EmptyContent>}
        </Empty>
    );
}
