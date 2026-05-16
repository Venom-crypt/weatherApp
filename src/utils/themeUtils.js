export const themes = {
  DARK: "dark-theme",
  LIGHT: "light-theme",
};

const THEME_STORAGE_KEY = "weather_app_theme";

export const getStoredTheme = () => {
  return localStorage.getItem(THEME_STORAGE_KEY) || themes.DARK;
};

export const saveTheme = (theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};
