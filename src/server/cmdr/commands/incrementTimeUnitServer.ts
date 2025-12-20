import { CommandContext } from "@rbxts/cmdr";
import { incrementDay, incrementSeason, incrementTimeOfDay, incrementYear } from "server/utils/timeCycle/time-cycle-data-utils";

export = function (context: CommandContext, timeUnit: "TimeOfDay" | "Day" | "Season" | "Year", value?: number) {
	if (timeUnit === "TimeOfDay") {
		incrementTimeOfDay(value);
	} else if (timeUnit === "Day") {
		incrementDay(value);
	} else if (timeUnit === "Season") {
		incrementSeason(value);
	} else {
		incrementYear(value);
	}
};
