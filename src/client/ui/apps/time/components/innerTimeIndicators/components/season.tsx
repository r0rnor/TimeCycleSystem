import React from "@rbxts/react";
import TimeIndicator from "./time-indicator";
import { selectSeason } from "shared/store/selectors/timeCycleSelector";

export default function Season() {
	const toText = (value: string) => `Season: ${value}`;

	return (
		<TimeIndicator
			selector={selectSeason}
			toText={toText}
		/>
	);
}
