import React, { useEffect, useState } from 'react';
import { getUVIndex } from '../api';

function UVIndex({ lat, lon }) {
  const [uvData, setUvData] = useState(null);

  useEffect(() => {
    getUVIndex(lat, lon)
      .then((response) => {
        setUvData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching UV index data:', error);
      });
  }, [lat, lon]);

  if (!uvData) {
    return <div>加载紫外線數據中...</div>;
  }

  return (
    <div>
      <h2>當前紫外線：{uvData.value}</h2>
    </div>
  );
}

export default UVIndex;