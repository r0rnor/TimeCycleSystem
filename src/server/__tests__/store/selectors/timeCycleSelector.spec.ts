import { describe, expect, it } from "@rbxts/jest-globals";
import { selectDay, selectYear, selectSeason, selectTimeOfDay, selectSeasonIndex, selectDayOfYear } from "shared/store/selectors/timeCycleSelector";
import { SharedState } from "shared/store";
import { DAYS_PER_SEASON } from "shared/configs/timeCycle/Seasons";

const createMockState = (overrides?: Partial<SharedState["timeCycleSlice"]>): SharedState => {
	return {
		timeCycleSlice: {
			year: 0,
			season: "Spring",
			day: 0,
			timeOfDay: 300,
			...overrides,
		},
		uiSlice: {
			theme: {},
		},
	} as SharedState;
};

describe("timeCycleSelector", () => {
	describe("selectDay", () => {
		it("should select day value", () => {
			const state = createMockState({ day: 15 });
			const selector = selectDay();
			expect(selector(state)).toBe(15);
		});

		it("should select zero day", () => {
			const state = createMockState({ day: 0 });
			const selector = selectDay();
			expect(selector(state)).toBe(0);
		});

		it("should select maximum day in season", () => {
			const state = createMockState({ day: DAYS_PER_SEASON - 1 });
			const selector = selectDay();
			expect(selector(state)).toBe(DAYS_PER_SEASON - 1);
		});
	});

	describe("selectYear", () => {
		it("should select year value", () => {
			const state = createMockState({ year: 42 });
			const selector = selectYear();
			expect(selector(state)).toBe(42);
		});

		it("should select zero year", () => {
			const state = createMockState({ year: 0 });
			const selector = selectYear();
			expect(selector(state)).toBe(0);
		});

		it("should select negative year", () => {
			const state = createMockState({ year: -5 });
			const selector = selectYear();
			expect(selector(state)).toBe(-5);
		});
	});

	describe("selectSeason", () => {
		it("should select Spring", () => {
			const state = createMockState({ season: "Spring" });
			const selector = selectSeason();
			expect(selector(state)).toBe("Spring");
		});

		it("should select Summer", () => {
			const state = createMockState({ season: "Summer" });
			const selector = selectSeason();
			expect(selector(state)).toBe("Summer");
		});

		it("should select Autumn", () => {
			const state = createMockState({ season: "Autumn" });
			const selector = selectSeason();
			expect(selector(state)).toBe("Autumn");
		});

		it("should select Winter", () => {
			const state = createMockState({ season: "Winter" });
			const selector = selectSeason();
			expect(selector(state)).toBe("Winter");
		});
	});

	describe("selectTimeOfDay", () => {
		it("should select time of day value", () => {
			const state = createMockState({ timeOfDay: 600 });
			const selector = selectTimeOfDay();
			expect(selector(state)).toBe(600);
		});

		it("should select zero time", () => {
			const state = createMockState({ timeOfDay: 0 });
			const selector = selectTimeOfDay();
			expect(selector(state)).toBe(0);
		});

		it("should select noon time (half day)", () => {
			const state = createMockState({ timeOfDay: 600 }); // 10 minutes * 60 seconds
			const selector = selectTimeOfDay();
			expect(selector(state)).toBe(600);
		});
	});

	describe("selectSeasonIndex", () => {
		it("should return 0 for Spring", () => {
			const state = createMockState({ season: "Spring" });
			const selector = selectSeasonIndex();
			expect(selector(state)).toBe(0);
		});

		it("should return 1 for Summer", () => {
			const state = createMockState({ season: "Summer" });
			const selector = selectSeasonIndex();
			expect(selector(state)).toBe(1);
		});

		it("should return 2 for Autumn", () => {
			const state = createMockState({ season: "Autumn" });
			const selector = selectSeasonIndex();
			expect(selector(state)).toBe(2);
		});

		it("should return 3 for Winter", () => {
			const state = createMockState({ season: "Winter" });
			const selector = selectSeasonIndex();
			expect(selector(state)).toBe(3);
		});
	});

	describe("selectDayOfYear", () => {
		it("should calculate day 0 of Spring as day 0 of year", () => {
			const state = createMockState({ season: "Spring", day: 0 });
			const selector = selectDayOfYear();
			expect(selector(state)).toBe(0);
		});

		it("should calculate day 10 of Spring", () => {
			const state = createMockState({ season: "Spring", day: 10 });
			const selector = selectDayOfYear();
			expect(selector(state)).toBe(10);
		});

		it("should calculate first day of Summer", () => {
			const state = createMockState({ season: "Summer", day: 0 });
			const selector = selectDayOfYear();
			expect(selector(state)).toBe(DAYS_PER_SEASON);
		});

		it("should calculate day 5 of Summer", () => {
			const state = createMockState({ season: "Summer", day: 5 });
			const selector = selectDayOfYear();
			expect(selector(state)).toBe(DAYS_PER_SEASON + 5);
		});

		it("should calculate first day of Autumn", () => {
			const state = createMockState({ season: "Autumn", day: 0 });
			const selector = selectDayOfYear();
			expect(selector(state)).toBe(DAYS_PER_SEASON * 2);
		});

		it("should calculate day 15 of Autumn", () => {
			const state = createMockState({ season: "Autumn", day: 15 });
			const selector = selectDayOfYear();
			expect(selector(state)).toBe(DAYS_PER_SEASON * 2 + 15);
		});

		it("should calculate first day of Winter", () => {
			const state = createMockState({ season: "Winter", day: 0 });
			const selector = selectDayOfYear();
			expect(selector(state)).toBe(DAYS_PER_SEASON * 3);
		});

		it("should calculate last day of year (Winter day 20)", () => {
			const state = createMockState({ season: "Winter", day: 20 });
			const selector = selectDayOfYear();
			expect(selector(state)).toBe(DAYS_PER_SEASON * 3 + 20);
		});

		it("should handle maximum day values", () => {
			const state = createMockState({ season: "Winter", day: DAYS_PER_SEASON - 1 });
			const selector = selectDayOfYear();
			expect(selector(state)).toBe(DAYS_PER_SEASON * 4 - 1);
		});
	});

	describe("selector consistency", () => {
		it("should maintain consistent values across multiple calls", () => {
			const state = createMockState({ season: "Summer", day: 10 });
			const dayOfYearSelector = selectDayOfYear();

			const result1 = dayOfYearSelector(state);
			const result2 = dayOfYearSelector(state);

			expect(result1).toBe(result2);
		});

		it("should work with all seasons and days", () => {
			const seasons = ["Spring", "Summer", "Autumn", "Winter"] as const;
			const dayOfYearSelector = selectDayOfYear();

			for (let seasonIndex = 0; seasonIndex < seasons.size(); seasonIndex++) {
				for (let day = 0; day < DAYS_PER_SEASON; day++) {
					const state = createMockState({
						season: seasons[seasonIndex],
						day: day,
					});

					const expectedDayOfYear = seasonIndex * DAYS_PER_SEASON + day;
					const actualDayOfYear = dayOfYearSelector(state);

					expect(actualDayOfYear).toBe(expectedDayOfYear);
				}
			}
		});
	});
});
