export interface Color3Plus {
	main: Color3;
	light: Color3;
	dark: Color3;
	opposite: Color3;
}

export const NumberMultipliers = [0.25, 0.33, 0.5, 0.66, 0.75, 1, 1.25, 1.5, 2, 2.25, 2.5, 3, 4, 5, 8, 16] as const;

export type NumberPlus = Record<(typeof NumberMultipliers)[number], number>;

export type ThemeBlueprint = ThemeTemplate<Color3, number>;
export type Theme = ThemeTemplate<Color3Plus, NumberPlus>;

export interface ThemeColors<T> {
	primary: T;
	secondary: T;
	error: T;
	success: T;
}

export interface ThemeTextColors<T> {
	primary: T;
	secondary: T;
}

export interface ThemeFontSizes<T> {
	heading: T;
	body: T;
}

interface ThemeTemplate<ColorImpl, NumberImpl> {
	theme: string;
	colors: ThemeColors<ColorImpl>;
	textColors: ThemeTextColors<ColorImpl>;
	stroke: NumberImpl;
	textSize: NumberImpl;
	cornerRadius: NumberImpl;
	padding: NumberImpl;
	fonts: {
		heading: Enum.Font;
		body: Enum.Font;
	};
}
