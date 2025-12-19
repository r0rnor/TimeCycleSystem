import { buildTheme } from "../themer";

export const TreeTopTheme = buildTheme({
	theme: "Tree Top",
	colors: {
		primary: Color3.fromRGB(160, 69, 53),
		secondary: Color3.fromRGB(45, 181, 122),
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
