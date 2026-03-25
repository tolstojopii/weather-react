const WeatherInfo = (props) => {
    const {
        temp
    } = props
  return (
    <>
      <div className="weather-main">
        <div className="temp-block">
          <span className="temperature">{temp}</span>
          <span className="celsius">°C</span>
        </div>
        <div className="weather-icon">
          <span>☁️</span>
        </div>
      </div>
      <div className="weather-condition">Пасмурно, небольшой дождь</div>
    </>
  );
};

export default WeatherInfo;
