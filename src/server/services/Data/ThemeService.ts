import { Service, OnStart } from "@flamework/core";
import { Events } from "server/network";
import { store } from "server/store";

@Service({})
export class ThemeService implements OnStart {
	onStart() {
		Events.setTheme.connect((player, themeName) => {
			const playerId = tostring(player);

			store.setTheme(playerId, themeName);
		});
	}
}
