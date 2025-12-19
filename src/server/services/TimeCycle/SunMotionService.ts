import { Service, OnStart } from "@flamework/core";
import { Lighting } from "@rbxts/services";
import { store } from "server/store";
import { MINUTES_PER_DAY, SECONDS_PER_MINUTE } from "shared/configs/timeCycle/TimeOfDay";
import { selectTimeOfDay } from "shared/store/selectors/timeCycleSelector";

@Service({})
export class SunMotionService implements OnStart {
	onStart() {
		store.subscribe(selectTimeOfDay(), (timeOfDay) => {
			this.updateSunPosition(timeOfDay);
		});
	}

	private updateSunPosition(seconds: number) {
		const minutes = seconds / SECONDS_PER_MINUTE;

		const dayProgress = minutes / MINUTES_PER_DAY;

		const hours = dayProgress * 24;

		Lighting.ClockTime = hours;
	}
}
