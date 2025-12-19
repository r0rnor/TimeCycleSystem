import { describe, expect, it } from "@rbxts/jest-globals";
import { timeOfDaySlice } from "shared/store/slices/timeCycleSlice/timeOfDay";
import { START_TIME_OF_DAY, SECONDS_PER_DAY } from "shared/configs/timeCycle/TimeOfDay";

describe("timeOfDaySlice", () => {
	it("should have correct initial state", () => {
		expect(START_TIME_OF_DAY).toBe(SECONDS_PER_DAY / 4);
	});

	it("should set time of day value", () => {
		const newTime = 600;
		const newState = timeOfDaySlice.setTimeOfDay(newTime);
		expect(newState).toBe(newTime);
	});

	it("should handle zero value", () => {
		const newState = timeOfDaySlice.setTimeOfDay(0);
		expect(newState).toBe(0);
	});

	it("should handle maximum day value", () => {
		const newState = timeOfDaySlice.setTimeOfDay(SECONDS_PER_DAY - 1);
		expect(newState).toBe(SECONDS_PER_DAY - 1);
	});

	it("should handle values equal to SECONDS_PER_DAY", () => {
		const newState = timeOfDaySlice.setTimeOfDay(SECONDS_PER_DAY);
		expect(newState).toBe(SECONDS_PER_DAY);
	});

	it("should handle decimal values", () => {
		const timeValue = 123.456;
		const newState = timeOfDaySlice.setTimeOfDay(timeValue);
		expect(newState).toBe(timeValue);
	});

	it("should handle negative values", () => {
		const newState = timeOfDaySlice.setTimeOfDay(-10);
		expect(newState).toBe(-10);
	});

	it("should override previous value", () => {
		const state1 = timeOfDaySlice.setTimeOfDay(300);
		const state2 = timeOfDaySlice.setTimeOfDay(900);
		expect(state1).toBe(300);
		expect(state2).toBe(900);
	});

	it("should handle rapid sequential updates", () => {
		for (let i = 0; i < 100; i++) {
			const state = timeOfDaySlice.setTimeOfDay(i * 10);
			expect(state).toBe(i * 10);
		}
	});
});
