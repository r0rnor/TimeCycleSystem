import { describe, expect, it } from "@rbxts/jest-globals";
import { yearSlice } from "shared/store/slices/timeCycleSlice/year";
import { START_YEAR } from "shared/configs/timeCycle/Years";

describe("yearSlice", () => {
	it("should have correct initial state", () => {
		expect(START_YEAR).toBe(0);
	});

	it("should set year value", () => {
		const newYear = 5;
		const newState = yearSlice.setYear(newYear);
		expect(newState).toBe(newYear);
	});

	it("should handle zero value", () => {
		const newState = yearSlice.setYear(0);
		expect(newState).toBe(0);
	});

	it("should handle negative values (for pre-epoch years)", () => {
		const newState = yearSlice.setYear(-1);
		expect(newState).toBe(-1);
	});

	it("should handle large year values", () => {
		const largeYear = 9999;
		const newState = yearSlice.setYear(largeYear);
		expect(newState).toBe(largeYear);
	});

	it("should override previous value completely", () => {
		const state1 = yearSlice.setYear(100);
		const state2 = yearSlice.setYear(200);
		expect(state1).toBe(100);
		expect(state2).toBe(200);
	});

	it("should handle incremental year progression", () => {
		for (let i = 1; i <= 10; i++) {
			const state = yearSlice.setYear(i);
			expect(state).toBe(i);
		}
	});
});
