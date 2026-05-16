import { useCallback, useEffect, useRef, useState } from "react";
import { fetchWeatherByCoordinates } from "../api/weatherApi";
import { getWeatherInfo } from "../utils/weatherCodeMapper";
import { getDistanceInMeters } from "../utils/locationUtils";

const MIN_DISTANCE_CHANGE_METERS = 500;
const WEATHER_REFRESH_INTERVAL_MS = 10 * 60 * 1000;

const getHourText = (dateTimeText) => {
  const date = new Date(dateTimeText);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    hour12: true,
  });
};

const getDayText = (dateText) => {
  const date = new Date(dateText);

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
  });
};

const formatHourlyForecast = (hourlyData) => {
  if (!hourlyData) {
    return [];
  }

  const now = new Date();

  return hourlyData.time
    .map((time, index) => {
      const weatherInfo = getWeatherInfo(hourlyData.weather_code[index]);

      return {
        time,
        hour: getHourText(time),
        temperature: Math.round(hourlyData.temperature_2m[index]),
        humidity: hourlyData.relative_humidity_2m[index],
        feelsLike: Math.round(hourlyData.apparent_temperature[index]),
        rainChance: hourlyData.precipitation_probability[index],
        windSpeed: Math.round(hourlyData.wind_speed_10m[index]),
        weatherCode: hourlyData.weather_code[index],
        condition: weatherInfo.condition,
        icon: weatherInfo.icon,
        iconType: weatherInfo.iconType,
      };
    })
    .filter((item) => new Date(item.time) >= now)
    .slice(0, 24);
};

const formatDailyForecast = (dailyData) => {
  if (!dailyData) {
    return [];
  }

  return dailyData.time.map((date, index) => {
    const weatherInfo = getWeatherInfo(dailyData.weather_code[index]);

    return {
      date,
      day: index === 0 ? "Today" : getDayText(date),
      maxTemp: Math.round(dailyData.temperature_2m_max[index]),
      minTemp: Math.round(dailyData.temperature_2m_min[index]),
      rainChance: dailyData.precipitation_probability_max[index],
      sunrise: dailyData.sunrise[index],
      sunset: dailyData.sunset[index],
      weatherCode: dailyData.weather_code[index],
      condition: weatherInfo.condition,
      icon: weatherInfo.icon,
      iconType: weatherInfo.iconType,
    };
  });
};

const formatWeatherData = (weatherData) => {
  const current = weatherData.current;
  const weatherInfo = getWeatherInfo(current.weather_code);

  return {
    current: {
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      feelsLike: Math.round(current.apparent_temperature),
      isDay: current.is_day === 1,
      precipitation: current.precipitation,
      rain: current.rain,
      weatherCode: current.weather_code,
      pressure: Math.round(current.surface_pressure),
      windSpeed: Math.round(current.wind_speed_10m),
      condition: weatherInfo.condition,
      icon: current.is_day === 1 ? weatherInfo.icon : "🌙",
      iconType: current.is_day === 1 ? weatherInfo.iconType : "night",
      background: current.is_day === 1 ? weatherInfo.background : "night",
    },
    hourly: formatHourlyForecast(weatherData.hourly),
    daily: formatDailyForecast(weatherData.daily),
    lastUpdated: new Date().toISOString(),
  };
};

const shouldFetchWeather = (location, lastFetchedLocation, lastFetchedTime) => {
  if (!location) {
    return false;
  }

  if (!lastFetchedLocation || !lastFetchedTime) {
    return true;
  }

  const distance = getDistanceInMeters(location, lastFetchedLocation);
  const timePassed = Date.now() - lastFetchedTime;

  return (
    distance >= MIN_DISTANCE_CHANGE_METERS ||
    timePassed >= WEATHER_REFRESH_INTERVAL_MS
  );
};

const useWeather = (location) => {
  const [weather, setWeather] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  const lastFetchedLocationRef = useRef(null);
  const lastFetchedTimeRef = useRef(null);
  const latestLocationRef = useRef(null);

  const fetchWeather = useCallback(async (selectedLocation) => {
    if (!selectedLocation) {
      return;
    }

    try {
      setIsWeatherLoading(true);
      setWeatherError("");

      const weatherData = await fetchWeatherByCoordinates(
        selectedLocation.latitude,
        selectedLocation.longitude,
      );

      const formattedWeather = formatWeatherData(weatherData);

      setWeather(formattedWeather);
      lastFetchedLocationRef.current = selectedLocation;
      lastFetchedTimeRef.current = Date.now();
    } catch (error) {
      setWeatherError(error.message || "Unable to fetch weather.");
    } finally {
      setIsWeatherLoading(false);
    }
  }, []);

  useEffect(() => {
    latestLocationRef.current = location;

    if (
      shouldFetchWeather(
        location,
        lastFetchedLocationRef.current,
        lastFetchedTimeRef.current,
      )
    ) {
      fetchWeather(location);
    }
  }, [location, fetchWeather]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (latestLocationRef.current) {
        fetchWeather(latestLocationRef.current);
      }
    }, WEATHER_REFRESH_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchWeather]);

  const retryWeatherFetch = () => {
    if (latestLocationRef.current) {
      fetchWeather(latestLocationRef.current);
    }
  };

  return {
    weather,
    isWeatherLoading,
    weatherError,
    retryWeatherFetch,
  };
};

export default useWeather;
