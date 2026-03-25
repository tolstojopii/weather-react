const WeatherDetails = (props) => {
  const { humidity, windSpeed, pressure } = props;

  return (
    <div className="weather-details">
      <div className="detail-item">
        <div className="detail-label">ВЛАЖНОСТЬ</div>
        <div className="detail-value">
          <span>{humidity}</span>
          <span className="detail-unit">%</span>
        </div>
      </div>
      <div className="detail-item">
        <div className="detail-label">ВЕТЕР</div>
        <div className="detail-value">
          <span>{windSpeed}</span>
          <span className="detail-unit"> м/с</span>
        </div>
      </div>
      <div className="detail-item">
        <div className="detail-label">ДАВЛЕНИЕ</div>
        <div className="detail-value">
          <span>{pressure}</span>
          <span className="detail-unit"> гПа</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
