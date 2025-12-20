import { describe, expect, it } from "@rbxts/jest-globals";
import { seasonSlice } from "shared/store/slices/timeCycleSlice/season";
import { SEASONS, START_SEASON } from "shared/configs/timeCycle/Seasons";

describe("seasonSlice", () => {
	it("should have correct initial state", () => {
		expect(START_SEASON).toBe("Spring");
	});

	it("should set season value", () => {
		const newSeason = "Summer";
		const newState = seasonSlice.setSeason(newSeason);
		expect(newState).toBe(newSeason);
	});

	it("should set all seasons correctly", () => {
		for (const season of SEASONS) {
			const newState = seasonSlice.setSeason(season);
			expect(newState).toBe(season);
		}
	});

	describe("setSeasonByIndex", () => {
		it("should set season by index 0 (Spring)", () => {
			const newState = seasonSlice.setSeasonByIndex(0);
			expect(newState).toBe("Spring");
		});

		it("should set season by index 1 (Summer)", () => {
			const newState = seasonSlice.setSeasonByIndex(1);
			expect(newState).toBe("Summer");
		});

		it("should set season by index 2 (Autumn)", () => {
			const newState = seasonSlice.setSeasonByIndex(2);
			expect(newState).toBe("Autumn");
		});

		it("should set season by index 3 (Winter)", () => {
			const newState = seasonSlice.setSeasonByIndex(3);
			expect(newState).toBe("Winter");
		});

		it("should wrap around when index is 4 (back to Spring)", () => {
			const newState = seasonSlice.setSeasonByIndex(4);
			expect(newState).toBe("Spring");
		});

		it("should wrap around when index is 5 (Summer)", () => {
			const newState = seasonSlice.setSeasonByIndex(5);
			expect(newState).toBe("Summer");
		});

		it("should handle large index values", () => {
			const largeIndex = 100;
			const expectedIndex = largeIndex % SEASONS.size();
			const expectedSeason = SEASONS[expectedIndex];
			const newState = seasonSlice.setSeasonByIndex(largeIndex);
			expect(newState).toBe(expectedSeason);
		});

		it("should handle negative index values with modulo", () => {
			const newState = seasonSlice.setSeasonByIndex(-1);
			expect(SEASONS.includes(newState)).toBe(true);
		});
	});

	it("should override previous season", () => {
		const state1 = seasonSlice.setSeason("Summer");
		const state2 = seasonSlice.setSeason("Winter");
		expect(state1).toBe("Summer");
		expect(state2).toBe("Winter");
	});
});
