/***************************************************************
 *
 *                src/components/site-select.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *
 *        Summary: Dropdown for picking a monitoring site
 *
 **************************************************************/

import { Field, FieldLabel } from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";

type SiteSelectProps = {
    value: string; // the selected site's id, "" when none
    onChange: (siteId: string) => void;
    error?: string; // shown under the dropdown when set
};

export function SiteSelect({ value, onChange }: SiteSelectProps) {
    return (
        <Field>
            <FieldLabel htmlFor="site" required>
                SITE
            </FieldLabel>
            <NativeSelect
                id="site"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select a Monitor Site</option>
            </NativeSelect>
        </Field>
    );
}
