import { CombineStates } from "@rbxts/reflex";
import { timeCycleSlice } from "./slices/timeCycleSlice";
import { uiSlice } from "./slices/uiSlice";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	timeCycleSlice,
	uiSlice,
};
