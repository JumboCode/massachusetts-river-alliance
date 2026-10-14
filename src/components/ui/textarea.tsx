/***************************************************************
 *
 *                src/components/ui/textarea.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *
 *        Summary: Multi-line text input from the Figma hi-fi
 *
 **************************************************************/

import { cn } from "cn";
import { fieldStyles } from "@/components/ui/input";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return <textarea className={cn(fieldStyles, className)} {...props} />;
}

export { Textarea };
