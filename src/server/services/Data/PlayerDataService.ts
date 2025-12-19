import { OnInit, Service } from "@flamework/core";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Players, RunService } from "@rbxts/services";
import { store } from "server/store";
import defaultPlayerData, { PlayerData } from "shared/configs/data/defaultPlayerData";
import { selectPlayerData } from "shared/store/selectors/dataSelector";
import { forEveryPlayer } from "shared/utils/functions/forEveryPlayer";

let DataStoreName = "Data";
const KEY_TEMPLATE = "%d_Data";

if (RunService.IsStudio()) DataStoreName = "Testing";

@Service()
export class PlayerDataService implements OnInit {
	private profileStore = ProfileService.GetProfileStore(DataStoreName, defaultPlayerData);
	private profiles = new Map<Player, Profile<PlayerData>>();

	onInit() {
		forEveryPlayer(
			(player) => this.createProfile(player),
			(player) => this.removeProfile(player),
		);
	}

	private createProfile(player: Player) {
		const userId = tostring(player.UserId);
		const profileKey = KEY_TEMPLATE.format(userId);
		const profile = this.profileStore.LoadProfileAsync(profileKey);

		const allProfiles = this.getAllProfiles();

		if (!profile) return player.Kick();

		profile.ListenToRelease(() => this.onRelease(player));

		profile.AddUserId(tonumber(userId)!);
		profile.Reconcile();

		allProfiles.set(player, profile);
		store.loadPlayerData(userId, profile.Data);

		const unsubscribe = store.subscribe(selectPlayerData(userId), (save) => {
			if (save) profile.Data = save;
		});

		Players.PlayerRemoving.Connect((player) => {
			if (player === player) unsubscribe();
		});
	}

	private onRelease(player: Player) {
		const userId = tostring(player.UserId);

		this.profiles.delete(player);

		store.closePlayerData(userId);

		player.Kick();
	}

	private removeProfile(player: Player) {
		const profile = this.getProfile(player);

		profile?.Release();
	}

	getProfile(player: Player) {
		const profiles = this.getAllProfiles();

		return profiles.get(player);
	}

	getAllProfiles() {
		return this.profiles;
	}
}
