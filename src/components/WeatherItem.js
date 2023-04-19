import React from "react";

function WeatherItem({ temperatureValue, windSpeed, formattedDate, cityName }) {
    return (
    <div className="weather-item-container">
        <div className="temperature">{temperatureValue}</div>
        <div className="info-container">
            <div className="wind">{windSpeed} km/h</div>
            <div className="date">{formattedDate}</div>
            <div className="city">{cityName}</div>
        </div>
    </div>
    );
}

export default WeatherItem;






