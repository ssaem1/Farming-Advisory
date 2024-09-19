import React, { useState, useEffect } from "react";
import './App.css'
import HeaderBar from "./components/HeaderBar";
import WeatherBlock from "./components/WeatherBlock";
import HumidityWindBlock from "./components/HumidityBlock";
import AdvisoryBlock from "./components/AdvisoryBlock";
import Map from "./components/Map";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState(null);
  const [advise, setAdvise] = useState(null);
  const [locationError, setLocationError] = useState(null);
  

  useEffect(() => {
    // Function to fetch weather data from FastAPI backend
    const fetchWeatherData = async (lat, lon) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/weather?lat=${lat}&lon=${lon}`);

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);

          // check advise
          const temperatureCelsius = Math.round(data.temperature - 273.15);
          const humidity = data.humidity;
          const wind_speed = data.wind_speed;

          if (temperatureCelsius > 25) {
            setAdvise("Irrigate crops!");
          } else if (humidity > 60) {
            setAdvise("Apply pesticides!");
          } else if (wind_speed > 30) {
            setAdvise("Protect crops!");
          } else {
            setAdvise("Crops are safe!");
          }
        } else {
          console.error("Failed to fetch weather data");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Request for the user's location using the browser's Geolocation API
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition(position.coords);
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            setLocationError("Unable to retrieve location. Please allow location access.");
            console.error("Error getting location:", error);
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      <HeaderBar />
      {locationError && <p>{locationError}</p>}
      {weatherData ? (
        <div className="block-container">
          <Map lat={position.latitude} long={position.longitude} />
          <div className="small-block-container">
            <WeatherBlock 
              temperature={weatherData.temperature} 
              weather={weatherData.weather} 
            />
            <HumidityWindBlock
              humidity={weatherData.humidity} 
              wind={weatherData.wind_speed} 
            />
            <AdvisoryBlock
              advise={advise} 
            />
            </div>
          </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
