import requests
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
API_KEY = "138b335bf2974938d66190fc3ed0d9b3"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Location(BaseModel):
    lat: float
    lon: float

@app.get("/weather")
async def get_weather(lat: float, lon: float):
    weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}"
    
    response = requests.get(weather_url)
    
    if response.status_code == 200:
        data = response.json()
        return {
            "location": f"Lat: {lat}, Lon: {lon}",
            "temperature": data['main']['temp'],
            "humidity": data['main']['humidity'],
            "weather": data['weather'][0]['description'],
            "wind_speed": data['wind']['speed']
        }
    else:
        return {"error": "Failed to fetch weather data"}
