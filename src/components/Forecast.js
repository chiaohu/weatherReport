import React, { useEffect, useState } from 'react';
import { getForecast } from '../api';

function Forecast({ lat, lon }) {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    getForecast(lat, lon)
      .then((response) => {
        setForecastData(response.data.list);
      })
      .catch((error) => {
        console.error('Error fetching forecast data:', error);
      });
  });

  return (
    <div>
      <ul>
        {forecastData.map((item) => (
          <li key={item.dt}>
            時間：{item.dt_txt}, 溫度：{item.main.temp}°C, 天氣：{item.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forecast;