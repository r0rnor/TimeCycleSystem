import React from "@rbxts/react";
import TimeIndicator from "./time-indicator";
import { selectYear } from "shared/store/selectors/timeCycleSelector";

export default function Year() {
	const toText = (value: number) => `Year: ${value}`;

	return (
		<TimeIndicator
			selector={selectYear}
			toText={toText}
		/>
	);
}
