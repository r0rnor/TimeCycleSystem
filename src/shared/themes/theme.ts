import { createContext } from "@rbxts/react";
import { EvergreenTheme } from "./presets/EvergreenTheme";
import { PureDarkTheme } from "./presets/PureDarkTheme";
import { HighSkiesTheme } from "./presets/HighSkiesTheme";
import { TreeTopTheme } from "./presets/TreeTopTheme";

export const THEMES = {
	evergreen: EvergreenTheme,
	pureDark: PureDarkTheme,
	highSkies: HighSkiesTheme,
	treetop: TreeTopTheme,
};

export const CurrentTheme = PureDarkTheme;
export const ThemeContext = createContext(CurrentTheme);

export type ThemeName = keyof typeof THEMES;

export const DEFAULT_THEME_NAME = "pureDark" as ThemeName;
