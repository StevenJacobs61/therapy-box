import React, {useState, useEffect} from 'react'
import Styles from './thumbnails.module.css'

interface WeatherData {
  name: string,
  weather: {
    description: string;
  }[];
}

const WeatherThumb: React.FC = () => {

  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const [weather, setWeather] = useState<string | null>();
  const [temperature, setTemperature] = useState<number>();
  const [weatherIcon, setWeatherIcon] = useState<string>('');

  const fetchWeatherData = async () => {
    const apiKey = `${process.env.REACT_APP_WEATHER_KEY}`;
    const lat = coords?.latitude.toFixed(2);
    const lon = coords?.longitude.toFixed(2);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
        setWeatherIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        setTemperature(Math.round(data.main.temp));
      } catch (error) {
        console.error(error);
      }
    };
    
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
        },
        (error: GeolocationPositionError) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  useEffect(() => {
    if (coords) {
      fetchWeatherData();
    }
  }, [coords]);

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <>
         <div className={Styles.cardContentTop}>
          <img className={Styles.weatherIcon} src={weatherIcon}/>
          <span className={Styles.weatherInfo}>{temperature} <br/> degrees</span>
        </div>
        <div className={Styles.weatherLocation}>{weatherData?.name}</div>
    </>
  )
}

export default WeatherThumb