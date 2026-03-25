const WeatherInfo = (props) => {
  const { temp, condition, icon } = props;
  return (
    <>
      <div className="weather-main">
        <div className="temp-block">
          <span className="temperature">{temp}</span>
          <span className="celsius">°C</span>
        </div>
        <div className="weather-icon">
          <span>{icon}</span>
        </div>
      </div>
      <div className="weather-condition">{condition}</div>
    </>
  );
};

export default WeatherInfo;
