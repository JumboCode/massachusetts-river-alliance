"use client";

import { useState } from "react";

export default function WeatherPage() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [wind, setWind] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  async function getWeather() {
    setLoading(true); // step 11: show "Loading..."
    setError(null);   // clear any old error

    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=42.39&longitude=-71.10&current=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph"
      );

      if (!response.ok) {
        throw new Error(`Request failed (status ${response.status})`);
      }

      const data = await response.json();
      setTemperature(data.current.temperature_2m);
      setWind(data.current.wind_speed_10m);
    } catch (err) {
      // step 12: show the error message
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false); // runs whether it worked or failed
    }
  }

  return (
    <div>
      <button onClick={getWeather}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {temperature !== null && wind !== null && (
        <div>
          <p>Temperature: {temperature}°F</p>
          <p>Wind: {wind} mph</p>
        </div>
      )}

      {/* step 13: credit */}
      <p>
        Weather data by <a href="https://open-meteo.com/">Open-Meteo.com</a>
      </p>
    </div>
  );
}

