import Frame from "client/ui/components/Default/frame";
import ThemeSwitchButtonApp from "./components/theme-switch-button-app";
import React from "@rbxts/react";
import { usePx } from "client/ui/utils/use-px";
import ThemeSwitchTitle from "./components/theme-switch-title";

export default function ThemeSwitchApp() {
	const px = usePx();

	return (
		<Frame
			position={new UDim2(0.995, 0, 0.5, 0)}
			anchorPoint={new Vector2(1, 0.5)}
			size={UDim2.fromOffset(px(250), px(90))}
		>
			<ThemeSwitchButtonApp />
			<ThemeSwitchTitle />
		</Frame>
	);
}
