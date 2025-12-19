import { createProducer } from "@rbxts/reflex";
import { START_TIME_OF_DAY } from "shared/configs/timeCycle/TimeOfDay";

export const timeOfDaySlice = createProducer(START_TIME_OF_DAY, {
	setTimeOfDay: (_, time: number) => {
		return time;
	},
});
