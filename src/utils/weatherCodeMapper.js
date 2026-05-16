const weatherCodeMap = {
  0: {
    condition: "Clear Sky",
    icon: "☀️",
    iconType: "sunny",
    background: "sunny",
  },
  1: {
    condition: "Mainly Clear",
    icon: "🌤️",
    iconType: "sunny",
    background: "sunny",
  },
  2: {
    condition: "Partly Cloudy",
    icon: "⛅",
    iconType: "cloudy",
    background: "cloudy",
  },
  3: {
    condition: "Overcast",
    icon: "☁️",
    iconType: "cloudy",
    background: "cloudy",
  },
  45: {
    condition: "Fog",
    icon: "🌫️",
    iconType: "mist",
    background: "mist",
  },
  48: {
    condition: "Rime Fog",
    icon: "🌫️",
    iconType: "mist",
    background: "mist",
  },
  51: {
    condition: "Light Drizzle",
    icon: "🌦️",
    iconType: "rainy",
    background: "rainy",
  },
  53: {
    condition: "Moderate Drizzle",
    icon: "🌦️",
    iconType: "rainy",
    background: "rainy",
  },
  55: {
    condition: "Dense Drizzle",
    icon: "🌧️",
    iconType: "rainy",
    background: "rainy",
  },
  61: {
    condition: "Slight Rain",
    icon: "🌧️",
    iconType: "rainy",
    background: "rainy",
  },
  63: {
    condition: "Moderate Rain",
    icon: "🌧️",
    iconType: "rainy",
    background: "rainy",
  },
  65: {
    condition: "Heavy Rain",
    icon: "⛈️",
    iconType: "storm",
    background: "rainy",
  },
  71: {
    condition: "Slight Snow",
    icon: "🌨️",
    iconType: "snow",
    background: "snow",
  },
  73: {
    condition: "Moderate Snow",
    icon: "🌨️",
    iconType: "snow",
    background: "snow",
  },
  75: {
    condition: "Heavy Snow",
    icon: "❄️",
    iconType: "snow",
    background: "snow",
  },
  80: {
    condition: "Slight Rain Showers",
    icon: "🌦️",
    iconType: "rainy",
    background: "rainy",
  },
  81: {
    condition: "Moderate Rain Showers",
    icon: "🌧️",
    iconType: "rainy",
    background: "rainy",
  },
  82: {
    condition: "Violent Rain Showers",
    icon: "⛈️",
    iconType: "storm",
    background: "storm",
  },
  95: {
    condition: "Thunderstorm",
    icon: "⛈️",
    iconType: "storm",
    background: "storm",
  },
  96: {
    condition: "Thunderstorm With Hail",
    icon: "⛈️",
    iconType: "storm",
    background: "storm",
  },
  99: {
    condition: "Severe Thunderstorm With Hail",
    icon: "🌩️",
    iconType: "storm",
    background: "storm",
  },
};

export const getWeatherInfo = (weatherCode) => {
  return (
    weatherCodeMap[weatherCode] || {
      condition: "Unknown Weather",
      icon: "🌍",
      iconType: "default",
      background: "default",
    }
  );
};
