import React, { useState, useEffect } from "react";
import './App.css'
import HeaderBar from "./components/HeaderBar";
import WeatherBlock from "./components/WeatherBlock";
import HumidityWindBlock from "./components/HumidityBlock";
import AdvisoryBlock from "./components/AdvisoryBlock";
import Map from "./components/Map";
import WeatherDataChart from "./components/WeatherDataChart";



function App() {
  const [weatherData, setWeatherData] = useState(null);
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

    const calculateAdvisories = (weather)) => {
      if (weather.temperature > 0) {
        setAdvise("irrigate crops!");
      }
    }

    getLocation(); // Trigger location request when component mounts
    calculateAdvisories(weatherData)
  }, []);

  return (
    <div>
      <HeaderBar />
      {locationError && <p>{locationError}</p>}
      {weatherData ? (
        <div className="block-container">
          <Map />
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
              temperature={advise} 
              weather={weatherData.weather} 
              humidity={weatherData.humidity} 
              wind={weatherData.wind_speed} 
            />
            <WeatherDataChart />
            </div>
          </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
