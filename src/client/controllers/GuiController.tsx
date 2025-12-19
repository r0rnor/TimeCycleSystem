import { Controller, OnStart } from "@flamework/core";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import ScreenGui from "client/ui/components/scaledGui";

@Controller({})
export class GuiController implements OnStart {
	private playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

	onStart() {
		const root = createRoot(new Instance("Folder"));
		root.render(<ScreenGui />);
	}
}
