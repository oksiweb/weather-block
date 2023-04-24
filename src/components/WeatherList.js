import React from 'react';
import WeatherItem from './WeatherItem';

function WeatherList({ weatherData }) {
  return (
    <div className="weather-container">
      {weatherData.map(
        ({ cityName, formattedDate, temperatureValue, windSpeed }, idx) => (
          <WeatherItem
            key={idx}
            cityName={cityName}
            formattedDate={formattedDate}
            temperatureValue={temperatureValue}
            windSpeed={windSpeed}
          />
        )
      )}
    </div>
  );
}

export default WeatherList;
