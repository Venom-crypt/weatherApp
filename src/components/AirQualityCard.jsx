const AirQualityCard = (props) => {
  const {
    airQuality,
    isAirQualityLoading,
    airQualityError,
    retryAirQualityFetch,
  } = props;

  return (
    <div className="forecast-section air-quality-card">
      <div className="section-header">
        <p className="section-eyebrow">Health Index</p>
        <h2 className="section-title">Air Quality</h2>
      </div>

      {isAirQualityLoading && (
        <p className="empty-forecast">Fetching air quality...</p>
      )}

      {airQualityError && (
        <div className="error-box">
          <p className="location-error">{airQualityError}</p>
          <button
            className="retry-button"
            type="button"
            onClick={retryAirQualityFetch}
          >
            Retry
          </button>
        </div>
      )}

      {!isAirQualityLoading && !airQualityError && airQuality && (
        <>
          <div className={`aqi-main aqi-${airQuality.status.level}`}>
            <div>
              <p className="aqi-label">European AQI</p>
              <h3 className="aqi-value">{airQuality.europeanAqi}</h3>
            </div>

            <div className="aqi-status-block">
              <p className="aqi-status">{airQuality.status.label}</p>
              <p className="aqi-description">{airQuality.status.description}</p>
            </div>
          </div>

          <div className="aqi-grid">
            <div className="aqi-stat">
              <p>US AQI</p>
              <h4>{airQuality.usAqi}</h4>
            </div>

            <div className="aqi-stat">
              <p>PM2.5</p>
              <h4>{airQuality.pm25}</h4>
            </div>

            <div className="aqi-stat">
              <p>PM10</p>
              <h4>{airQuality.pm10}</h4>
            </div>

            <div className="aqi-stat">
              <p>UV Index</p>
              <h4>{Math.round(airQuality.uvIndex)}</h4>
            </div>
          </div>
        </>
      )}

      {!isAirQualityLoading && !airQualityError && !airQuality && (
        <p className="empty-forecast">Air quality will appear here.</p>
      )}
    </div>
  );
};

export default AirQualityCard;
