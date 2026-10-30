/* Author: Helen and Tanish
 * Date: 10/20/2026
 * pages.tsx
 * station-summary-popup
 *
 *
 *
 */
import Link from "next/link";
import type { PublicReading } from "@/lib/arcgis/schemas";
import type { Site } from "@/lib/sites";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatMassTime } from "@/lib/time";

export type LatestReading = Pick<
    PublicReading,
    "id" | "gageHeightFt" | "observedAt"
>;

export function StationSummaryPopup({
    site,
    latest,
}: {
    site: Site;
    latest: LatestReading | null;
}) {
    return (
        <Card className="w-fit min-w-64">
            <CardContent>
                <CardTitle>{site.name}</CardTitle>
            </CardContent>

            <CardContent className="flex flex-col gap-1">
                {latest ? (
                    <>
                        <p className="text-meta font-semibold tracking-wide text-muted-foreground uppercase">
                            Latest approved reading
                        </p>
                        <p className="text-reading font-bold">
                            {latest.gageHeightFt.toFixed(2)} ft
                        </p>
                        <p className="text-meta text-muted-foreground">
                            {formatMassTime(latest.observedAt)}
                        </p>
                    </>
                ) : (
                    <p className="text-meta text-muted-foreground">
                        No approved readings yet
                    </p>
                )}
            </CardContent>

            <CardContent>
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/?station=${site.id}`}>View details →</Link>
                </Button>
            </CardContent>
        </Card>
    );
}
