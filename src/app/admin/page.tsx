/***************************************************************
 *
 *                src/app/admin/page.tsx
 *
 *         Author: Zander, Aray
 *           Date: 11/10/2026
 *
 *        Summary: Admin page for reviewing submitted readings
 *
 **************************************************************/

import { connection } from "next/server";
import { Suspense } from "react";
import { getReadings } from "@/lib/arcgis/readings";
import { ReviewPage } from "./_components/review-page";

export default function AdminPage() {
    return (
        <Suspense>
            <ReviewPageWithData />
        </Suspense>
    );
}

// Readings change constantly and "now" drives the date filter, so read both
// on the server for each request.
async function ReviewPageWithData() {
    await connection();
    return <ReviewPage readings={getReadings()} now={new Date()} />;
}
