import { store } from "server/store";
import { DAYS_PER_SEASON, SEASONS } from "shared/configs/timeCycle/Seasons";
import { SECONDS_PER_DAY } from "shared/configs/timeCycle/TimeOfDay";
import { selectDay, selectTimeOfDay, selectYear } from "shared/store/selectors/timeCycleSelector";
import { getSeasonIndex, setSeasonByIndex } from "./season-data-utils";

interface IncrementProperties {
	get: () => number;
	set: (value: number) => void;
	maxValue: number;

	incrementNextLevel: (value: number) => void;
	incrementValue?: number;
}

function increment(properties: IncrementProperties) {
	const incrementValue = properties.incrementValue ?? 1;

	const previousValue = properties.get();
	const additionResultValue = previousValue + incrementValue;

	const newValue = additionResultValue % properties.maxValue;

	const incrementNextValue = (additionResultValue - newValue) / properties.maxValue;

	if (incrementNextValue > 0) {
		properties.incrementNextLevel(incrementNextValue);
	}

	properties.set(newValue);
}

export function incrementTimeOfDay(incrementValue = 1) {
	increment({
		get: () => store.getState(selectTimeOfDay()),
		set: (value: number) => store.setTimeOfDay(value),
		maxValue: SECONDS_PER_DAY,

		incrementNextLevel: (value: number) => incrementDay(value),
		incrementValue,
	});
}

export function incrementDay(incrementValue = 1) {
	increment({
		get: () => store.getState(selectDay()),
		set: (value: number) => store.setDay(value),
		maxValue: DAYS_PER_SEASON,

		incrementNextLevel: (value: number) => incrementSeason(value),
		incrementValue,
	});
}

export function incrementSeason(incrementValue = 1) {
	const getSeasonIndexCallback = () => getSeasonIndex();
	const setIndexSeasonCallback = (index: number) => setSeasonByIndex(index);

	increment({
		get: getSeasonIndexCallback,
		set: setIndexSeasonCallback,
		maxValue: SEASONS.length,

		incrementNextLevel: (value: number) => incrementYear(value),
		incrementValue,
	});
}

export function incrementYear(incrementValue = 1) {
	const currentYear = store.getState(selectYear());
	const nextYear = currentYear + incrementValue;

	store.setYear(nextYear);
}
