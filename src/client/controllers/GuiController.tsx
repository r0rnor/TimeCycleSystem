// import { Controller, OnStart } from "@flamework/core";
// import React, { useMemo } from "@rbxts/react";
// import { useSelector, ReflexProvider } from "@rbxts/react-reflex";
// import { createPortal, createRoot } from "@rbxts/react-roblox";
// import { Players } from "@rbxts/services";
// import { store } from "client/store";
// import ScreenGui from "client/ui/components/Default/scaledGui";
// import { GetStatePlayerId } from "client/ui/utils/GetStatePlayerId";
// import { THEMES, ThemeContext } from "shared/themes/theme";

// @Controller({})
// export class GuiController implements OnStart {
// 	private playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

// 	onStart() {
// 		task.wait(3);

// 		const ThemeWrapper: React.FC = () => {
// 			const currentThemeName = useSelector(selectPlayerTheme(GetStatePlayerId())) ?? "pureDark";

// 			const currentTheme = useMemo(() => {
// 				return { ...THEMES[currentThemeName] };
// 			}, [currentThemeName]);

// 			return (
// 				<ThemeContext.Provider value={currentTheme}>
// 					<ScreenGui>
// 						<HolderApp />
// 					</ScreenGui>
// 				</ThemeContext.Provider>
// 			);
// 		};

// 		const root = createRoot(new Instance("Folder"));
// 		root.render(
// 			createPortal(
// 				<ReflexProvider producer={store}>
// 					<ThemeWrapper />
// 				</ReflexProvider>,

// 				this.playerGui,
// 			),
// 		);
// 	}
// }
