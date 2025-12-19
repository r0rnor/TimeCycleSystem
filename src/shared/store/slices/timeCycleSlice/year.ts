import { createProducer } from "@rbxts/reflex";
import { START_YEAR } from "shared/configs/timeCycle/Years";

export const yearSlice = createProducer(START_YEAR, {
	setYear: (_, year: number) => {
		return year;
	},
});
