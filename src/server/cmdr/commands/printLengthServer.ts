import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";
import { selectDayOfYear } from "shared/store/selectors/timeCycleSelector";
import { getDayNightInfo } from "shared/utils/timeCycle/day-duration-utils";

export = function (context: CommandContext, dayPhase: "day" | "night", day?: number) {
	const currentDay = day ?? store.getState(selectDayOfYear());
	const lengthInfo = getDayNightInfo(currentDay);

	print(`The ${dayPhase} length is ${lengthInfo.rounded[dayPhase]} (${lengthInfo.decimal[dayPhase]}) minutes.`);
};
