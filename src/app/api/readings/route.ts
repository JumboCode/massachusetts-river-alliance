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

export async function GET(request: Request) {
    const siteId = new URL(request.url).searchParams.get("site");

    return Response.json({
        readings: getApprovedReadings(siteId ?? undefined),
    });
}
