import { store } from "client/store";
import { SEASONS } from "shared/configs/timeCycle/Seasons";
import { selectSeason } from "shared/store/selectors/timeCycleSelector";

export function getSeasonIndex() {
	const season = store.getState(selectSeason());
	const index = SEASONS.indexOf(season);

	return index;
}

export function setSeasonByIndex(index: number) {
	const season = SEASONS[index % SEASONS.length];

	store.setSeason(season);
}
