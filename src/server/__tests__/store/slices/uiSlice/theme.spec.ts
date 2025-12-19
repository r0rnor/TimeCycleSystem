import { describe, expect, it } from "@rbxts/jest-globals";
import { themeSlice, ThemeState } from "shared/store/slices/uiSlice/theme";
import { PlayerData } from "shared/configs/data/defaultPlayerData";
import { THEMES } from "shared/themes/theme";
import Object from "@rbxts/object-utils";

describe("themeSlice", () => {
	const testPlayerId1 = "Player_123";
	const testPlayerId2 = "Player_456";

	it("should have empty initial state", () => {
		const initialState: ThemeState = {};
		expect(initialState).toEqual({});
	});

	describe("loadPlayerData", () => {
		it("should load player data with theme", () => {
			const playerData: PlayerData = { theme: "evergreen" };
			const newState = themeSlice.loadPlayerData(testPlayerId1, playerData);
			expect(newState[testPlayerId1]).toBe("evergreen");
		});

		it("should load multiple players", () => {
			const state1 = themeSlice.loadPlayerData(testPlayerId1, { theme: "evergreen" });
			const state2 = themeSlice.loadPlayerData(testPlayerId2, { theme: "pureDark" });

			expect(state1[testPlayerId1]).toBe("evergreen");
			expect(state2[testPlayerId2]).toBe("pureDark");
		});

		it("should update existing player data", () => {
			const state1 = themeSlice.loadPlayerData(testPlayerId1, { theme: "evergreen" });
			const state2 = themeSlice.loadPlayerData(testPlayerId1, { theme: "highSkies" });

			expect(state1[testPlayerId1]).toBe("evergreen");
			expect(state2[testPlayerId1]).toBe("highSkies");
		});
	});

	describe("closePlayerData", () => {
		it("should remove player data", () => {
			const initialState: ThemeState = { [testPlayerId1]: "evergreen" };
			const newState = themeSlice.closePlayerData(testPlayerId1);
			expect(newState[testPlayerId1]).toBeUndefined();
		});

		it("should handle removing non-existent player", () => {
			const state = themeSlice.closePlayerData("NonExistentPlayer");
			expect(state.NonExistentPlayer).toBeUndefined();
		});
	});

	describe("setTheme", () => {
		it("should set theme for player", () => {
			const state = themeSlice.setTheme(testPlayerId1, "evergreen");
			expect(state[testPlayerId1]).toBe("evergreen");
		});

		it("should update existing theme", () => {
			const state1 = themeSlice.setTheme(testPlayerId1, "evergreen");
			const state2 = themeSlice.setTheme(testPlayerId1, "highSkies");

			expect(state1[testPlayerId1]).toBe("evergreen");
			expect(state2[testPlayerId1]).toBe("highSkies");
		});

		it("should handle all theme types", () => {
			Object.entries(THEMES).forEach(([themeName, _]) => {
				const state = themeSlice.setTheme(testPlayerId1, themeName);

				expect(state[testPlayerId1]).toBe(themeName);
			});
		});
	});
});
