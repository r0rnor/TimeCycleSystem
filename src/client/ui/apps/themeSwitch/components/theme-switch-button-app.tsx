import Object from "@rbxts/object-utils";
import React, { useContext, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { Events } from "client/network";
import { store } from "client/store";
import DropdownFrame from "client/ui/components/Default/dropdownFrame";
import { DropdownOption } from "client/ui/components/Default/dropdownFrame/components/options-container";
import { GetStatePlayerId } from "client/ui/utils/GetStatePlayerId";
import { usePx } from "client/ui/utils/use-px";
import { selectTheme } from "shared/store/selectors/uiSelector";
import { ThemeContext, ThemeName, THEMES } from "shared/themes/theme";

export default function ThemeSwitchButton() {
	const { stroke } = useContext(ThemeContext);
	const px = usePx();

	const playerId = GetStatePlayerId();
	const theme = useSelector(selectTheme(playerId));

	const options: Array<DropdownOption> = [];

	Object.entries(THEMES).forEach(([themeName, themeObject]) => {
		options.push({
			label: themeObject.theme,
			value: themeName,
		});
	});

	return (
		<DropdownFrame
			value={theme}
			options={options}
			buttonBorderSize={px(stroke[2])}
			dropdownBorderSize={px(stroke[2])}
			position={new UDim2(0.5, 0, 0.85, 0)}
			anchorPoint={new Vector2(0.5, 1)}
			onChange={(value) => {
				const newTheme = value as ThemeName;

				store.setTheme(playerId, newTheme);

				Events.setTheme(newTheme);
			}}
		/>
	);
}
