/***************************************************************
 *
 *                src/components/index.tsx
 *
 *         Author: Grant and Micah
 *           Date: 11/1/2026
 *
 *        Summary: Dynamically loads a Leaflet map component
 *
 **************************************************************/

"use client";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
    ssr: false,
    loading: () => <p className="text-center">Loading map...</p>,
});

export function SiteMap() {
    return <LeafletMap />;
}
