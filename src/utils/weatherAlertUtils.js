export const generateWeatherAlerts = (currentWeather, airQuality) => {
  const alerts = [];

  if (!currentWeather) {
    return alerts;
  }

  if (currentWeather.weatherCode >= 95) {
    alerts.push({
      id: "storm",
      type: "danger",
      title: "Thunderstorm Alert",
      message:
        "Thunderstorm conditions detected. Avoid open areas if possible.",
      icon: "⛈️",
    });
  }

  if (currentWeather.rain >= 5 || currentWeather.precipitation >= 5) {
    alerts.push({
      id: "heavy-rain",
      type: "warning",
      title: "Heavy Rain Alert",
      message:
        "Heavy rainfall is possible. Carry protection and avoid waterlogged areas.",
      icon: "🌧️",
    });
  }

  if (currentWeather.windSpeed >= 40) {
    alerts.push({
      id: "strong-wind",
      type: "warning",
      title: "Strong Wind Alert",
      message: "Strong winds detected. Be careful while travelling.",
      icon: "💨",
    });
  }

  if (currentWeather.temperature >= 38) {
    alerts.push({
      id: "heat",
      type: "warning",
      title: "Heat Alert",
      message:
        "High temperature detected. Stay hydrated and avoid direct afternoon sun.",
      icon: "🔥",
    });
  }

  if (airQuality?.europeanAqi >= 60) {
    alerts.push({
      id: "air-quality",
      type: "warning",
      title: "Air Quality Alert",
      message:
        "Air quality is not ideal. Sensitive people should reduce outdoor activity.",
      icon: "😷",
    });
  }

  if (airQuality?.uvIndex >= 8) {
    alerts.push({
      id: "uv",
      type: "warning",
      title: "High UV Alert",
      message: "UV index is high. Use sunscreen or avoid long direct sunlight.",
      icon: "☀️",
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      id: "clear",
      type: "good",
      title: "No Major Alerts",
      message: "Weather and air quality look manageable right now.",
      icon: "✅",
    });
  }

  return alerts;
};
