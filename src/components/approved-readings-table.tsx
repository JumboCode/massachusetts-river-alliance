/***************************************************************
 *
 *                approved-readings-table.tsx
 *
 *         Author: Tycho & Vienna
 *           Date: 11/1/2026
 *
 *        Summary: Table with approved readings, taken from readings prop
 *
 **************************************************************/
import type { PublicReading } from "@/lib/arcgis/schemas";
import { formatMassTime } from "@/lib/time";

export type Reading = Pick<PublicReading, "id" | "gageHeightFt" | "observedAt">;

export function ApprovedReadingsTable({ readings }: { readings: Reading[] }) {
    const newestFirst = [...readings].sort(
        (a, b) => b.observedAt.getTime() - a.observedAt.getTime(),
    );

    return (
        <section className="bg-card">
            <h2 className="justify-start text-foreground text-meta font-semibold">
                Approved readings
            </h2>
            {newestFirst.length === 0 ? (
                <p>No approved readings yet</p>
            ) : (
                <table className="w-full text-left">
                    <thead>
                        <tr className="h-7 bg-muted">
                            <th className="px-2.5 w-44 text-left text-muted-foreground text-label">
                                DATE
                            </th>
                            <th className="px-2.5 w-28 text-left text-muted-foreground text-label">
                                HEIGHT
                            </th>
                            <th className="px-2.5 w-36 text-right text-muted-foreground text-label">
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {newestFirst.map((r) => (
                            <tr
                                key={r.id}
                                className="h-7 border-b border-border"
                            >
                                <td className="px-2.5">
                                    {formatMassTime(r.observedAt)}
                                </td>
                                <td className="px-2.5">
                                    {r.gageHeightFt.toFixed(2)} ft
                                </td>
                                <td className="px-2.5 text-right">Approved</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
