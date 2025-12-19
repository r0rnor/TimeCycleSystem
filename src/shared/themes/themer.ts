import { enrichColor } from "shared/utils/color-utils";
import { NumberMultipliers, NumberPlus, Theme, ThemeBlueprint, ThemeColors, ThemeFontSizes, ThemeTextColors } from "./types";
import Object from "@rbxts/object-utils";

type ThemeColorName = keyof ThemeColors<Color3>;
type ThemeTextColorName = keyof ThemeTextColors<Color3>;

export function enrichNumber(size: number): NumberPlus {
	const newNumbers = {} as NumberPlus;

	Object.keys(NumberMultipliers).forEach((key) => {
		const multiplier = NumberMultipliers[(key - 1) as unknown as number];
		const newSize = size * multiplier;

		newNumbers[multiplier] = newSize;
	});

	return newNumbers;
}

export function buildTheme(theme: ThemeBlueprint): Theme {
	const newTheme = {
		colors: {},
		textColors: {},
		stroke: {},
		fonts: theme.fonts,
		theme: theme.theme,
	} as Theme;

	Object.keys(theme.colors).forEach((key) => {
		const color = theme.colors[key];

		newTheme.colors[key] = enrichColor(color);
	});

	Object.keys(theme.textColors).forEach((key) => {
		const color = theme.textColors[key];

		newTheme.textColors[key] = enrichColor(color);
	});

	newTheme.padding = enrichNumber(theme.padding);
	newTheme.textSize = enrichNumber(theme.textSize);
	newTheme.cornerRadius = enrichNumber(theme.cornerRadius);
	newTheme.stroke = enrichNumber(theme.stroke);

	return newTheme;
}
