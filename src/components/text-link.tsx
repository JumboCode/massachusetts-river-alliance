/***************************************************************
 *
 *                src/components/text-link.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *
 *        Summary: Small underlined link
 *
 **************************************************************/

import Link from "next/link";
import { cn } from "@/lib/utils";

export function TextLink({
    className,
    ...props
}: React.ComponentProps<typeof Link>) {
    return (
        <Link
            className={cn(
                "text-field-label text-muted-foreground underline",
                className,
            )}
            {...props}
        />
    );
}
