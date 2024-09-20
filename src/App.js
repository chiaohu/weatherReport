import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Forecast from './components/Forecast';
import AirQuality from './components/AirQuality';
import UVIndex from './components/UVIndex';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [iconUrl, setIconUrl] = useState('');

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`);
      setWeatherData(response.data);
      setCity('');
      setIconUrl(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    } catch (error) {
      console.error("獲取天氣資料失敗",error);
    }
  };

  return (
    <div className="App">
      <h1>天氣查詢</h1>
      <div className="search-bar">
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="輸入城市的英文名稱" 
        />
        <div className="button" onClick={fetchWeather}><FontAwesomeIcon icon={faSearch} /> </div>
      </div>

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p className="degree">{weatherData.main.temp}°</p>
          <p>最高溫度: {weatherData.main.temp_max}°C</p>
          <p>最低溫度: {weatherData.main.temp_min}°C</p>
          <p>體感溫度: {weatherData.main.feels_like}°C</p>
          <p>氣壓: {weatherData.main.pressure}hPa</p>
          <p>濕度: {weatherData.main.humidity}%</p>
          <p>天氣狀況: {weatherData.weather[0].description}</p>
          <p>天氣圖示: <img src={iconUrl} alt="Weather icon" /></p>
          <p>緯度: {weatherData.coord.lat}</p>
          <p>經度: {weatherData.coord.lon}</p>
          <p>風速: {weatherData.wind.speed} 米/秒</p>
          <p>風向: {weatherData.wind.deg}度</p>
          <Forecast lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
          <AirQuality lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
          <UVIndex lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
        </div>
      )}
      
    </div>
  );
}

export default App;