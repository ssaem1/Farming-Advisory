// src/components/AdvisoryDisplay.js
import React from 'react';

function AdvisoryDisplay({ advisories, weather }) {
  return (
    <div>
      <h1>Weather and Crop Advisories</h1>
      <div>
        <h2>Weather Information</h2>
        <p>Temperature: {weather?.main?.temp} °C</p>
        <p>Humidity: {weather?.main?.humidity}%</p>
      </div>
      <div>
        <h2>Crop Advisories</h2>
        {advisories.map((advisory, index) => (
          <div key={index}>
            <h3>{advisory.crop}</h3>
            <p>{advisory.advisory}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvisoryDisplay;
