import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "shared/configs/data/defaultPlayerData";
import { ThemeName } from "shared/themes/theme";

export type ThemeState = Record<string, ThemeName>;

const INITIAL_STATE: ThemeState = {};

export const themeSlice = createProducer(INITIAL_STATE, {
	loadPlayerData: (state, playerId: string, data: PlayerData) => ({
		...state,
		[playerId]: data.theme,
	}),

	closePlayerData: (state, playerId: string) => {
		const newState = { ...state };

		delete newState[playerId];

		return newState;
	},

	setTheme: (state, playerId: string, theme: ThemeName) => {
		const newState = { ...state };

		newState[playerId] = theme;

		return newState;
	},
});
