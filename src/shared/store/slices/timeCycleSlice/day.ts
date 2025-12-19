import { createProducer } from "@rbxts/reflex";
import { START_DAY } from "shared/configs/timeCycle/Days";

export const daySlice = createProducer(START_DAY, {
	setDay: (_, day: number) => {
		return day;
	},
});
