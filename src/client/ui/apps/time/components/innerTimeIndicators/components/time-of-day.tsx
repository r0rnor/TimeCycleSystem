import { selectTimeOfDay } from "shared/store/selectors/timeCycleSelector";
import TimeIndicator from "./time-indicator";
import React from "@rbxts/react";
import { MINUTES_PER_DAY } from "shared/configs/timeCycle/TimeOfDay";

const OUTPUT_TEMPLATE = "Time of Day: %02s:%02s";

export default function TimeOfDay() {
	const toText = (displayMinutes: number) => {
		const multiplier = 24 / MINUTES_PER_DAY;

		displayMinutes = math.round(displayMinutes * multiplier);

		const displayHours = math.round(displayMinutes / 60) % 24;

		return OUTPUT_TEMPLATE.format(displayHours, displayMinutes % 60);
	};

	return (
		<TimeIndicator
			selector={selectTimeOfDay}
			toText={toText}
		/>
	);
}
