import { themes } from "../utils/themeUtils";

const ThemeToggle = (props) => {
  const { theme, setTheme } = props;

  const isDarkTheme = theme === themes.DARK;

  const onToggleTheme = () => {
    setTheme(isDarkTheme ? themes.LIGHT : themes.DARK);
  };

  return (
    <button className="theme-toggle" type="button" onClick={onToggleTheme}>
      <span className="theme-icon">{isDarkTheme ? "🌙" : "☀️"}</span>
      <span>{isDarkTheme ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeToggle;
