import React, { useMemo } from 'react';
import WeatherList from './components/WeatherList';
import { useWeatherData } from './hooks/useWeatherData';
import { formatWeatherData } from './utils/index.js';
import './styles.css';

export default function App() {
  const [weatherData, errorMessage] = useWeatherData();

  const weatherDataFormatted = useMemo(() => {
    return formatWeatherData(weatherData);
  }, [weatherData]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (weatherData.length === 0) {
    return <div>Loading ...</div>;
  }

  return <WeatherList weatherData={weatherDataFormatted} />;
}
