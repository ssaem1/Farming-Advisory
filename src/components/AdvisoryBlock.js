// HumidityWindBlock.js
import React from "react";
import './BlockStyles.css'; // Import the CSS for styling

function AdvisoryBlock({ temperature, weather, humidity, wind , }) {
  return (
    <div className="block-advisory">
      <h2>Advisory</h2>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {wind} m/s</p>
    </div>
  );
}

export default AdvisoryBlock;
