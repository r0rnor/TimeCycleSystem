import React from "@rbxts/react";
import TimeIndicator from "./time-indicator";
import { selectSeason } from "shared/store/selectors/timeCycleSelector";

export default function CurrentSeason() {
	return (
		<TimeIndicator
			selector={selectSeason}
			toText={(value) => `Season: ${value}`}
		/>
	);
}
