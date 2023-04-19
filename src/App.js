import React, { useEffect, useState } from "react";
import WeatherItem from "./components/WeatherItem";
import { formatDateToDDMMYYYY,  convertMetersPerSecondToKilometersPerHour, convertKelvinToCelsius} from "./utils/index.js";
import './styles.css';

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const cities = ["Kraków", "Warszawa", "Gdańsk"];

  async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      try {
        const data = await Promise.all(cities.map((city) => fetchWeather(city)));
        setWeatherData(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllWeatherData();
  }, []);

  if (weatherData.length === 0) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="weather-container">
      {weatherData.map((item, idx) => {
        const { name: cityName, dt, wind, main } = item;
        const formattedDate = formatDateToDDMMYYYY(dt);
        const windSpeed = `${convertMetersPerSecondToKilometersPerHour(wind.speed)} km/h`;
        const temperatureValue = `${convertKelvinToCelsius(main.temp)} °C`;
        return (
          <WeatherItem
            key={idx}
            windSpeed={windSpeed}
            temperatureValue={temperatureValue}
            formattedDate={formattedDate}
            cityName={cityName}
          />
        );
      })}
    </div>
  )
}
