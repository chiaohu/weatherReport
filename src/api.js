import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


  const getForecast = (lat, lon) => {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      }
    );
  };
  
  const getAirQuality = (lat, lon) => {
    return axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      }
    );
  };
  
  const getUVIndex = (lat, lon) => {
    return axios.get(
      `http://api.openweathermap.org/data/2.5/uvi`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      }
    );
  };
  
  export { getForecast, getAirQuality, getUVIndex };