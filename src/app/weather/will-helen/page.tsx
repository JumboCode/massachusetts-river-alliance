"use client";

import { useState } from "react";

export default function WeatherPage() {
    const [temperature, setTemperature] = useState(0);
    const [wind, setWind] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function getWeather() {
        setLoading(true);
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=42.41&longitude=-71.12&current=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph",
        );

        if (!response.ok) {
            setError(true);
            return;
        }

        const data = await response.json();
        setLoading(false);

        const current = data.current;

        const temp = current.temperature_2m;
        setTemperature(temp);

        const wind = current.wind_speed_10m;
        setWind(wind);
    }

    function checkError() {
        if (error) {
            return <p>An error has occured</p>;
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center flex-col gap-4">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <button
                        className="border-2 rounded-lg p-4"
                        onClick={getWeather}
                    >
                        Get Weather
                    </button>
                    <p>Temperature: {temperature}</p>
                    <p>Wind Speed: {wind}</p>
                </>
            )}
            {checkError()}
        </div>
    );
}
