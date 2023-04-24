function formatDateToDDMMYYYY(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}.${month}.${year}`;
}

function convertMetersPerSecondToKilometersPerHour(windSpeed) {
  const windSpeedKilometersPerHour = (windSpeed * 3.6).toFixed(2);
  return windSpeedKilometersPerHour;
}

function convertKelvinToCelsius(temperature) {
  return (temperature - 273.15).toFixed();
}

export function formatWeatherData(weatherData) {
  return weatherData.map((item) => {
    const { name: cityName, dt, wind, main } = item;
    const formattedDate = formatDateToDDMMYYYY(dt);
    const windSpeed = wind
      ? `${convertMetersPerSecondToKilometersPerHour(wind.speed)} km/h`
      : '';
    const temperatureValue = `${convertKelvinToCelsius(main.temp)} °C`;
    return { windSpeed, temperatureValue, formattedDate, cityName };
  });
}
