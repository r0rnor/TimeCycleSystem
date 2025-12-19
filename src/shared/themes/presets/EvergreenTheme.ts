import { buildTheme } from "../themer";

export const EvergreenTheme = buildTheme({
	theme: "Evergreen",
	colors: {
		primary: Color3.fromRGB(161, 255, 161),
		secondary: Color3.fromRGB(230, 166, 255),
		error: Color3.fromRGB(232, 70, 70),
		success: Color3.fromRGB(61, 220, 68),
	},
	textColors: {
		primary: Color3.fromRGB(255, 255, 255),
		secondary: Color3.fromRGB(200, 200, 200),
	},
	stroke: 2,
	fonts: {
		heading: Enum.Font.FredokaOne,
		body: Enum.Font.Oswald,
	},
	textSize: 16,
	cornerRadius: 5,
	padding: 10,
});
