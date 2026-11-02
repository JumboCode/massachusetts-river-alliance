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
        const handle = setTimeout(() => {
            setLive(true);
        }, 0);

        return () => {
            clearTimeout(handle);
            setLive(false);
        };
    }, []);

    return (
        <div className="h-screen w-screen">
            {live && (
                <MapContainer
                    center={MassachusettsCenterPoint}
                    zoom={13}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        className="grayscale"
                    ></TileLayer>
                    <ZoomControl position="bottomright" />
                </MapContainer>
            )}
        </div>
    );
}
