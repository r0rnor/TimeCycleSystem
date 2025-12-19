import { SharedState } from "..";

export const selectTheme = (playerId: string) => {
	return (state: SharedState) => {
		return state.uiSlice.theme[playerId];
	};
};
