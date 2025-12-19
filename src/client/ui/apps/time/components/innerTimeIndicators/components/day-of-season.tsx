import { selectDay } from "shared/store/selectors/timeCycleSelector";
import TimeIndicator from "./time-indicator";
import React from "@rbxts/react";
import { DAYS_PER_SEASON } from "shared/configs/timeCycle/Seasons";

export default function DayOfSeason() {
	const toText = (day: number) => {
		const dayOfSeason = day % DAYS_PER_SEASON;

		return `Day of Season: ${dayOfSeason}`;
	};

	return (
		<TimeIndicator
			selector={selectDay}
			toText={toText}
		/>
	);
}
