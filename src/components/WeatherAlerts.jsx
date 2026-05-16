const WeatherAlerts = (props) => {
  const { alerts } = props;

  return (
    <div className="forecast-section weather-alerts-card">
      <div className="section-header">
        <p className="section-eyebrow">Safety</p>
        <h2 className="section-title">Smart Alerts</h2>
      </div>

      <div className="alert-list">
        {alerts.map((alert) => (
          <div className={`alert-card alert-${alert.type}`} key={alert.id}>
            <div className="alert-icon">{alert.icon}</div>

            <div>
              <h3 className="alert-title">{alert.title}</h3>
              <p className="alert-message">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;
