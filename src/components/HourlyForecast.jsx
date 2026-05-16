import { useState } from "react";
import {
  convertTemperature,
  getTemperatureSymbol,
} from "../utils/temperatureUtils";
import ForecastSkeleton from "./ForecastSkeleton";

const ITEMS_PER_PAGE = 6;

const HourlyForecast = (props) => {
  const { hourlyForecast, temperatureUnit, isWeatherLoading } = props;
  const [startIndex, setStartIndex] = useState(0);

  const temperatureSymbol = getTemperatureSymbol(temperatureUnit);

  const visibleForecast = hourlyForecast.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const canGoPrevious = startIndex > 0;
  const canGoNext = startIndex + ITEMS_PER_PAGE < hourlyForecast.length;

  const onPrevious = () => {
    if (canGoPrevious) {
      setStartIndex((prevIndex) => Math.max(prevIndex - ITEMS_PER_PAGE, 0));
    }
  };

  const onNext = () => {
    if (canGoNext) {
      setStartIndex((prevIndex) =>
        Math.min(
          prevIndex + ITEMS_PER_PAGE,
          hourlyForecast.length - ITEMS_PER_PAGE,
        ),
      );
    }
  };

  return (
    <div className="forecast-section">
      <div className="section-header forecast-header-row">
        <div>
          <p className="section-eyebrow">Next 24 Hours</p>
          <h2 className="section-title">Hourly Forecast</h2>
        </div>

        {isWeatherLoading ? (
          <ForecastSkeleton type="hourly" />
        ) : (
          <>
            <div className="hourly-reveal-grid">
              {/* your existing visibleForecast map stays here */}
            </div>

            {hourlyForecast.length > ITEMS_PER_PAGE && (
              <p className="forecast-page-indicator">
                Showing {startIndex + 1}–
                {Math.min(startIndex + ITEMS_PER_PAGE, hourlyForecast.length)}{" "}
                of {hourlyForecast.length}
              </p>
            )}
          </>
        )}

        {hourlyForecast.length > ITEMS_PER_PAGE && (
          <div className="forecast-controls">
            <button
              className="forecast-control-button"
              type="button"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              aria-label="Previous forecast"
            >
              ‹
            </button>

            <button
              className="forecast-control-button"
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
              aria-label="Next forecast"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className="hourly-reveal-grid">
        {visibleForecast.length > 0 ? (
          visibleForecast.map((item, index) => {
            const temperature = convertTemperature(
              item.temperature,
              temperatureUnit,
            );

            return (
              <div
                className="hourly-card reveal-card"
                key={item.time}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <p className="forecast-time">{item.hour}</p>
                <div className="forecast-icon">{item.icon}</div>
                <h3 className="forecast-temp">
                  {temperature}
                  {temperatureSymbol}
                </h3>
                <p className="forecast-rain">{item.rainChance}% rain</p>
              </div>
            );
          })
        ) : (
          <p className="empty-forecast">Hourly forecast will appear here.</p>
        )}
      </div>

      {hourlyForecast.length > ITEMS_PER_PAGE && (
        <p className="forecast-page-indicator">
          Showing {startIndex + 1}–
          {Math.min(startIndex + ITEMS_PER_PAGE, hourlyForecast.length)} of{" "}
          {hourlyForecast.length}
        </p>
      )}
    </div>
  );
};

export default HourlyForecast;
