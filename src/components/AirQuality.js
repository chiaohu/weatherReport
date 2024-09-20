import React, { useEffect, useState } from 'react';
import { getAirQuality } from '../api';

function AirQuality({ lat, lon }) {
  const [aqData, setAqData] = useState(null);

  useEffect(() => {
    getAirQuality(lat, lon)
      .then((response) => {
        setAqData(response.data.list[0]);
      })
      .catch((error) => {
        console.error('Error fetching air quality data:', error);
      });
  }, [lat, lon]);

  if (!aqData) {
    return <div>加载空气质量数据中...</div>;
  }

  const { main, components } = aqData;

  return (
    <div>
      <h2>空气质量指数（AQI）：{main.aqi}</h2>
      <ul>
        {Object.entries(components).map(([key, value]) => (
          <li key={key}>
            {key.toUpperCase()}：{value} μg/m³
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AirQuality;