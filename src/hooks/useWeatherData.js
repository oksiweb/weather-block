import { useEffect, useState, useCallback, useMemo } from 'react';

export function useWeatherData(cities) {
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
    const cities = ['Kraków', 'Warszawa', 'Gdańsk'];
    const fetchAllWeatherData = async () => {
      try {
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

  return useMemo(
    () => [weatherData, errorMessage],
    [weatherData, errorMessage]
  );
}
