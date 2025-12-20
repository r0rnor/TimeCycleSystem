import { createSelector } from "@rbxts/reflex";
import { SharedState } from "..";
import { DAYS_PER_SEASON, SEASONS } from "shared/configs/timeCycle/Seasons";

export const selectDay = () => {
	return (state: SharedState) => {
		return state.timeCycleSlice.day;
	};
};

export const selectYear = () => {
	return (state: SharedState) => {
		return state.timeCycleSlice.year;
	};
};

export const selectSeason = () => {
	return (state: SharedState) => {
		return state.timeCycleSlice.season;
	};
};

export const selectTimeOfDay = () => {
	return (state: SharedState) => {
		return state.timeCycleSlice.timeOfDay;
	};
};

export const selectSeasonIndex = () => {
	return createSelector(selectSeason(), (season) => {
		return SEASONS.indexOf(season);
	});
};

export const selectDayOfYear = () => {
	return createSelector(selectDay(), selectSeasonIndex(), (day, seasonIndex) => {
		return seasonIndex * DAYS_PER_SEASON + day;
	});
};
