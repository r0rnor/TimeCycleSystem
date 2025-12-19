import { selectDayOfYear } from "shared/store/selectors/timeCycleSelector";
import TimeIndicator from "./time-indicator";
import React from "@rbxts/react";

export default function DayOfYear() {
	const toText = (value: number) => `Day of Year: ${value}`;

	return (
		<TimeIndicator
			selector={selectDayOfYear}
			toText={toText}
		/>
	);
}
