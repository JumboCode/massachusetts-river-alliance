import type { PublicReading } from "@/lib/arcgis/schemas";
import { formatMassTime } from "@/lib/time";

export type Reading = Pick<PublicReading, "id" | "gageHeightFt" | "observedAt">;

export function ApprovedReadingsTable({ readings }: { readings: Reading[] }) {
    const newestFirst = [...readings].sort(
        (a, b) => b.observedAt.getTime() - a.observedAt.getTime(),
    );

    return (
        <section>
            <h2 className="justify-start text-foreground text-meta font-semibold">
                Approved readings
            </h2>
            {newestFirst.length === 0 ? (
                <p>No approved readings yet</p>
            ) : (
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-muted">
                            <th className="px-scale-3 py-scale-2 w-44 text-left text-muted-foreground text-label">
                                Date
                            </th>
                            <th className="px-scale-3 py-scale-2 w-28 text-left text-muted-foreground text-label">
                                Height
                            </th>
                            <th className="px-scale-3 py-scale-2 w-36 text-right text-muted-foreground text-label">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {newestFirst.map((r) => (
                            <tr key={r.id} className="border-b border-border">
                                <td className="px-scale-3 py-scale-2">
                                    {formatMassTime(r.observedAt)}
                                </td>
                                <td className="px-scale-3 py-scale-2">
                                    {r.gageHeightFt.toFixed(2)} ft
                                </td>
                                <td className="px-scale-3 py-scale-2 text-right">
                                    Approved
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
