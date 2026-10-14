/***************************************************************
 *
 *                src/components/text-link.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *
 *        Summary: Small underlined link from the Figma hi-fi
 *
 **************************************************************/

import Link from "next/link";
import { cn } from "cn";

export function TextLink({
    className,
    ...props
}: React.ComponentProps<typeof Link>) {
    return (
        <Link
            className={cn(
                "text-[11px] font-extrabold tracking-[0.08em] text-muted-foreground underline",
                className,
            )}
            {...props}
        />
    );
}
