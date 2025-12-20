import { SUNRISE_CLOCK_TIME, SUNSET_CLOCK_TIME } from "shared/configs/timeCycle/ClockTime";
import { EQUINOX_DAY_OF_SEASON } from "shared/configs/timeCycle/Days";
import { DAYS_PER_SEASON } from "shared/configs/timeCycle/Seasons";
import { AVERAGE_MINUTES_IN_DAY, MINUTES_IN_DAY_AMPLITUDE, MINUTES_PER_DAY, SECONDS_PER_MINUTE } from "shared/configs/timeCycle/TimeOfDay";
import { DAYS_PER_YEAR } from "shared/configs/timeCycle/Years";
import { mapRange } from "../math/math-utils";

export function getDaylightDuration(dayOfYear: number) {
	const dayWithEquinoxOffset = dayOfYear + EQUINOX_DAY_OF_SEASON;
	const daysAlpha = (dayWithEquinoxOffset / DAYS_PER_YEAR) % 1;

	const angle = daysAlpha * 2 * math.pi;
	const sineValue = math.sin(angle);

	const daylightDurationAddition = sineValue * MINUTES_IN_DAY_AMPLITUDE;
	const daylightDuration = AVERAGE_MINUTES_IN_DAY + daylightDurationAddition;

	return daylightDuration;
}

export function getNightDuration(dayOfYear: number) {
	const daylightDuration = getDaylightDuration(dayOfYear);

	return MINUTES_PER_DAY - daylightDuration;
}

export function getDayNightInfo(dayOfYear: number) {
	const daylightDuration = getDaylightDuration(dayOfYear);
	const nightDuration = getNightDuration(dayOfYear);

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

export function getSunsetTime(dayOfYear: number) {
	const deltaTime = getDeltaTime(dayOfYear);
	const sunsetTime = SUNSET_CLOCK_TIME + deltaTime;

	return sunsetTime;
}

export function getSunriseTime(dayOfYear: number) {
	const deltaTime = getDeltaTime(dayOfYear);
	const sunriseTime = SUNRISE_CLOCK_TIME - deltaTime;

	return sunriseTime;
}

function getDeltaTime(dayOfYear: number) {
	const daylightDuration = getDaylightDuration(dayOfYear);

	const minInTime = AVERAGE_MINUTES_IN_DAY - MINUTES_IN_DAY_AMPLITUDE;
	const maxInTime = AVERAGE_MINUTES_IN_DAY + MINUTES_IN_DAY_AMPLITUDE;

	const minOutDeltaTime = -MINUTES_IN_DAY_AMPLITUDE / 2;
	const maxOutDeltaTime = MINUTES_IN_DAY_AMPLITUDE / 2;

	const deltaTime = mapRange(daylightDuration, minInTime, maxInTime, minOutDeltaTime, maxOutDeltaTime);

	return deltaTime;
}

export function timeOfDaySecondsToClockTime(seconds: number) {
	const totalMinutes = seconds / SECONDS_PER_MINUTE;
	const multiplier = 24 / MINUTES_PER_DAY;

	const clockTime = totalMinutes * multiplier;

	return clockTime;
}
