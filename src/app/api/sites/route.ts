/***************************************************************
 *
 *                src/app/api/sites/route.ts
 *
 *         Author: Zander
 *           Date: 10/22/2026
 *      Edited By: Bethiah & Tanish
 *           Date: 10/24/2026
 *
 *        Summary: API that sends back the monitoring sites
 *
 **************************************************************/

const SITES = [
    {
        id: "mystic",
        name: "Mystic River at Medford",
        latitude: 42.42,
        longitude: -71.11,
    },
    {
        id: "charles",
        name: "Charles River at Waltham",
        latitude: 42.37,
        longitude: -71.24,
    },
    {
        id: "nashua",
        name: "Nashua River at Groton",
        latitude: 42.61,
        longitude: -71.57,
    },
    {
        id: "neponset",
        name: "Neponset River at Milton",
        latitude: 42.26,
        longitude: -71.07,
    },
    {
        id: "taunton",
        name: "Taunton River at Bridgewater",
        latitude: 41.97,
        longitude: -70.97,
    },
];

export async function GET() {
    return Response.json({ sites: SITES, count: SITES.length });
}
