/***************************************************************
 *
 *                src/app/api/submissions/route.ts
 *
 *         Author: Helen and Micah
 *           Date: 10/23/2026
 *
 *        Summary: API that receives new measurements
 *
 **************************************************************/

export async function POST(request: Request) {
    const body = await request.json();

    const REQUIRED = [
        "siteId",
        "gageHeight",
        "date",
        "time",
        "monitorName",
        "monitorEmail",
    ];

    const missing = REQUIRED.filter(
        (field) => body[field] === undefined || body[field] === "",
    );

    if (missing.length !== 0) {
        return Response.json(
            { error: "Missing fields: " + missing.join(", ") },
            { status: 400 },
        );
    }

    return Response.json({ message: "Submission received", body });
}
