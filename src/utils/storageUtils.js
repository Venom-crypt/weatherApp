const FAVORITE_CITIES_KEY = "weather_app_favorite_cities";
const RECENT_SEARCHES_KEY = "weather_app_recent_searches";

export const getStoredFavoriteCities = () => {
  const storedData = localStorage.getItem(FAVORITE_CITIES_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const saveFavoriteCities = (cities) => {
  localStorage.setItem(FAVORITE_CITIES_KEY, JSON.stringify(cities));
};

export const getStoredRecentSearches = () => {
  const storedData = localStorage.getItem(RECENT_SEARCHES_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const saveRecentSearches = (cities) => {
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(cities));
};
