import { useThemeMode } from "../../hooks/useThemeMode";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary dark:bg-muted text-secondary-foreground dark:text-muted-foreground"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;