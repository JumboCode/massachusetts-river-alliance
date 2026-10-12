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
    <div style={{ backgroundColor: '#091948', minHeight: '100vh', width: '100%' }}>
      <button  onClick={getWeather}><p style={{color: "lightblue", fontFamily: "times-new-roman", fontSize: "80px", cursor: "url('pngtree-summer-sun-clip-art-png-image_16237305.png'), pointer"}}>Get Weather</p></button>

      {loading && <p style={{ color: "lightgreen", fontFamily: "times-new-roman" }}>Loading...</p>}
      {error && <p style={{ color: "red", fontFamily: "times-new-roman" }}>Error: {error}</p>}

      {temperature !== null && wind !== null && (
        <div>
          <p style={{ color: "green", fontFamily: "times-new-roman"}}>Temperature: {temperature}°F</p>
          <p style={{ color: "teal", fontFamily: "times-new-roman" }}>Wind: {wind} mph</p>
        </div>
      )}

      {/* step 13: credit */}
      <p style={{ color: "lightgreen", fontFamily: "times-new-roman" }}>
        Weather data by <a href="https://open-meteo.com/">Open-Meteo.com</a>
      </p>
    </div>
  );
}

