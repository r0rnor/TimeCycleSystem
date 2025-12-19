import { MINUTES_PER_DAY } from "shared/configs/timeCycle/TimeOfDay";

const DEFAULT_OUTPUT_TEMPLATE = "Time of Day: %02s:%02s";
const AM_PM_OUTPUT_TEMPLATE = "Time of Day: %02s:%02s %s";

const OUTPUT_TIME_MULTIPLIER = 24 / MINUTES_PER_DAY;

export function timeOfDayToText(displayMinutes: number, useAmPm = false) {
	displayMinutes = math.round(displayMinutes * OUTPUT_TIME_MULTIPLIER);

	let displayHours = math.round(displayMinutes / 60) % 24;

	displayMinutes %= 60;

	if (!useAmPm) {
		const text = DEFAULT_OUTPUT_TEMPLATE.format(displayHours, displayMinutes % 60);

		return text;
	}

	const amPm = displayHours >= 12 ? "PM" : "AM";

	displayHours %= 12;
	displayHours = displayHours === 0 ? 12 : displayHours;

	const text = AM_PM_OUTPUT_TEMPLATE.format(displayHours, displayMinutes % 60, amPm);

	return text;
}
