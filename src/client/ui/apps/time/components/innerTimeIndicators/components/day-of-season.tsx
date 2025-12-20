import { selectDay } from "shared/store/selectors/timeCycleSelector";
import TimeIndicator from "./time-indicator";
import React from "@rbxts/react";

export default function DayOfSeason() {
	const toText = (day: number) => `Day of Season: ${day}`;

	return (
		<TimeIndicator
			selector={selectDay}
			toText={toText}
		/>
	);
}
