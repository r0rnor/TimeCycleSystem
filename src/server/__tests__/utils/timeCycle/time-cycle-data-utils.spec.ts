import { beforeEach, describe, expect, it } from "@rbxts/jest-globals";
import { store } from "server/store";
import { DAYS_PER_SEASON, SEASONS } from "shared/configs/timeCycle/Seasons";
import { SECONDS_PER_DAY } from "shared/configs/timeCycle/TimeOfDay";
import { incrementTimeOfDay, incrementDay, incrementSeason, incrementYear } from "server/utils/timeCycle/time-cycle-data-utils";
import { selectDay, selectSeason, selectSeasonIndex, selectTimeOfDay, selectYear } from "shared/store/selectors/timeCycleSelector";

describe("time-cycle-data-utils", () => {
	beforeEach(() => {
		store.setTimeOfDay(0);
		store.setDay(0);
		store.setSeason("Spring");
		store.setYear(0);
	});

	describe("incrementTimeOfDay", () => {
		it("should increment time of day by 1 second by default", () => {
			store.setTimeOfDay(100);

			incrementTimeOfDay();

			const newTime = store.getState(selectTimeOfDay());
			expect(newTime).toBe(101);
		});

		it("should increment time of day by specified value", () => {
			store.setTimeOfDay(500);

			incrementTimeOfDay(300);

			const newTime = store.getState(selectTimeOfDay());
			expect(newTime).toBe(800);
		});

		it("should wrap around and increment day when reaching max seconds", () => {
			store.setTimeOfDay(SECONDS_PER_DAY - 1);
			store.setDay(10);

			incrementTimeOfDay(5);

			const newTime = store.getState(selectTimeOfDay());
			const newDay = store.getState(selectDay());
			expect(newTime).toBe(4);
			expect(newDay).toBe(11);
		});

		it("should handle large increments that span multiple days", () => {
			store.setTimeOfDay(100);
			store.setDay(5);

			const increment = SECONDS_PER_DAY * 2 + 50;
			incrementTimeOfDay(increment);

			const expectedTime = (100 + increment) % SECONDS_PER_DAY;
			const newTime = store.getState(selectTimeOfDay());
			const newDay = store.getState(selectDay());

			expect(newTime).toBe(expectedTime);
			expect(newDay).toBeGreaterThan(5);
		});

		it("should handle zero at midnight correctly", () => {
			store.setTimeOfDay(SECONDS_PER_DAY - 10);

			incrementTimeOfDay(10);

			const newTime = store.getState(selectTimeOfDay());
			expect(newTime).toBe(0);
		});
	});

	describe("incrementDay", () => {
		it("should increment day by 1 by default", () => {
			store.setDay(5);

			incrementDay();

			const newDay = store.getState(selectDay());
			expect(newDay).toBe(6);
		});

		it("should increment day by specified value", () => {
			store.setDay(3);

			incrementDay(10);

			const newDay = store.getState(selectDay());
			expect(newDay).toBe(13);
		});

		it("should wrap around and increment season when reaching max days", () => {
			store.setDay(DAYS_PER_SEASON - 1);
			store.setSeason("Summer");

			incrementDay(5);

			const newDay = store.getState(selectDay());
			const newSeason = store.getState(selectSeason());
			expect(newDay).toBe(4);
			expect(newSeason).toBe("Autumn");
		});

		it("should handle incrementing by exactly DAYS_PER_SEASON", () => {
			store.setDay(0);
			store.setSeason("Spring");

			incrementDay(DAYS_PER_SEASON);

			const newDay = store.getState(selectDay());
			const newSeason = store.getState(selectSeason());
			expect(newDay).toBe(0);
			expect(newSeason).toBe("Summer");
		});

		it("should handle large increments spanning multiple seasons", () => {
			store.setDay(10);
			store.setSeason("Spring");

			const increment = DAYS_PER_SEASON * 2 + 5;
			incrementDay(increment);

			const expectedDay = (10 + increment) % DAYS_PER_SEASON;
			const newDay = store.getState(selectDay());
			expect(newDay).toBe(expectedDay);
		});

		it("should handle day 40 increment correctly (bug fix test)", () => {
			store.setDay(10);
			store.setSeason("Autumn");

			incrementDay(40);

			const expectedDay = (10 + 40) % DAYS_PER_SEASON;
			const newDay = store.getState(selectDay());
			expect(newDay).toBe(expectedDay);
		});
	});

	describe("incrementSeason", () => {
		it("should increment season by 1 by default", () => {
			store.setSeason("Spring");

			incrementSeason();

			const newSeason = store.getState(selectSeason());
			expect(newSeason).toBe("Summer");
		});

		it("should increment season by specified value", () => {
			store.setSeason("Spring");

			incrementSeason(2);

			const newSeason = store.getState(selectSeason());
			expect(newSeason).toBe("Autumn");
		});

		it("should wrap around and increment year when reaching max seasons", () => {
			store.setSeason("Winter");
			store.setYear(5);

			incrementSeason(2);

			const newSeason = store.getState(selectSeason());
			const newYear = store.getState(selectYear());
			expect(newSeason).toBe("Summer");
			expect(newYear).toBe(6);
		});

		it("should handle incrementing by exactly 4 seasons (1 year)", () => {
			store.setSeason("Spring");
			store.setYear(10);

			incrementSeason(SEASONS.size());

			const newSeason = store.getState(selectSeason());
			const newYear = store.getState(selectYear());
			expect(newSeason).toBe("Spring");
			expect(newYear).toBe(11);
		});

		it("should handle large season increments", () => {
			store.setSeason("Autumn");
			store.setYear(0);

			incrementSeason(10);

			const expectedSeasonIndex = (2 + 10) % SEASONS.size();
			const expectedSeason = SEASONS[expectedSeasonIndex];
			const newSeason = store.getState(selectSeason());
			expect(newSeason).toBe(expectedSeason);
		});

		it("should handle wrapping from Winter to Spring", () => {
			store.setSeason("Winter");
			store.setYear(42);

			incrementSeason(1);

			const newSeason = store.getState(selectSeason());
			const newYear = store.getState(selectYear());
			expect(newSeason).toBe("Spring");
			expect(newYear).toBe(43);
		});
	});

	describe("incrementYear", () => {
		it("should increment year by 1 by default", () => {
			store.setYear(5);

			incrementYear();

			const newYear = store.getState(selectYear());
			expect(newYear).toBe(6);
		});

		it("should increment year by specified value", () => {
			store.setYear(100);

			incrementYear(25);

			const newYear = store.getState(selectYear());
			expect(newYear).toBe(125);
		});

		it("should handle year 0", () => {
			store.setYear(0);

			incrementYear(1);

			const newYear = store.getState(selectYear());
			expect(newYear).toBe(1);
		});

		it("should handle large year increments", () => {
			store.setYear(1000);

			incrementYear(9999);

			const newYear = store.getState(selectYear());
			expect(newYear).toBe(10999);
		});

		it("should handle negative year progression", () => {
			store.setYear(10);

			incrementYear(-5);

			const newYear = store.getState(selectYear());
			expect(newYear).toBe(5);
		});
	});

	describe("cascading increments", () => {
		it("should cascade from time to day when time overflows", () => {
			store.setTimeOfDay(SECONDS_PER_DAY - 1);
			store.setDay(0);

			incrementTimeOfDay(2);

			const newTime = store.getState(selectTimeOfDay());
			const newDay = store.getState(selectDay());
			expect(newTime).toBe(1);
			expect(newDay).toBe(1);
		});

		it("should cascade from day to season when day overflows", () => {
			store.setDay(DAYS_PER_SEASON - 1);
			store.setSeason("Spring");

			incrementDay(2);

			const newDay = store.getState(selectDay());
			const newSeason = store.getState(selectSeason());
			expect(newDay).toBe(1);
			expect(newSeason).toBe("Summer");
		});

		it("should cascade from season to year when season overflows", () => {
			store.setSeason("Winter");
			store.setYear(0);

			incrementSeason(2);

			const newSeason = store.getState(selectSeason());
			const newYear = store.getState(selectYear());
			expect(newSeason).toBe("Summer");
			expect(newYear).toBe(1);
		});

		it("should handle multiple cascading increments", () => {
			store.setTimeOfDay(SECONDS_PER_DAY - 1);
			store.setDay(DAYS_PER_SEASON - 1);
			store.setSeason("Winter");
			store.setYear(0);

			incrementTimeOfDay(SECONDS_PER_DAY);

			const newTime = store.getState(selectTimeOfDay());
			const newDay = store.getState(selectDay());
			const newSeason = store.getState(selectSeason());
			const newYear = store.getState(selectYear());

			expect(newTime).toBe(SECONDS_PER_DAY - 1);
			expect(newDay).toBe(0);
			expect(newSeason).toBe("Spring");
			expect(newYear).toBe(1);
		});
	});

	describe("edge cases", () => {
		it("should handle incrementing by 0", () => {
			store.setTimeOfDay(100);

			incrementTimeOfDay(0);

			const newTime = store.getState(selectTimeOfDay());
			expect(newTime).toBe(100);
		});

		it("should handle very large time increments", () => {
			const hugeIncrement = SECONDS_PER_DAY * 365;
			store.setTimeOfDay(0);
			store.setDay(0);

			incrementTimeOfDay(hugeIncrement);

			const newTime = store.getState(selectTimeOfDay());
			expect(newTime).toBe(0);
		});

		it("should handle incrementing from exact boundary values", () => {
			store.setTimeOfDay(0);

			incrementTimeOfDay(SECONDS_PER_DAY);

			const newTime = store.getState(selectTimeOfDay());
			expect(newTime).toBe(0);
		});

		it("should correctly calculate max time of day", () => {
			store.setTimeOfDay(0);

			incrementTimeOfDay(SECONDS_PER_DAY - 1);

			const newTime = store.getState(selectTimeOfDay());
			expect(newTime).toBe(SECONDS_PER_DAY - 1);
		});

		it("should correctly calculate max day of season", () => {
			store.setDay(0);

			incrementDay(DAYS_PER_SEASON - 1);

			const newDay = store.getState(selectDay());
			expect(newDay).toBe(DAYS_PER_SEASON - 1);
		});

		it("should wrap when reaching exactly max values", () => {
			// Test time wrapping
			store.setTimeOfDay(SECONDS_PER_DAY - 1);
			incrementTimeOfDay(1);
			expect(store.getState(selectTimeOfDay())).toBe(0);

			// Test day wrapping
			store.setDay(DAYS_PER_SEASON - 1);
			incrementDay(1);
			expect(store.getState(selectDay())).toBe(0);

			// Test season wrapping
			store.setSeason("Winter");
			incrementSeason(1);
			expect(store.getState(selectSeason())).toBe("Spring");
		});
	});
});
