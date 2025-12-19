import React, { useContext } from "@rbxts/react";
import { usePx } from "client/ui/utils/use-px";
import { ThemeContext } from "shared/themes/theme";
import { ContainerFrameProps } from "./types";

export default function ContainerFrame(props: ContainerFrameProps) {
	if (props.allPadding) {
		props.paddingTop = props.allPadding;
		props.paddingBottom = props.allPadding;
		props.paddingLeft = props.allPadding;
		props.paddingRight = props.allPadding;
	}

	if (props.backgroundTransparency === undefined) {
		props.backgroundTransparency = props.backgroundColor3 ? 0 : 1;
	}

	const { colors } = useContext(ThemeContext);
	const px = usePx();

	return (
		<scrollingframe
			key="Container"
			AnchorPoint={props.anchorPoint}
			AutomaticCanvasSize={props.automaticCanvasSize ?? Enum.AutomaticSize.Y}
			BackgroundTransparency={props.backgroundTransparency}
			BackgroundColor3={props.backgroundColor3}
			BorderColor3={props.borderColor3 ?? colors.primary.opposite}
			BorderSizePixel={0}
			CanvasSize={props.canvasSize ?? new UDim2(0, 0, 0, 0)}
			Position={props.position}
			ScrollBarImageColor3={props.scrollBarImageColor3 ?? colors.secondary.opposite}
			ScrollBarThickness={props.scrollBarThickness ?? px(6)}
			Size={props.size}
			Visible={props.visible ?? true}
			VerticalScrollBarInset={Enum.ScrollBarInset.ScrollBar}
			LayoutOrder={props.layoutOrder}
		>
			{(props.cellPadding ?? props.cellSize) && (
				<uigridlayout
					CellPadding={props.cellPadding}
					CellSize={props.cellSize}
					HorizontalAlignment={props.horizontalAlignment}
					VerticalAlignment={props.verticalAlignment}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
			)}
			<uipadding
				PaddingBottom={props.paddingBottom}
				PaddingLeft={props.paddingLeft}
				PaddingRight={props.paddingRight}
				PaddingTop={props.paddingTop}
			/>

			{props.children}
		</scrollingframe>
	);
}
