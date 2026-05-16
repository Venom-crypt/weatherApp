import {
  convertTemperature,
  getTemperatureSymbol,
} from "../utils/temperatureUtils";

import ForecastSkeleton from "./ForecastSkeleton";

const DailyForecast = (props) => {
  const { dailyForecast, temperatureUnit, isWeatherLoading } = props;
  const temperatureSymbol = getTemperatureSymbol(temperatureUnit);

  return (
    <div className="forecast-section">
      <div className="section-header">
        <p className="section-eyebrow">This Week</p>
        <h2 className="section-title">7-Day Forecast</h2>
      </div>
      {isWeatherLoading ? (
        <ForecastSkeleton type="daily" />
      ) : (
        <div className="daily-list">
          {dailyForecast.length > 0 ? (
            dailyForecast.map((item) => {
              const maxTemp = convertTemperature(item.maxTemp, temperatureUnit);
              const minTemp = convertTemperature(item.minTemp, temperatureUnit);

              return (
                <div className="daily-card" key={item.date}>
                  <div className="daily-day-block">
                    <p className="daily-day">{item.day}</p>
                    <p className="daily-condition">{item.condition}</p>
                  </div>

                  <div className="daily-icon">{item.icon}</div>

                  <div className="daily-temp-block">
                    <p className="daily-temp-max">
                      {maxTemp}
                      {temperatureSymbol}
                    </p>
                    <p className="daily-temp-min">
                      {minTemp}
                      {temperatureSymbol}
                    </p>
                  </div>

                  <p className="daily-rain">{item.rainChance}% rain</p>
                </div>
              );
            })
          ) : (
            <p className="empty-forecast">Daily forecast will appear here.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyForecast;
