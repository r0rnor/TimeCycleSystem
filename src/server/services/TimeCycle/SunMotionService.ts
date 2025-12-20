import { Service, OnStart } from "@flamework/core";
import { Lighting, TweenService } from "@rbxts/services";
import { store } from "server/store";
import { DAY_CLOCK_TIME, NIGHT_CLOCK_TIME, SUN_MOVEMENT_TWEEN_INFO } from "shared/configs/timeCycle/ClockTime";
import { selectDayOfYear, selectTimeOfDay } from "shared/store/selectors/timeCycleSelector";
import { getSunriseTime, getSunsetTime, timeOfDaySecondsToClockTime } from "shared/utils/timeCycle/day-duration-utils";

@Service({})
export class SunMotionService implements OnStart {
	private isMoving = false;

	onStart() {
		store.subscribe(selectTimeOfDay(), (timeOfDay) => {
			this.updateSunPosition(timeOfDay);
		});
	}

	getIsMoving() {
		return this.isMoving;
	}

	private updateSunPosition(seconds: number) {
		const currentClockTime = this.getCurrentClockTime();
		const resultClockTime = this.getResultClockTime(seconds);
		const isMoving = this.getIsMoving();

		if (currentClockTime !== resultClockTime && !isMoving) {
			this.setClockTime(resultClockTime);
		}
	}

	private getCurrentClockTime() {
		return Lighting.ClockTime;
	}

	private getResultClockTime(seconds: number) {
		const dayOfYear = store.getState(selectDayOfYear());

		const sunriseTime = getSunriseTime(dayOfYear);
		const sunsetTime = getSunsetTime(dayOfYear);

		const currentClockTime = timeOfDaySecondsToClockTime(seconds);

		const isDaytime = currentClockTime >= sunriseTime && currentClockTime < sunsetTime;

		return isDaytime ? DAY_CLOCK_TIME : NIGHT_CLOCK_TIME;
	}

	private setClockTime(clockTime: number) {
		this.setIsMoving(true);

		const tween = TweenService.Create(Lighting, SUN_MOVEMENT_TWEEN_INFO, {
			ClockTime: clockTime,
		});

		tween.Play();
		tween.Completed.Connect(() => {
			this.setIsMoving(false);
		});
	}

	private setIsMoving(value: boolean) {
		this.isMoving = value;
	}
}
