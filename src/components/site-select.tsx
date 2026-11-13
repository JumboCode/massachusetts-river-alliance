/***************************************************************
 *
 *                src/components/site-select.tsx
 *
 *         Author: Vienna, Helen
 *           Date: 10/16/2026
 *      Edited By: Bethiah and Tycho
 *           Date: 11/7/2026
 *
 *        Summary: Dropdown for picking a monitoring site
 *
 **************************************************************/

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SITES } from "@/lib/sites";
import { TextLink } from "@/components/text-link";

type SiteSelectProps = {
    value: string; // the selected site's id, "" when none
    onChange: (siteId: string) => void;
    error?: string; // shown under the dropdown when set
};

export function SiteSelect({ value, onChange, error }: SiteSelectProps) {
    return (
        <Field>
            <FieldLabel htmlFor="site" required>
                Site
            </FieldLabel>
            <Select value={value} onValueChange={(v) => onChange(v ?? "")}>
                <SelectTrigger id="site" aria-invalid={!!error}>
                    <SelectValue placeholder="Select a Monitor Site" />
                </SelectTrigger>
                <SelectContent>
                    {SITES.map((site) => (
                        <SelectItem key={site.id} value={site.id}>
                            {site.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <FieldError>{error}</FieldError>}
            <TextLink
                href="https://www.arcgis.com/apps/mapviewer/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit"
            >
                Choose a site on the ArcGIS map
            </TextLink>
        </Field>
    );
}
