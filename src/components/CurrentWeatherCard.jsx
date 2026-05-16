import SearchBar from "./SearchBar";
import {
  convertTemperature,
  getTemperatureSymbol,
} from "../utils/temperatureUtils";

import WeatherIcon from "./WeatherIcon";

const CurrentWeatherCard = (props) => {
  const {
    searchInput,
    setSearchInput,
    onSearchSubmit,
    isSearching,
    searchError,
    selectedLocation,
    placeName,
    isLocationLoading,
    locationError,
    weatherError,
    retryWeatherFetch,
    currentWeather,
    weather,
    isWeatherLoading,
    latitude,
    longitude,
    accuracy,
    location,
    onUseGpsLocation,
    temperatureUnit,
    onAddFavorite,
    isCurrentLocationFavorite,
  } = props;

  const temperatureSymbol = getTemperatureSymbol(temperatureUnit);

  const displayedTemperature = currentWeather
    ? convertTemperature(currentWeather.temperature, temperatureUnit)
    : "--";

  const displayedFeelsLike = currentWeather
    ? convertTemperature(currentWeather.feelsLike, temperatureUnit)
    : "--";

  return (
    <section className="weather-card main-weather-card">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearchSubmit={onSearchSubmit}
        isSearching={isSearching}
      />

      {searchError && <p className="location-error">{searchError}</p>}

      <div className="location-section">
        <p className="location-label">
          {selectedLocation?.source === "search"
            ? "Searched Location"
            : "Current Location"}
        </p>

        <h1 className="city-name">{placeName}</h1>

        {isLocationLoading && !selectedLocation && (
          <p className="location-details">Getting your precise location...</p>
        )}

        {selectedLocation && (
          <p className="location-details">
            Lat {latitude} · Lon {longitude}
            {accuracy ? ` · Accuracy ${accuracy} m` : ""}
          </p>
        )}

        {selectedLocation?.source === "search" && (
          <button
            className="favorite-button"
            type="button"
            onClick={onAddFavorite}
            disabled={isCurrentLocationFavorite}
          >
            {isCurrentLocationFavorite
              ? "★ Added to Favorites"
              : "☆ Add to Favorites"}
          </button>
        )}

        {locationError && !selectedLocation && (
          <p className="location-error">{locationError}</p>
        )}

        {weatherError && (
          <div className="error-box">
            <p className="location-error">{weatherError}</p>
            <button
              className="retry-button"
              type="button"
              onClick={retryWeatherFetch}
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <div className="weather-main-section">
        <div>
          <h2 className="temperature">
            {isWeatherLoading
              ? "--"
              : currentWeather
                ? `${displayedTemperature}${temperatureSymbol}`
                : "--"}
          </h2>

          <p className="weather-condition">
            {isWeatherLoading
              ? "Fetching weather..."
              : currentWeather
                ? currentWeather.condition
                : "Search city or allow location"}
          </p>

          {weather?.lastUpdated && (
            <p className="last-updated">
              Updated{" "}
              {new Date(weather.lastUpdated).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          )}
        </div>

        <WeatherIcon
          type={currentWeather ? currentWeather.iconType : "default"}
          className="weather-icon"
        />
      </div>

      <div className="weather-stats-grid">
        <div className="stat-card">
          <p className="stat-label">Humidity</p>
          <h3 className="stat-value">
            {currentWeather ? `${currentWeather.humidity}%` : "--"}
          </h3>
        </div>

        <div className="stat-card">
          <p className="stat-label">Wind</p>
          <h3 className="stat-value">
            {currentWeather ? `${currentWeather.windSpeed} km/h` : "--"}
          </h3>
        </div>

        <div className="stat-card">
          <p className="stat-label">Feels Like</p>
          <h3 className="stat-value">
            {currentWeather
              ? `${displayedFeelsLike}${temperatureSymbol}`
              : "--"}
          </h3>
        </div>

        <div className="stat-card">
          <p className="stat-label">Pressure</p>
          <h3 className="stat-value">
            {currentWeather ? `${currentWeather.pressure} hPa` : "--"}
          </h3>
        </div>
      </div>

      <button
        className="location-button"
        type="button"
        onClick={onUseGpsLocation}
        disabled={!location}
      >
        {location
          ? selectedLocation?.source === "gps"
            ? "Using Live GPS Location"
            : "Use My Current Location"
          : "Waiting for Location Permission"}
      </button>
    </section>
  );
};

export default CurrentWeatherCard;
