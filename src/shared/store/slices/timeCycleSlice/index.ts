import { combineProducers } from "@rbxts/reflex";
import { yearSlice } from "./year";
import { daySlice } from "./day";
import { seasonSlice } from "./season";
import { timeOfDaySlice } from "./timeOfDay";

export const timeCycleSlice = combineProducers({
	year: yearSlice,
	season: seasonSlice,
	day: daySlice,
	timeOfDay: timeOfDaySlice,
});
