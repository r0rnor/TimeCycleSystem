import { createProducer } from "@rbxts/reflex";
import { Season, SEASONS, START_SEASON } from "shared/configs/timeCycle/Seasons";

export const seasonSlice = createProducer(START_SEASON, {
	setSeason: (_, season: Season) => {
		return season;
	},

	setSeasonByIndex: (_, index: number) => {
		return SEASONS[index % SEASONS.size()];
	},
});
