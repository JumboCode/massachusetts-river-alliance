/***************************************************************
 *
 *                src/components/ui/input.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *
 *        Summary: Text input from the Figma hi-fi
 *
 **************************************************************/

import { cn } from "cn";

// Shared with Textarea and NativeSelect so all fields look the same.
export const fieldStyles =
    "w-full rounded-md border border-input bg-white px-3.5 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-primary/50 aria-invalid:border-destructive";

function Input({ className, ...props }: React.ComponentProps<"input">) {
    return <input className={cn(fieldStyles, className)} {...props} />;
}

export { Input };
