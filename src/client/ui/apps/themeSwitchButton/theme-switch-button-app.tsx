import Object from "@rbxts/object-utils";
import React, { useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { Events } from "client/network";
import { store } from "client/store";
import DropdownFrame from "client/ui/components/Default/dropdownFrame";
import { DropdownOption } from "client/ui/components/Default/dropdownFrame/components/options-container";
import { GetStatePlayerId } from "client/ui/utils/GetStatePlayerId";
import { selectTheme } from "shared/store/selectors/uiSelector";
import { ThemeName, THEMES } from "shared/themes/theme";

export default function ThemeSwitchButtonApp() {
	const playerId = GetStatePlayerId();

	const startTheme = useSelector(selectTheme(playerId));

	const [theme, setTheme] = useState<ThemeName>(startTheme);

	const options: Array<DropdownOption> = [];

	Object.entries(THEMES).forEach(([themeName, themeObject]) => {
		options.push({
			label: themeObject.theme,
			value: themeName,
		});
	});

	return (
		<DropdownFrame
			position={new UDim2(1, 0, 0.5, 0)}
			anchorPoint={new Vector2(1, 0.5)}
			value={theme}
			options={options}
			onChange={(value) => {
				const newTheme = value as ThemeName;

				setTheme(newTheme);

				store.setTheme(playerId, newTheme);

				Events.setTheme(newTheme);
			}}
		/>
	);
}
