import React from "@rbxts/react";
import ThemeSwitchApp from "../themeSwitch/theme-switch-app";

export default function HolderApp() {
	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			Size={new UDim2(1, 0, 1, 0)}
			BackgroundTransparency={1}
		>
			<ThemeSwitchApp />
		</frame>
	);
}
