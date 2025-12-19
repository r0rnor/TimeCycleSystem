import { EQUINOX_DAY_OF_SEASON } from "shared/configs/timeCycle/Days";
import { AVERAGE_MINUTES_IN_DAY, MINUTES_IN_DAY_AMPLITUDE, MINUTES_PER_DAY } from "shared/configs/timeCycle/TimeOfDay";
import { DAYS_PER_YEAR } from "shared/configs/timeCycle/Years";

export function getDaylightDuration(day: number) {
	const dayWithEquinoxOffset = day + EQUINOX_DAY_OF_SEASON;
	const daysAlpha = (dayWithEquinoxOffset / DAYS_PER_YEAR) % 1;

	const angle = daysAlpha * 2 * math.pi;
	const sineValue = math.sin(angle);

	const daylightDurationAddition = sineValue * MINUTES_IN_DAY_AMPLITUDE;
	const daylightDuration = AVERAGE_MINUTES_IN_DAY + daylightDurationAddition;

	return daylightDuration;
}

export function getNightDuration(day: number) {
	const daylightDuration = getDaylightDuration(day);

	return MINUTES_PER_DAY - daylightDuration;
}

export function getDayNightInfo(day: number) {
	const daylightDuration = getDaylightDuration(day);
	const nightDuration = getNightDuration(day);

	const daylightRounded = math.round(daylightDuration);
	const nightRounded = math.round(nightDuration);

	return {
		decimal: {
			day: daylightDuration,
			night: nightDuration,
		},
		rounded: {
			day: daylightRounded,
			night: nightRounded,
		},
	};
}
