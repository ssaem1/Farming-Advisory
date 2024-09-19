import React from "react";

function WeatherBlock({ temperature, weather }) {
  return (
    <div className="block">
      <h2>Weather</h2>
      <p>Temperature: {Math.round(temperature - 273.15)}°C</p>
      <p>Condition: {weather}</p>
    </div>
  );
}

export default WeatherBlock;
