import { store } from "server/store";
import { SEASONS } from "shared/configs/timeCycle/Seasons";
import { SECONDS_PER_DAY } from "shared/configs/timeCycle/TimeOfDay";
import { selectDay, selectSeason, selectTimeOfDay, selectYear } from "shared/store/selectors/timeCycleSelector";

export function incrementTimeOfDay(incrementValue = 1) {
	const currentTimeOfDay = store.getState(selectTimeOfDay());
	const nextTimeOfDay = (currentTimeOfDay + incrementValue) % SECONDS_PER_DAY;

	const shouldIncrementDay = nextTimeOfDay < currentTimeOfDay;

	if (shouldIncrementDay) {
		incrementDay();
	}

	store.setTimeOfDay(nextTimeOfDay);
}

export function incrementDay(incrementValue = 1) {
	const currentDay = store.getState(selectDay());
	const nextDay = currentDay + incrementValue;

	const shouldIncrementSeason = nextDay < currentDay;

	if (shouldIncrementSeason) {
		incrementSeason();
	}

	store.setDay(nextDay);
}

export function incrementSeason(incrementValue = 1) {
	const currentSeason = store.getState(selectSeason());
	const currentSeasonIndex = SEASONS.indexOf(currentSeason);

	const nextSeasonIndex = (currentSeasonIndex + incrementValue) % SEASONS.length;
	const nextSeason = SEASONS[nextSeasonIndex];

	const shouldIncrementYear = nextSeasonIndex < currentSeasonIndex;

	if (shouldIncrementYear) {
		incrementYear();
	}

	store.setSeason(nextSeason);
}

export function incrementYear(incrementValue = 1) {
	const currentYear = store.getState(selectYear());
	const nextYear = currentYear + incrementValue;

	store.setYear(nextYear);
}
