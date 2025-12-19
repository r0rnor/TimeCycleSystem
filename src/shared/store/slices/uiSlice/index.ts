import { combineProducers } from "@rbxts/reflex";
import { themeSlice } from "./theme";

export const uiSlice = combineProducers({
	theme: themeSlice,
});
