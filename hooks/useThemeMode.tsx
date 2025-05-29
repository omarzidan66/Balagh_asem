import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = context;

  return {
    theme,           // "light" أو "dark"
    toggleTheme,     // دالة التبديل
    isDark: theme === "dark", // خاصية إضافية للتحقق
  };
};