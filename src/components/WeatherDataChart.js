import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = () => {
  const [weatherData, setWeatherData] = useState(null);

  // Fetch weather data from the FastAPI backend
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/advisory?lat=40&lon=-150');
        const data = await response.json();  // Parse the response as JSON
        setWeatherData(data);  // Set the parsed data to state
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Prepare data for the chart
  const labels = weatherData.forecast.map((entry) => entry.date);
  const temperatures = weatherData.forecast.map((entry) => entry.temperature);
  const humidity = weatherData.forecast.map((entry) => entry.humidity);
  const precipitation = weatherData.forecast.map((entry) => entry.precipitation);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Humidity (%)',
        data: humidity,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Precipitation (mm)',
        data: precipitation,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `5-Day Weather Forecast`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Weather Forecast</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;
