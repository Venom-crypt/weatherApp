import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAirQualityByCoordinates } from "../api/airQualityApi";
import { getDistanceInMeters } from "../utils/locationUtils";
import { getAqiStatus } from "../utils/airQualityUtils";

const MIN_DISTANCE_CHANGE_METERS = 500;
const AIR_QUALITY_REFRESH_INTERVAL_MS = 15 * 60 * 1000;

const formatAirQualityData = (airQualityData) => {
  const current = airQualityData.current;

  const europeanAqi = current.european_aqi;
  const aqiStatus = getAqiStatus(europeanAqi);

  return {
    europeanAqi,
    usAqi: current.us_aqi,
    pm10: current.pm10,
    pm25: current.pm2_5,
    carbonMonoxide: current.carbon_monoxide,
    nitrogenDioxide: current.nitrogen_dioxide,
    sulphurDioxide: current.sulphur_dioxide,
    ozone: current.ozone,
    uvIndex: current.uv_index,
    status: aqiStatus,
    lastUpdated: new Date().toISOString(),
  };
};

const shouldFetchAirQuality = (
  location,
  lastFetchedLocation,
  lastFetchedTime,
) => {
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
    timePassed >= AIR_QUALITY_REFRESH_INTERVAL_MS
  );
};

const useAirQuality = (location) => {
  const [airQuality, setAirQuality] = useState(null);
  const [isAirQualityLoading, setIsAirQualityLoading] = useState(false);
  const [airQualityError, setAirQualityError] = useState("");

  const lastFetchedLocationRef = useRef(null);
  const lastFetchedTimeRef = useRef(null);
  const latestLocationRef = useRef(null);

  const fetchAirQuality = useCallback(async (selectedLocation) => {
    if (!selectedLocation) {
      return;
    }

    try {
      setIsAirQualityLoading(true);
      setAirQualityError("");

      const airQualityData = await fetchAirQualityByCoordinates(
        selectedLocation.latitude,
        selectedLocation.longitude,
      );

      const formattedAirQuality = formatAirQualityData(airQualityData);

      setAirQuality(formattedAirQuality);
      lastFetchedLocationRef.current = selectedLocation;
      lastFetchedTimeRef.current = Date.now();
    } catch (error) {
      setAirQualityError(error.message || "Unable to fetch air quality.");
    } finally {
      setIsAirQualityLoading(false);
    }
  }, []);

  useEffect(() => {
    latestLocationRef.current = location;

    if (
      shouldFetchAirQuality(
        location,
        lastFetchedLocationRef.current,
        lastFetchedTimeRef.current,
      )
    ) {
      fetchAirQuality(location);
    }
  }, [location, fetchAirQuality]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (latestLocationRef.current) {
        fetchAirQuality(latestLocationRef.current);
      }
    }, AIR_QUALITY_REFRESH_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchAirQuality]);

  const retryAirQualityFetch = () => {
    if (latestLocationRef.current) {
      fetchAirQuality(latestLocationRef.current);
    }
  };

  return {
    airQuality,
    isAirQualityLoading,
    airQualityError,
    retryAirQualityFetch,
  };
};

export default useAirQuality;
