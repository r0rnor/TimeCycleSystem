import { createProducer } from "@rbxts/reflex";
import { ThemeName } from "shared/themes/theme";

export type ThemeState = Record<string, ThemeName>;

const INITIAL_STATE: ThemeState = {};

export const themeSlice = createProducer(INITIAL_STATE, {
	setTheme: (state, playerId: string, theme: ThemeName) => ({
		...state,
		[playerId]: theme,
	}),
});
