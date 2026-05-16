const iconMap = {
  sunny: "☀️",
  cloudy: "☁️",
  rainy: "🌧️",
  storm: "⛈️",
  mist: "🌫️",
  snow: "❄️",
  night: "🌙",
  default: "🌍",
};

const WeatherIcon = (props) => {
  const { type = "default", className = "" } = props;

  return (
    <div className={`custom-weather-icon ${className}`}>
      <span>{iconMap[type] || iconMap.default}</span>
    </div>
  );
};

export default WeatherIcon;
