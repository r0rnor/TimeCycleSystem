import React, { useContext } from "@rbxts/react";
import TextLabel from "client/ui/components/Default/textLabel";
import { usePx } from "client/ui/utils/use-px";
import { ThemeContext } from "shared/themes/theme";

export default function ThemeSwitchTitle() {
	const { textSize, stroke } = useContext(ThemeContext);
	const px = usePx();

	return (
		<TextLabel
			size={UDim2.fromScale(1, 0.1)}
			position={UDim2.fromScale(0.5, 0)}
			anchorPoint={new Vector2(0.5, 0)}
			text="Select Theme"
			textSize={px(textSize[2])}
			uiStrokeSize={px(stroke[1.5])}
			textYAlignment={Enum.TextYAlignment.Top}
		></TextLabel>
	);
}
