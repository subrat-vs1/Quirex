export const THEME_STORAGE_KEY = "quirex-theme";

export const THEME_MODES = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark",
};

export const getSystemTheme = () => {
  if (typeof window === "undefined") {
    return THEME_MODES.LIGHT;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME_MODES.DARK
    : THEME_MODES.LIGHT;
};

export const getStoredThemeMode = () => {
  if (typeof window === "undefined") {
    return THEME_MODES.SYSTEM;
  }

  const storedValue = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedValue && Object.values(THEME_MODES).includes(storedValue)) {
    return storedValue;
  }

  return THEME_MODES.SYSTEM;
};
