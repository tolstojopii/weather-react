import { use, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import WeatherDetails from "./components/weatherDetails";
import WeatherInfo from "./components/weatherInfo";
import Location from "./components/location";

function App(props) {
  const {} = props;

  const [city, setCity] = useState("Курск");
  const [temp, setTemp] = useState("6");
  const [dateNow, setDateNow] = useState("вторник, 23 марта");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // функция запроса на поиск координат города(геокодинг)
  const fetchCoordinates = async (cityName) => {
    const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=ru&format=json`;
    const response = await fetch(URL);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("Город не найден");
    }

    const { latitude, longitude, name, country } = data.results[0];
    return { lat: latitude, lon: longitude, city: name, country };
  };

  //функция получения погоды по координатам
  const fetchWeatherByCoords = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&forecast_days=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.current_weather) {
      throw new Error("данных о погоде не имеем детка");
    }
    return data;
  };

  const fecthWeather = async (cityName) => {
    setLoading(true);
    setError("");

    try {
      // в этой строчке мы запрашиваем координаты города, await используется таким образом, что пока не запрс не будет получен следующие функции не пойдут
      const { lat, lon, city, country } = await fetchCoordinates(cityName);
      // здесь такой же запрос, только он запрашивает уже данные по этому городу на основе данных координатов из верхней функции
      const weatherDataRaw = await fetchWeatherByCoords(lat, lon);

      // эти данные о погоде, команды взяты из url, то есть с самого api по идеи
      const current = weatherDataRaw.current_weather;
      const hourly = weatherDataRaw.hourly;

      // получение текущего времени
      const now = new Date();
      const currentHour = now.getHours();

      /* использование текущего времени, работает таким образом => 
        функция findIndex проходится по списку hourly(в переводе дословно почасовой ну по идеи "часовой пояс")
        t это текущая метка массива, new date(t) превращает строку в объект даты .gethours() получает час из даты
        */

      const timeIndex = hourly.time.findIndex(
        (t) => new Date(t).getHours() === currentHour,
      );

      //условие при если че то вдруг не нашли то мы берем 0
      const idx = timeIndex !== -1 ? timeIndex : 0;

      // temperature взято тоже из url, в url temperature сразу определяется в градсух цельсия, округляем до целого числа
      const temp = Math.round(current.temperature);

      // ну это та же самая тема, только в этот раз воздух и код погоды какой то хз че он даёт
      const wind = currnet.windspeed;
      const weatherCode = current.weathercode;

      /* влажность, но здесь используется idx, idx это короче тот час который нашли ранее, и 
      если слева значение равно null or undefined то мы используем просто 80% потому что это типо стабильное число */
      const humidity = hourly.relative_humidity_2m[idx] ?? 80;
      
      // здесь давление, но его можно получить только в платной версии я че даун платить за неё? делаем заглушку(статичное значение)
      const pressure = 1013;

      // здесь для описание и эмодзи будем использовать функции ниже
      const description = getWeatherDescription(weatherCode);
      const iconEmoji = getWeatherIcon(weatherCode);


      // Объект по которому будет изменяться состояение, то есть при первом рендере будет изменяться вот эти данные
      setWeatherData({
        city: city,
        country: country,
        temp: temp,
        condition: description,
        icon: iconEmoji,
        humidity: humidity,
        windSpeed: windSpeed,
        pressure: pressure,
      });
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDescription = (code) => {
    const codes = {
      0: "Ясно",
      1: "Преимущественно ясно",
      2: "Облачно",
      3: "Пасмурно",
      45: "Туман",
      48: "Иней",
      51: "Легкая морось",
      53: "Морось",
      55: "Сильная морось",
      56: "Ледяная морось",
      57: "Сильная ледяная морось",
      61: "Небольшой дождь",
      63: "Дождь",
      65: "Сильный дождь",
      66: "Ледяной дождь",
      67: "Сильный ледяной дождь",
      71: "Небольшой снег",
      73: "Снег",
      75: "Сильный снег",
      77: "Снежные зерна",
      80: "Небольшой ливень",
      81: "Ливень",
      82: "Сильный ливень",
      85: "Небольшой снегопад",
      86: "Сильный снегопад",
      95: "Гроза",
      96: "Гроза с градом",
      99: "Сильная гроза с градом",
    };
    return codes[code] || "Погода";
  };


  // получение иконки для определенных чисел погоды сверху, сделано через оператор if, потому что повторяются смайлики
  const getWeatherIcon = (code) => {
    if ([0, 1].includes(code)) return "☀️";
    if ([2].includes(code)) return "⛅";
    if ([3].includes(code)) return "☁️";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
      return "🌧️";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "🌡️";
  };

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <>
      <div className="weather-card">
        <Search onSearch={handleSearch} city={city} />
        <div className="weather-info">
          <Location city={city} dateNow={dateNow} />
          <WeatherInfo temp={temp} />
          <WeatherDetails />
        </div>
      </div>
    </>
  );
}

export default App;
