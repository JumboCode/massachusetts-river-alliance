/***************************************************************
 *
 *                src/components/site-map/leaflet-map.tsx
 *
 *         Author: Grant and Micah
 *           Date: 11/1/2026
 *
 *        Summary: Uses Leaflet to display a map centered on Massachusetts
 *
 **************************************************************/

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

const MA_CENTER: [number, number] = [42.378, -71.932];

export default function LeafletMap() {
    const [live, setLive] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Leaflet can't reuse a map container, so remount it after Back
        setLive(true);
        return () => {
            setLive(false);
        };
    }, []);

    if (!live) return null;

    return (
        <MapContainer
            center={MA_CENTER}
            zoom={8}
            zoomControl={false}
            className="size-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                className="grayscale"
            />
            <ZoomControl position="bottomright" />
        </MapContainer>
    );
}
