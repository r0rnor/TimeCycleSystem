import { describe, expect, it } from "@rbxts/jest-globals";
import { selectTheme } from "shared/store/selectors/uiSelector";
import { SharedState } from "shared/store";

const createMockState = (themeData: Record<string, string>): SharedState => {
	return {
		timeCycleSlice: {
			year: 0,
			season: "Spring",
			day: 0,
			timeOfDay: 300,
		},
		uiSlice: {
			theme: themeData,
		},
	} as SharedState;
};

describe("uiSelector", () => {
	describe("selectTheme", () => {
		it("should select theme for existing player", () => {
			const state = createMockState({
				Player_123: "evergreen",
			});
			const selector = selectTheme("Player_123");
			expect(selector(state)).toBe("evergreen");
		});

		it("should return undefined for non-existent player", () => {
			const state = createMockState({});
			const selector = selectTheme("NonExistentPlayer");
			expect(selector(state)).toBeUndefined();
		});

		it("should select different themes for different players", () => {
			const state = createMockState({
				Player_1: "evergreen",
				Player_2: "pureDark",
				Player_3: "highSkies",
			});

			expect(selectTheme("Player_1")(state)).toBe("evergreen");
			expect(selectTheme("Player_2")(state)).toBe("pureDark");
			expect(selectTheme("Player_3")(state)).toBe("highSkies");
		});

		it("should handle treetop theme", () => {
			const state = createMockState({
				Player_123: "treetop",
			});
			const selector = selectTheme("Player_123");
			expect(selector(state)).toBe("treetop");
		});

		it("should be case-sensitive for player IDs", () => {
			const state = createMockState({
				Player_ABC: "evergreen",
			});

			expect(selectTheme("Player_ABC")(state)).toBe("evergreen");
			expect(selectTheme("player_abc")(state)).toBeUndefined();
			expect(selectTheme("PLAYER_ABC")(state)).toBeUndefined();
		});

		it("should handle multiple players with same theme", () => {
			const state = createMockState({
				Player_1: "evergreen",
				Player_2: "evergreen",
				Player_3: "evergreen",
			});

			expect(selectTheme("Player_1")(state)).toBe("evergreen");
			expect(selectTheme("Player_2")(state)).toBe("evergreen");
			expect(selectTheme("Player_3")(state)).toBe("evergreen");
		});

		it("should handle empty theme state", () => {
			const state = createMockState({});
			const selector = selectTheme("AnyPlayer");
			expect(selector(state)).toBeUndefined();
		});

		it("should handle special characters in player ID", () => {
			const playerId = "Player_123-456_ABC";
			const state = createMockState({
				[playerId]: "pureDark",
			});
			const selector = selectTheme(playerId);
			expect(selector(state)).toBe("pureDark");
		});
	});

	describe("selector stability", () => {
		it("should return same value for multiple calls with same state", () => {
			const state = createMockState({
				Player_123: "evergreen",
			});
			const selector = selectTheme("Player_123");

			const result1 = selector(state);
			const result2 = selector(state);
			const result3 = selector(state);

			expect(result1).toBe(result2);
			expect(result2).toBe(result3);
		});

		it("should work correctly with many players", () => {
			const themeData: Record<string, string> = {};
			const themes = ["evergreen", "pureDark", "highSkies", "treetop"];

			for (let i = 0; i < 100; i++) {
				themeData[`Player_${i}`] = themes[i % themes.size()];
			}

			const state = createMockState(themeData);

			for (let i = 0; i < 100; i++) {
				const selector = selectTheme(`Player_${i}`);
				const expectedTheme = themes[i % themes.size()];
				expect(selector(state)).toBe(expectedTheme);
			}
		});
	});
});
