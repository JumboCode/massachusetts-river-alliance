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

import { z } from "zod";
import { submissionSchema } from "@/lib/arcgis/schemas";

export async function POST(request: Request) {
    const bodyResult = await request.json().catch(() => null);

    if (!bodyResult) {
        return Response.json(
            { errors: { form: ["Invalid JSON payload"] } },
            { status: 400 },
        );
    }

    const result = submissionSchema.safeParse(bodyResult);

    if (!result.success) {
        // formErrors covers bodies that aren't an object, like [] or "hello".
        const { formErrors, fieldErrors } = z.flattenError(result.error);
        return Response.json(
            {
                errors: formErrors.length
                    ? { form: ["Invalid request"] }
                    : fieldErrors,
            },
            { status: 400 },
        );
    }

    return Response.json({ message: "Submission received" }, { status: 201 });
}
