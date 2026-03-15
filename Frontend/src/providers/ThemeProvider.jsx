import { createContext, useEffect, useMemo, useState } from "react";
import {
  getStoredThemeMode,
  getSystemTheme,
  THEME_MODES,
  THEME_STORAGE_KEY,
} from "../utils/theme";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(getStoredThemeMode);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event) => {
      setSystemTheme(event.matches ? THEME_MODES.DARK : THEME_MODES.LIGHT);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const resolvedTheme =
    themeMode === THEME_MODES.SYSTEM ? systemTheme : themeMode;

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [resolvedTheme, themeMode]);

  const value = useMemo(
    () => ({
      themeMode,
      resolvedTheme,
      setThemeMode,
      toggleTheme: () => {
        setThemeMode((currentMode) => {
          if (currentMode === THEME_MODES.SYSTEM) {
            return systemTheme === THEME_MODES.DARK
              ? THEME_MODES.LIGHT
              : THEME_MODES.DARK;
          }

          return currentMode === THEME_MODES.DARK
            ? THEME_MODES.LIGHT
            : THEME_MODES.DARK;
        });
      },
    }),
    [resolvedTheme, systemTheme, themeMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
