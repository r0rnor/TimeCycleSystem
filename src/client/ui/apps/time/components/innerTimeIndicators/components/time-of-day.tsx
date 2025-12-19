import { selectTimeOfDay } from "shared/store/selectors/timeCycleSelector";
import TimeIndicator from "./time-indicator";
import React from "@rbxts/react";
import { timeOfDayToText } from "shared/utils/timeCycle/time-display-utils";

export default function TimeOfDay() {
	return (
		<TimeIndicator
			selector={selectTimeOfDay}
			toText={timeOfDayToText}
		/>
	);
}
