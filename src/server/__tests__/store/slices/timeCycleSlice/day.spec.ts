import { describe, expect, it } from "@rbxts/jest-globals";
import { daySlice } from "shared/store/slices/timeCycleSlice/day";
import { START_DAY } from "shared/configs/timeCycle/Days";

describe("daySlice", () => {
	it("should have correct initial state", () => {
		expect(START_DAY).toBe(0);
	});

	it("should set day value", () => {
		const newDay = 15;
		const newState = daySlice.setDay(newDay);
		expect(newState).toBe(newDay);
	});

	it("should handle zero value", () => {
		const newState = daySlice.setDay(0);
		expect(newState).toBe(0);
	});

	it("should handle negative values", () => {
		const newState = daySlice.setDay(-1);
		expect(newState).toBe(-1);
	});

	it("should handle large values", () => {
		const largeDay = 999;
		const newState = daySlice.setDay(largeDay);
		expect(newState).toBe(largeDay);
	});

	it("should override previous value completely", () => {
		const firstDay = 5;
		const secondDay = 20;
		const state1 = daySlice.setDay(firstDay);
		const state2 = daySlice.setDay(secondDay);
		expect(state1).toBe(firstDay);
		expect(state2).toBe(secondDay);
	});
});
