import { describe, expect, it } from "@rbxts/jest-globals";
import { getDaylightDuration, getDayNightInfo, getNightDuration, getSunriseTime, getSunsetTime, timeOfDaySecondsToClockTime } from "shared/utils/timeCycle/day-duration-utils";

describe("day-duration-utils", () => {
	describe("getDaylightDuration", () => {
		it("should return 10 minutes at spring equinox (day 0)", () => {
			const duration = getDaylightDuration(0);
			expect(duration).toBeCloseTo(10, 0);
		});

		it("should return maximum daylight (14 minutes) at summer solstice (day 21)", () => {
			const duration = getDaylightDuration(21);
			expect(duration).toBeCloseTo(14, 0);
		});

		it("should return 10 minutes at autumn equinox (day 42)", () => {
			const duration = getDaylightDuration(42);
			expect(duration).toBeCloseTo(10, 0);
		});

		it("should return minimum daylight (6 minutes) at winter solstice (day 63)", () => {
			const duration = getDaylightDuration(63);
			expect(duration).toBeCloseTo(6, 0);
		});

		it("should cycle back after full year (day 84)", () => {
			const duration = getDaylightDuration(84);
			expect(duration).toBeCloseTo(10, 0);
		});

		it("should handle mid-season days", () => {
			const springMid = getDaylightDuration(10);
			expect(springMid).toBeGreaterThan(10);
			expect(springMid).toBeLessThan(14);

			const winterMid = getDaylightDuration(73);
			expect(winterMid).toBeLessThan(10);
			expect(winterMid).toBeGreaterThan(6);
		});
	});

	describe("getNightDuration", () => {
		it("should return 10 minutes at spring equinox", () => {
			const duration = getNightDuration(0);
			expect(duration).toBeCloseTo(10, 0);
		});

		it("should return minimum night (6 minutes) at summer solstice", () => {
			const duration = getNightDuration(21);
			expect(duration).toBeCloseTo(6, 0);
		});

		it("should return 10 minutes at autumn equinox", () => {
			const duration = getNightDuration(42);
			expect(duration).toBeCloseTo(10, 0);
		});

		it("should return maximum night (14 minutes) at winter solstice", () => {
			const duration = getNightDuration(63);
			expect(duration).toBeCloseTo(14, 0);
		});

		it("should sum with daylight duration to equal 20 minutes", () => {
			for (let day = 0; day < 84; day += 7) {
				const daylight = getDaylightDuration(day);
				const night = getNightDuration(day);
				expect(daylight + night).toBeCloseTo(20, 5);
			}
		});
	});

	describe("getDayNightInfo", () => {
		it("should return both decimal and rounded values", () => {
			const info = getDayNightInfo(0);
			expect(info.decimal.day).toBeCloseTo(10, 0);
			expect(info.decimal.night).toBeCloseTo(10, 0);
			expect(info.rounded.day).toBe(10);
			expect(info.rounded.night).toBe(10);
		});

		it("should return summer values", () => {
			const info = getDayNightInfo(21);
			expect(info.decimal.day).toBeCloseTo(14, 0);
			expect(info.decimal.night).toBeCloseTo(6, 0);
			expect(info.rounded.day).toBe(14);
			expect(info.rounded.night).toBe(6);
		});

		it("should return winter values", () => {
			const info = getDayNightInfo(63);
			expect(info.decimal.day).toBeCloseTo(6, 0);
			expect(info.decimal.night).toBeCloseTo(14, 0);
			expect(info.rounded.day).toBe(6);
			expect(info.rounded.night).toBe(14);
		});

		it("should round correctly for mid-season days", () => {
			const info = getDayNightInfo(10);
			expect(info.rounded.day + info.rounded.night).toBe(20);
		});
	});

	describe("getSunriseTime", () => {
		it("should return 8:00 at spring equinox", () => {
			const sunrise = getSunriseTime(0);
			expect(sunrise).toBeCloseTo(8, 1);
		});

		it("should return 6:00 at summer solstice (earliest sunrise)", () => {
			const sunrise = getSunriseTime(21);
			expect(sunrise).toBeCloseTo(6, 1);
		});

		it("should return 8:00 at autumn equinox", () => {
			const sunrise = getSunriseTime(42);
			expect(sunrise).toBeCloseTo(8, 1);
		});

		it("should return 10:00 at winter solstice (latest sunrise)", () => {
			const sunrise = getSunriseTime(63);
			expect(sunrise).toBeCloseTo(10, 1);
		});

		it("should gradually change between seasons", () => {
			const springStart = getSunriseTime(0);
			const summerPeak = getSunriseTime(21);
			expect(summerPeak).toBeLessThan(springStart);

			const autumnStart = getSunriseTime(42);
			const winterPeak = getSunriseTime(63);
			expect(winterPeak).toBeGreaterThan(autumnStart);
		});
	});

	describe("getSunsetTime", () => {
		it("should return 18:00 at spring equinox", () => {
			const sunset = getSunsetTime(0);
			expect(sunset).toBeCloseTo(18, 1);
		});

		it("should return 20:00 at summer solstice (latest sunset)", () => {
			const sunset = getSunsetTime(21);
			expect(sunset).toBeCloseTo(20, 1);
		});

		it("should return 18:00 at autumn equinox", () => {
			const sunset = getSunsetTime(42);
			expect(sunset).toBeCloseTo(18, 1);
		});

		it("should return 16:00 at winter solstice (earliest sunset)", () => {
			const sunset = getSunsetTime(63);
			expect(sunset).toBeCloseTo(16, 1);
		});

		it("should maintain correct day length with sunrise", () => {
			for (let day = 0; day < 84; day += 7) {
				const sunrise = getSunriseTime(day);
				const sunset = getSunsetTime(day);
				const daylightHours = sunset - sunrise;
				const expectedHours = getDaylightDuration(day);
				expect(daylightHours).toBeCloseTo(expectedHours, 1);
			}
		});
	});

	describe("timeOfDaySecondsToClockTime", () => {
		it("should convert 0 seconds to 0:00 (midnight)", () => {
			const clockTime = timeOfDaySecondsToClockTime(0);
			expect(clockTime).toBe(0);
		});

		it("should convert 300 seconds (5 minutes) to 6:00", () => {
			const clockTime = timeOfDaySecondsToClockTime(300);
			expect(clockTime).toBeCloseTo(6, 1);
		});

		it("should convert 600 seconds (10 minutes) to 12:00 (noon)", () => {
			const clockTime = timeOfDaySecondsToClockTime(600);
			expect(clockTime).toBeCloseTo(12, 1);
		});

		it("should convert 900 seconds (15 minutes) to 18:00", () => {
			const clockTime = timeOfDaySecondsToClockTime(900);
			expect(clockTime).toBeCloseTo(18, 1);
		});

		it("should convert 1200 seconds (20 minutes) to 24:00 (midnight)", () => {
			const clockTime = timeOfDaySecondsToClockTime(1200);
			expect(clockTime).toBe(24);
		});

		it("should handle fractional seconds", () => {
			const clockTime = timeOfDaySecondsToClockTime(150);
			expect(clockTime).toBeCloseTo(3, 1);
		});

		it("should scale linearly (1 minute game = 1.2 hours ClockTime)", () => {
			const oneMinute = timeOfDaySecondsToClockTime(60);
			expect(oneMinute).toBeCloseTo(1.2, 1);
		});
	});

	describe("seasonal consistency", () => {
		it("should maintain consistent day length across full year", () => {
			const tolerances: Array<number> = [];
			for (let day = 0; day < 84; day++) {
				const daylight = getDaylightDuration(day);
				const night = getNightDuration(day);
				const total = daylight + night;
				tolerances.push(math.abs(total - 20));
			}

			const maxError = math.max(...tolerances);
			expect(maxError).toBeLessThan(0.001);
		});

		it("should have symmetric equinoxes", () => {
			const springEquinox = getDaylightDuration(0);
			const autumnEquinox = getDaylightDuration(42);
			expect(springEquinox).toBeCloseTo(autumnEquinox, 1);
		});

		it("should have correct solstice extremes", () => {
			const summerSolstice = getDaylightDuration(21);
			const winterSolstice = getDaylightDuration(63);

			expect(summerSolstice).toBe(14);
			expect(winterSolstice).toBe(6);
		});
	});
});
