const WeatherDetails = (props) => {

    const {} = props

  return (
    <div className="weather-details">
      <div className="detail-item">
        <div className="detail-label">ВЛАЖНОСТЬ</div>
        <div className="detail-value">
          <span>84</span>
          <span className="detail-unit">%</span>
        </div>
      </div>
      <div className="detail-item">
        <div className="detail-label">ВЕТЕР</div>
        <div className="detail-value">
          <span>5.2</span>
          <span className="detail-unit"> м/с</span>
        </div>
      </div>
      <div className="detail-item">
        <div className="detail-label">ДАВЛЕНИЕ</div>
        <div className="detail-value">
          <span>1013</span>
          <span className="detail-unit"> гПа</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
