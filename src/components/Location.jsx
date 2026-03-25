const Location = (props) => {
    const {
        city,
        dateNow,
    } = props

  return (
    <div className="location">
      <h2 className="city-name" id="cityName">
        {city}
      </h2>
      <div className="date-time" id="dateTime">
        {dateNow}
      </div>
    </div>
  );
};

export default Location;
