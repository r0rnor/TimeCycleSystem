import { buildTheme } from "./themer";

export const PureDarkTheme = buildTheme({
	theme: "Pure Dark",
	colors: {
		primary: new Color3(0.05, 0.03, 0.07),
		secondary: new Color3(0.15, 0, 0),
		error: new Color3(0.17, 0.02, 0.02),
		success: new Color3(0.04, 0.44, 0.04),
	},
	textColors: {
		primary: new Color3(1, 1, 1),
		secondary: new Color3(0.77, 0.77, 0.56),
	},
	stroke: 2,
	fonts: {
		heading: Enum.Font.FredokaOne,
		body: Enum.Font.Oswald,
	},
	textSize: 16,
	cornerRadius: 4,
	padding: 10,
});
