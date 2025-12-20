import { createSelector } from "@rbxts/reflex";
import { selectTheme } from "./uiSelector";

export const selectPlayerData = (playerId: string) => {
	return createSelector(selectTheme(playerId), (theme) => {
		return {
			theme: theme,
		};
	});
};
