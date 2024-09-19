// WeatherBlock.js
import React from "react";

function WeatherBlock({ temperature, weather }) {
  return (
    <div className="block">
      <h2>Weather</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Condition: {weather}</p>
    </div>
  );
}

export default WeatherBlock;
