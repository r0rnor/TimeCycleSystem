import React from "@rbxts/react";
import Frame from "client/ui/components/Default/frame";
import { usePx } from "client/ui/utils/use-px";
import TimeAppTitle from "./components/time-app-title";

export default function TimeApp() {
	const px = usePx();

	return (
		<Frame
			position={new UDim2(0.005, 0, 0.5, 0)}
			anchorPoint={new Vector2(0, 0.5)}
			size={UDim2.fromOffset(px(600), px(600))}
		>
			<TimeAppTitle />
		</Frame>
	);
}
