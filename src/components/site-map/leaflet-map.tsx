/***************************************************************
 *
 *                src/components/leaflet-map.tsx
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

export default function LeafletMap() {
    const MassachusettsCenterPoint: [number, number] = [42.378, -71.932];
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
            key="massachusetts-map-instance"
            center={MassachusettsCenterPoint}
            zoom={8}
            zoomControl={false}
            className="size-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className="grayscale"
            />
            <ZoomControl position="bottomright" />
        </MapContainer>
    );
}
