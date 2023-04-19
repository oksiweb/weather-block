import React, { useEffect, useState, useCallback } from 'react';
import WeatherItem from './components/WeatherItem';
import {
  formatDateToDDMMYYYY,
  convertMetersPerSecondToKilometersPerHour,
  convertKelvinToCelsius,
} from './utils/index.js';
import './styles.css';

export default function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeather = useCallback(async function (city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      try {
        const cities = ['Kraków', 'Warszawa', 'Gdańsk'];
        const data = await Promise.allSettled(
          cities.map((city) => fetchWeather(city))
        );
        const values = data
          .filter((data) => data.status === 'fulfilled')
          .map((item) => item.value);
        setWeatherData(values);
        setErrorMessage('');
      } catch (e) {
        console.log(e);
        setErrorMessage('An error occurred while fetching weather data.');
        setWeatherData([]);
      }
    };

    fetchAllWeatherData();
  }, [fetchWeather]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  
  if (weatherData.length === 0) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="weather-container">
      {weatherData.map((item, idx) => {
        const { name: cityName, dt, wind, main } = item;
        const formattedDate = formatDateToDDMMYYYY(dt);
        const windSpeed = wind ? `${convertMetersPerSecondToKilometersPerHour(
          wind.speed
        )} km/h` : '';
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
  );
}
