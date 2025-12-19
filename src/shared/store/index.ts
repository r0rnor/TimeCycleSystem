import { CombineStates } from "@rbxts/reflex";
import { timeCycleSlice } from "./slices/timeCycleSlice";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	timeCycleSlice,
};
