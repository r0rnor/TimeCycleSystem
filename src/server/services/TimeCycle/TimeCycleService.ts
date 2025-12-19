import { Service, OnStart } from "@flamework/core";
import { RunService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { store } from "server/store";
import { incrementTimeOfDay } from "server/utils/timeCycle/time-cycle-data-utils";
import { selectDay, selectSeason, selectTimeOfDay, selectYear } from "shared/store/selectors/timeCycleSelector";

@Service({})
export class TimeCycleService implements OnStart {
	private trove = new Trove();

	onStart() {
		store.subscribe(selectTimeOfDay(), (timeOfDay) => {
			print(`Time of Day updated: ${timeOfDay}`);
		});

		store.subscribe(selectDay(), (day) => {
			print(`Day updated: ${day}`);
		});

		store.subscribe(selectSeason(), (season) => {
			print(`Season updated: ${season}`);
		});

		store.subscribe(selectYear(), (year) => {
			print(`Year updated: ${year}`);
		});

		this.startTimeCycle();
	}

	startTimeCycle() {
		const trove = this.getTrove();

		let currentTime = 0;

		trove.connect(RunService.Heartbeat, (deltaTime) => {
			currentTime += deltaTime;

			if (currentTime < 1) {
				return;
			}

			currentTime = currentTime % 1;

			incrementTimeOfDay(1);
		});
	}

	stopTimeCycle() {
		const trove = this.getTrove();

		trove.clean();
	}

	private getTrove() {
		return this.trove;
	}
}
