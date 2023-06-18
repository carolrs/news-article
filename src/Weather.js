import { useState, useEffect } from "react";

const Weather = ({onClose}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bgImageUrl, setBgImageUrl] = useState(""); 
  const city = "Edinburg"; // cidade predefinida

  const bgImageWarm = "https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  const bgImageCold = "https://images.pexels.com/photos/4406191/pexels-photo-4406191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  const bgImageSnow = "https://images.pexels.com/photos/15835820/pexels-photo-15835820/free-photo-of-snowy-mountain-in-birds-eye-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=a3d9eb01d4de82b9b8d0849ef604dbed`)
      .then((res) => res.json())
      .then(
        (result) => {
          setWeatherData(result);
          setIsLoading(false);
          const mainWeather = result.weather[0].main; // "Clouds", "Clear", "Snow", etc.
          switch (mainWeather) {
            case 'Clear':
              setBgImageUrl(bgImageWarm);
              break;
            case 'Clouds':
            case 'Rain':
              setBgImageUrl(bgImageCold);
              break;
            case 'Snow':
              setBgImageUrl(bgImageSnow);
              break;
            default:
              setBgImageUrl(bgImageCold);
          }
        },
        (error) => {
          setIsLoading(true);
          console.log(error);
        }
      );
  }, []);

  const handleCloseModal = () => {
    onClose();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!weatherData || !weatherData.name) {
    return <div>Error: Unable to fetch weather data</div>;
  } else {
    const { name, main, wind, weather } = weatherData;
    return (
      <div 
        className="modal-content" 
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          opacity: 0.8,
          color: 'black',
        }}
      >
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <h2 className="weather-button font-bold text-5xl mb-2 text-red-500 lg:text-4xl">Weather for {name}</h2>
        <div className="weather-data font-bold text-2xl mb-2 lg: text:4xl">
          <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="Weather icon" />
          <p>Temperature: {main.temp} °C</p>
        </div>
        <div className="weather-data font-bold text-2xl mb-2 lg: text:4xl">
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="Weather icon" />
          <p>Wind speed: {wind.speed} m/s</p>
        </div>
      </div>
    );
  };
};

export default Weather;
