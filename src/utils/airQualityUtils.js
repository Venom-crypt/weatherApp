export const getAqiStatus = (aqi) => {
  if (aqi === null || aqi === undefined) {
    return {
      label: "Unknown",
      description: "Air quality data is not available.",
      level: "unknown",
    };
  }

  if (aqi <= 20) {
    return {
      label: "Good",
      description: "Air quality is clean and comfortable.",
      level: "good",
    };
  }

  if (aqi <= 40) {
    return {
      label: "Fair",
      description: "Air quality is acceptable for most people.",
      level: "fair",
    };
  }

  if (aqi <= 60) {
    return {
      label: "Moderate",
      description: "Sensitive people should reduce long outdoor activity.",
      level: "moderate",
    };
  }

  if (aqi <= 80) {
    return {
      label: "Poor",
      description: "Limit outdoor activity if you feel discomfort.",
      level: "poor",
    };
  }

  if (aqi <= 100) {
    return {
      label: "Very Poor",
      description: "Avoid heavy outdoor activity.",
      level: "very-poor",
    };
  }

  return {
    label: "Extremely Poor",
    description: "Stay indoors if possible and avoid outdoor exertion.",
    level: "extreme",
  };
};
