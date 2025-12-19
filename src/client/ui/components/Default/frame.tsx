import React, { useContext } from "@rbxts/react";
import { usePx } from "client/ui/utils/use-px";
import { ThemeContext } from "shared/themes/theme";

export interface FrameProps extends React.PropsWithChildren {
	position?: UDim2 | React.Binding<UDim2>;
	anchorPoint?: Vector2;
	size?: UDim2;
	backgroundTransparency?: number;
	backgroundColor3?: Color3;
	automaticSize?: Enum.AutomaticSize;
	layoutOrder?: number;
	visible?: boolean;
	borderColor?: Color3;

	borderSize?: number;
	cornerRadius?: UDim;

	zIndex?: number;
}

export default function Frame(props: FrameProps) {
	props.backgroundTransparency = props.backgroundTransparency ?? 0;

	const { colors, cornerRadius, stroke } = useContext(ThemeContext);
	const px = usePx();

	return (
		<frame
			BackgroundColor3={props.backgroundColor3 ?? colors.primary.main}
			BackgroundTransparency={props.backgroundTransparency ?? 0}
			BorderSizePixel={0}
			AnchorPoint={props.anchorPoint ?? new Vector2(0.5, 0.5)}
			Position={props.position ?? new UDim2(0.5, 0, 0.5, 0)}
			Size={props.size ?? new UDim2(0, 0, 0, 0)}
			AutomaticSize={props.automaticSize ?? Enum.AutomaticSize.None}
			ZIndex={props.zIndex}
			LayoutOrder={props.layoutOrder}
			Visible={props.visible ?? true}
			BorderColor3={props.borderColor ?? colors.primary.opposite}
		>
			{props.children}

			{props.backgroundTransparency === 0 && (
				<uistroke
					Thickness={props.borderSize ?? px(stroke[2])}
					Color={props.borderColor ?? colors.primary.opposite}
				/>
			)}
			<uicorner CornerRadius={props.cornerRadius ?? new UDim(0, px(cornerRadius[2]))} />
		</frame>
	);
}
