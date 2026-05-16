const formatTime = (timeText) => {
  if (!timeText) {
    return "--";
  }

  return new Date(timeText).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getSunProgress = (sunrise, sunset) => {
  if (!sunrise || !sunset) {
    return 50;
  }

  const now = Date.now();
  const sunriseTime = new Date(sunrise).getTime();
  const sunsetTime = new Date(sunset).getTime();

  if (now <= sunriseTime) {
    return 0;
  }

  if (now >= sunsetTime) {
    return 100;
  }

  return Math.round(((now - sunriseTime) / (sunsetTime - sunriseTime)) * 100);
};

const SunCycleCard = (props) => {
  const { dailyForecast } = props;

  const today =
    dailyForecast && dailyForecast.length > 0 ? dailyForecast[0] : null;

  const sunrise = today?.sunrise;
  const sunset = today?.sunset;
  const progress = getSunProgress(sunrise, sunset);

  return (
    <div className="forecast-section sun-cycle-card">
      <div className="section-header">
        <p className="section-eyebrow">Astronomy</p>
        <h2 className="section-title">Sunrise & Sunset</h2>
      </div>

      {today ? (
        <>
          <div className="sun-arc">
            <div className="sun-path" />
            <div className="animated-sun" style={{ left: `${progress}%` }}>
              ☀️
            </div>
          </div>

          <div className="sun-time-row">
            <div>
              <p className="sun-label">Sunrise</p>
              <h3 className="sun-time">{formatTime(sunrise)}</h3>
            </div>

            <div>
              <p className="sun-label">Sunset</p>
              <h3 className="sun-time">{formatTime(sunset)}</h3>
            </div>
          </div>
        </>
      ) : (
        <p className="empty-forecast">Sunrise and sunset will appear here.</p>
      )}
    </div>
  );
};

export default SunCycleCard;
