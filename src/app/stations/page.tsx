/* Author: Helen and Tanish
 * Date: 10/20/2026
 * pages.tsx
 * station-summary-popup
 */
import { SITES } from "@/lib/sites";
import {
    StationSummaryPopup,
    type LatestReading,
} from "@/components/station-summary-popup";

const SITE = SITES[1]; // Charles River at Waltham
const LATEST: LatestReading = {
    id: "r1",
    gageHeightFt: 2.4,
    observedAt: new Date("2026-09-21T14:30:00Z"),
};

export default function StationsPage() {
    return (
        <main>
            <StationSummaryPopup site={SITE} latest={LATEST} />
            <StationSummaryPopup site={SITE} latest={null} />
        </main>
    );
}
