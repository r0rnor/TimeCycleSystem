import { Color3Plus } from "shared/themes/types";

export function getOppositeColor(color: Color3): Color3 {
	const newR = 1 - color.R;
	const newG = 1 - color.G;
	const newB = 1 - color.B;

	return new Color3(newR, newG, newB);
}

export function lightenColor(color: Color3, amount: number): Color3 {
	const newR = math.clamp(color.R + amount, 0, 1);
	const newG = math.clamp(color.G + amount, 0, 1);
	const newB = math.clamp(color.B + amount, 0, 1);

	return new Color3(newR, newG, newB);
}

export function enrichColor(color: Color3): Color3Plus {
	const light = lightenColor(color, 0.2);
	const dark = lightenColor(color, -0.2);
	const opposite = getOppositeColor(color);

	return {
		main: color,
		light: light,
		dark: dark,
		opposite: opposite,
	};
}
