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

import { getReadings } from "../../../lib/arcgis/readings";
import type { Reading } from "../../../lib/arcgis/schemas";

export async function GET() {
    const sortedReadings: Reading[] = getReadings();

    return Response.json({ sortedReadings });
}
