import React, { useMemo } from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { store } from "client/store";
import { ReflexProvider, useSelector } from "@rbxts/react-reflex";
import HolderApp from "./apps/holder/holder-app";
import { GetStatePlayerId } from "./utils/GetStatePlayerId";
import { ThemeContext, THEMES } from "../../shared/themes/theme";
import defaultPlayerData from "shared/configs/data/defaultPlayerData";
import { selectTheme } from "shared/store/selectors/uiSelector";

const Story = {
	summary: "Holder",
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		const playerId = GetStatePlayerId();
		store.loadPlayerData(playerId, defaultPlayerData);

		const ThemeWrapper: React.FC = () => {
			const currentThemeName = useSelector(selectTheme(playerId)) ?? "pureDark";
			const currentTheme = useMemo(() => {
				return { ...THEMES[currentThemeName] };
			}, [currentThemeName]);

			return (
				<ThemeContext.Provider value={currentTheme}>
					<HolderApp />
				</ThemeContext.Provider>
			);
		};

		return (
			<ReflexProvider producer={store}>
				<ThemeWrapper />
			</ReflexProvider>
		);
	},
};

export = Story;
