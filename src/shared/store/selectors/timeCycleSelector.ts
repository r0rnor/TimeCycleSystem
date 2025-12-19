import { SharedState } from "..";

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
