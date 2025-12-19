import React, { useContext } from "@rbxts/react";
import ContainerFrame from "client/ui/components/Default/containerFrames/containerFrame";
import Frame from "client/ui/components/Default/frame";
import { ThemeContext } from "shared/themes/theme";
import CurrentSeason from "./components/current-season";

export default function InnerTimeIndicators() {
	const { colors } = useContext(ThemeContext);

	return (
		<Frame
			anchorPoint={new Vector2(0.5, 0)}
			position={UDim2.fromScale(0.5, 0.1)}
			size={UDim2.fromScale(0.9, 0.85)}
			backgroundColor3={colors.primary.dark}
		>
			<ContainerFrame
				size={UDim2.fromScale(1, 1)}
				cellSize={UDim2.fromScale(0.95, 0.2)}
				verticalAlignment={Enum.VerticalAlignment.Center}
				horizontalAlignment={Enum.HorizontalAlignment.Center}
				cellPadding={new UDim2(0, 0, 0.03, 0)}
			>
				<CurrentSeason />
				<CurrentSeason />
				<CurrentSeason />
				<CurrentSeason />
			</ContainerFrame>
		</Frame>
	);
}
