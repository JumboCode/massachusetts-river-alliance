"use client";
import { useState } from "react";

export default function WeatherPage() {
  const [weather, setWeather] = useState<{
    temperature: number;
    windSpeed: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getWeather() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=42.41&longitude=-71.12&current=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph",
      );
      if (!response.ok) {
        throw new Error("There was an error fetching the weather.");
      }

      const data = await response.json();
      setWeather({
        temperature: data.current.temperature_2m,
        windSpeed: data.current.wind_speed_10m,
      });
    } catch {
      setError("There was an error fetching the weather.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-blue-300 h-screen w-screen flex flex-col justify-between text-white">
      <div className="flex flex-col gap-2 font-bold text-lg mt-20 items-center">
        <button onClick={getWeather} className="bg-blue-500 hover:bg-blue-700 p-3 hover:cursor-pointer w-fit rounded-lg ">Get Weather</button>
        {isLoading ?
          (<p>Loading...</p>) 
          : weather && (
          <>
            <p>
              Temperature: {weather.temperature}°F
            </p>
            <p>
              Wind speed: {weather.windSpeed} mph
            </p>
          </>
        )}
        {error && <p>{error}</p>}
      </div>
      <div className="text-center mb-5">
        <p>Credits for API: Open-Meteo</p>
      </div>
    </div>
  );
}