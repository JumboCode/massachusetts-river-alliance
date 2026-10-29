/***************************************************************
 *
 *                src/app/submit/page.tsx
 *
 *         Author: Will, Micah, Vienna, Michele
 *           Date: 10/27/2026
 *
 *        Summary: Volunteer form for submitting a gage height measurement
 *
 **************************************************************/

import { connection } from "next/server";
import { Suspense } from "react";
import { dateToMassTime } from "@/lib/time";
import { SubmitForm } from "./_components/submit-form";

export default function SubmitPage() {
    return (
        <Suspense>
            <SubmitFormWithNow />
        </Suspense>
    );
}

// The form defaults to now, so read the time on the server for each request.
async function SubmitFormWithNow() {
    await connection();
    return <SubmitForm now={dateToMassTime(new Date())} />;
}
