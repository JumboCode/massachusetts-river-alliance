"use client";
import { useState } from 'react';


export default function WeatherPage() {

    const [currTemp, setTemp] = useState("");
    const [currWind, setWind] = useState("");

  async function getWeather(): Promise<void> {

    setTemp("Loading...");
    setWind("Loading...");

    try {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=42.41&longitude=-71.12&current=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph");
    const data = await response.json();
    setTemp(data.current.temperature_2m);
    setWind(data.current.wind_speed_10m);
    } catch (error: unknown){
    if(error instanceof Error) {
        setTemp(error.message);
        setWind(error.message);
    } else {
        setTemp("An unexpected error occured");
        setWind("An unexpected error occured");
    }
  }

}

  return (
  <div 
    style={{ display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundImage: "url('https://img.magnific.com/free-vector/cyclone-hit-rural-village_1308-20010.jpg')", 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }} >
  <h2 style={{ backgroundColor: '#4e5564', color: '#ffffff', padding: '8px 16px' }}>
    Temperature: {currTemp} °F
  </h2>
  <h2 style={{ backgroundColor: '#4e5564', color: '#ffffff', padding: '8px 16px' }}>
    Wind: {currWind} mph</h2>
  <button 
    style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '8px 16px' }}
    onClick={getWeather}>Get Weather
  </button>
  <h2 style={{ backgroundColor: '#4e5564', color: '#ffffff', padding: '8px 16px' }}>
    Data from Open-Meteo</h2>
  </div>
  );
  }