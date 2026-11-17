"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";
import { SITES } from "@/lib/sites";
import type { Filters } from "./review-page";

type Props = {
    filters: Filters;
    onChange: (filters: Filters) => void;
};

export function ReviewFilters({ filters, onChange }: Props) {
    return (
        <div className="flex flex-row gap-2">
            <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <NativeSelect
                    id="location"
                    value={filters.siteId}
                    onChange={(e) =>
                        onChange({ ...filters, siteId: e.target.value })
                    }
                >
                    <option value="all">All locations</option>
                    {SITES.map((site) => (
                        <option key={site.id} value={site.id}>
                            {site.name}
                        </option>
                    ))}
                </NativeSelect>
            </Field>
            <Field>
                <FieldLabel htmlFor="date">Date</FieldLabel>
                <NativeSelect
                    id="date"
                    value={filters.date}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            date: e.target.value as Filters["date"],
                        })
                    }
                >
                    <option value="today">Today</option>
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                    <option value="all">All time</option>
                </NativeSelect>
            </Field>
            <Field>
                <FieldLabel htmlFor="sort">Sort</FieldLabel>
                <NativeSelect
                    id="sort"
                    value={filters.sort}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            sort: e.target.value as Filters["sort"],
                        })
                    }
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                </NativeSelect>
            </Field>
        </div>
    );
}
