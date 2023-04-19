export function formatDateToDDMMYYYY(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}.${month}.${year}`;
}

export function convertMetersPerSecondToKilometersPerHour(windSpeed) {
  const windSpeedKilometersPerHour = (windSpeed * 3.6).toFixed(2);
  return windSpeedKilometersPerHour;
}

export function convertKelvinToCelsius(temperature) {
  return (temperature - 273.15).toFixed();
}
