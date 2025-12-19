import { createProducer } from "@rbxts/reflex";
import { Season, START_SEASON } from "shared/configs/timeCycle/Seasons";

export const seasonSlice = createProducer(START_SEASON, {
	setSeason: (_, season: Season) => {
		return season;
	},
});
