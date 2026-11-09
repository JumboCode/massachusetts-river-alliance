/***************************************************************
 *
 *                src\app\api\readings\route.ts
 *
 *         Author: Caitlyn, Tanish
 *           Date: 11/10/2026
 *
 *        Summary: Route for retrieving readings
 *
 **************************************************************/

import { getApprovedReadings } from "../../../lib/arcgis/readings";
import type { PublicReading } from "../../../lib/arcgis/schemas";

export async function GET(request: Request) {
    const siteId = new URL(request.url).searchParams.get("site");

    let sortedReadings: PublicReading[];

    if (siteId) {
        sortedReadings = getApprovedReadings(siteId);
    } else {
        sortedReadings = getApprovedReadings();
    }

    return Response.json({ sortedReadings });
}
