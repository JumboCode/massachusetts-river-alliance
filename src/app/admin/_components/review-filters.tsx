/***************************************************************
 *
 *        src/app/admin/_components/review-filters.tsx
 *
 *         Author: Tycho, Michele
 *         Edited:
 *           Date: 11/17/2026
 *
 *        Summary: TODO
 *
 **************************************************************/

"use client";
import { NativeSelect } from "@/components/ui/native-select";
import { SITES } from "@/lib/sites";
import type { Filters } from "./review-page";

type Props = {
    filters: Filters;
    onChange: (filters: Filters) => void;
};

//reference shows "Location", "Date" and "Sort" inside the boxes
//but step 1 says the dropdowns should show current values? commented out old version
//in case they want the reference version instead
export function ReviewFilters({ filters, onChange }: Props) {
    return (
        <div className="flex justify-end gap-2">
            <NativeSelect
                aria-label="Location"
                className="w-auto"
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
            <NativeSelect
                aria-label="Date"
                className="w-auto"
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
            <NativeSelect
                aria-label="Sort"
                className="w-auto"
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
        </div>
    );
}
// export function ReviewFilters({ filters, onChange }: Props) {
//     return (
//         <div className="flex flex-row gap-2">
//             <Field>
//                 <FieldLabel htmlFor="location">Location</FieldLabel>
//                 <NativeSelect
//                     id="location"
//                     value={filters.siteId}
//                     onChange={(e) =>
//                         onChange({ ...filters, siteId: e.target.value })
//                     }
//                 >
//                     <option value="all">All locations</option>
//                     {SITES.map((site) => (
//                         <option key={site.id} value={site.id}>
//                             {site.name}
//                         </option>
//                     ))}
//                 </NativeSelect>
//             </Field>
//             <Field>
//                 <FieldLabel htmlFor="date">Date</FieldLabel>
//                 <NativeSelect
//                     id="date"
//                     value={filters.date}
//                     onChange={(e) =>
//                         onChange({
//                             ...filters,
//                             date: e.target.value as Filters["date"],
//                         })
//                     }
//                 >
//                     <option value="today">Today</option>
//                     <option value="week">This week</option>
//                     <option value="month">This month</option>
//                     <option value="all">All time</option>
//                 </NativeSelect>
//             </Field>
//             <Field>
//                 <FieldLabel htmlFor="sort">Sort</FieldLabel>
//                 <NativeSelect
//                     id="sort"
//                     value={filters.sort}
//                     onChange={(e) =>
//                         onChange({
//                             ...filters,
//                             sort: e.target.value as Filters["sort"],
//                         })
//                     }
//                 >
//                     <option value="newest">Newest first</option>
//                     <option value="oldest">Oldest first</option>
//                 </NativeSelect>
//             </Field>
//         </div>
//     );
// }
