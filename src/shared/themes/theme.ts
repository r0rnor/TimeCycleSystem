import { createContext } from "@rbxts/react";
import { EvergreenTheme } from "./EvergreenTheme";
import { PureDarkTheme } from "./PureDarkTheme";

export const THEMES = {
	evergreen: EvergreenTheme,
	pureDark: PureDarkTheme,
};

export const CurrentTheme = PureDarkTheme;
export const ThemeContext = createContext(CurrentTheme);

export type ThemeName = keyof typeof THEMES;

export const DEFAULT_THEME_NAME = "pureDark" as ThemeName;
