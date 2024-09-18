// HumidityWindBlock.js
import React from "react";
import './BlockStyles.css'; // Import the CSS for styling

function HumidityWindBlock({ humidity, wind }) {
  return (
    <div className="block">
      <h2>Humidity & Wind</h2>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {wind} m/s</p>
    </div>
  );
}

export default HumidityWindBlock;
