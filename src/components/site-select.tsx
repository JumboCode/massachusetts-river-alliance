/***************************************************************
 *
 *                src/components/site-select.tsx
 *
 *         Author: Vienna, Helen
 *           Date: 10/16/2026
 *
 *        Summary: Dropdown for picking a monitoring site
 *
 **************************************************************/

import { Field, FieldLabel } from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";
import { SITES } from "@/lib/sites";

type SiteSelectProps = {
    value: string; // the selected site's id, "" when none
    onChange: (siteId: string) => void;
    error?: string; // shown under the dropdown when set
};

export function SiteSelect({ value, onChange, error }: SiteSelectProps) {
    return (
        <Field>
            <FieldLabel htmlFor="site" required>
                SITE
            </FieldLabel>
            <NativeSelect
                id="site"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-invalid={!!error}
            >
                <option value="">Select a Monitor Site</option>
                {SITES.map((site) => (
                    <option key={site.id} value={site.id}>
                        {site.name}
                    </option>
                ))}
            </NativeSelect>
            {error && (
                <FieldLabel className="font-arial text-[11px] leading-none tracking-[0.08em]">
                    {error}
                </FieldLabel>
            )}
            <a
                href="https://www.arcgis.com/apps/mapviewer/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit font-sans text-xs underline"
            >
                Choose a site on the ArcGIS map
            </a>
        </Field>
    );
}
