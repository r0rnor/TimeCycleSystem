import { selectDay } from "shared/store/selectors/timeCycleSelector";
import TimeIndicator from "./time-indicator";
import React from "@rbxts/react";
import { getSeasonIndex } from "client/ui/utils/timeCycle/season-data-utils";
import { DAYS_PER_SEASON } from "shared/configs/timeCycle/Seasons";

export default function DayOfYear() {
	const toText = (value: number) => {
		const seasonIndex = getSeasonIndex();
		const dayOfYear = seasonIndex * DAYS_PER_SEASON + value;

		return `Day of Year: ${dayOfYear}`;
	};

	return (
		<TimeIndicator
			selector={selectDay}
			toText={toText}
		/>
	);
}
