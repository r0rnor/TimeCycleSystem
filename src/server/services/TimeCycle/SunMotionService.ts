import { Service, OnStart } from "@flamework/core";
import { Lighting } from "@rbxts/services";
import { store } from "server/store";
import { DAY_CLOCK_TIME, NIGHT_CLOCK_TIME } from "shared/configs/timeCycle/ClockTime";
import { selectDayOfYear, selectTimeOfDay } from "shared/store/selectors/timeCycleSelector";
import { getSunriseTime, getSunsetTime, timeOfDaySecondsToClockTime } from "shared/utils/timeCycle/day-duration-utils";

@Service({})
export class SunMotionService implements OnStart {
	onStart() {
		store.subscribe(selectTimeOfDay(), (timeOfDay) => {
			this.updateSunPosition(timeOfDay);
		});
	}

	private updateSunPosition(seconds: number) {
		const clockTime = this.getClockTime(seconds);

		Lighting.ClockTime = clockTime;
	}

	private getClockTime(seconds: number) {
		const dayOfYear = store.getState(selectDayOfYear());

		const sunriseTime = getSunriseTime(dayOfYear);
		const sunsetTime = getSunsetTime(dayOfYear);

		const currentClockTime = timeOfDaySecondsToClockTime(seconds);

		const isDaytime = currentClockTime >= sunriseTime && currentClockTime < sunsetTime;

		return isDaytime ? DAY_CLOCK_TIME : NIGHT_CLOCK_TIME;
	}
}
