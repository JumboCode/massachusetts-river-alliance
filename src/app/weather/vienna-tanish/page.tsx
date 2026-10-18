"use client";
import { useState } from "react";

export default function WeatherPage() {
    const [temperature, setTemperature] = useState(0);
    const [windspeed, setWindspeed] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function getWeather() {
        setLoading(true);
        try {
            const url =
                "https://api.open-meteo.com/v1/forecast?latitude=42.41&longitude=-71.12&current=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Request failed");
            }
            const data = await response.json();
            setTemperature(data.current.temperature_2m);
            setWindspeed(data.current.wind_speed_10m);
        } catch {
            setError("Couldn't load weather.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <button onClick={getWeather} style={{ border: "1px solid black" }}>
                {" "}
                Get Weather
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <p>Temperature: {temperature}°F</p>
            <p>Wind speed: {windspeed} mph</p>
            <p> Weather Data from Open-Meteo</p>
        </div>
    );
}
