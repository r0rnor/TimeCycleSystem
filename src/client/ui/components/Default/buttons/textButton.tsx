import React, { useContext } from "@rbxts/react";
import { usePx } from "client/ui/utils/use-px";
import { ThemeContext } from "shared/themes/theme";
import { TextButtonProps } from "./types";

export default function TextButton(props: TextButtonProps) {
	let automaticSize = props.automaticSize;
	if (!automaticSize) {
		automaticSize = props.size ? Enum.AutomaticSize.None : Enum.AutomaticSize.XY;
	}

	const { colors, stroke, fonts, textSize, textColors, cornerRadius } = useContext(ThemeContext);
	const px = usePx();

	const defaultPosition = props.position ?? new UDim2(0.5, 0, 0.5, 0);

	return (
		<textbutton
			key={props.key ?? props.text}
			AutomaticSize={props.automaticSize}
			Position={defaultPosition}
			AnchorPoint={props.anchorPoint ?? new Vector2(0.5, 0.5)}
			Size={props.size}
			Font={fonts.heading}
			TextColor3={props.textColor3 ?? textColors.primary.main}
			TextXAlignment={props.textXAlignment}
			TextYAlignment={props.textYAlignment}
			Text={props.text ?? ""}
			TextSize={props.textSize ?? px(textSize[1])}
			TextScaled={props.textScaled ?? false}
			BackgroundTransparency={props.backgroundTransparency ?? 0}
			BackgroundColor3={props.backgroundColor3 ?? colors.primary.main}
			BorderColor3={props.borderColor3 ?? colors.primary.opposite}
			LayoutOrder={props.layoutOrder}
			Visible={props.visible ?? true}
			ZIndex={props.zIndex ?? 1}
			AutoButtonColor={props.autoButtonColor ?? true}
			Event={{
				MouseButton1Down: props.onClick,
				MouseButton1Up: props.onClickEnd,
				MouseEnter: props.onEnter,
				MouseLeave: props.onLeave,
			}}
		>
			{props.children}

			<uistroke
				Thickness={props.borderSize ?? px(stroke[0.75])}
				ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				Color={props.borderColor3 ?? colors.primary.opposite}
			/>
			<uistroke
				Thickness={props.textStrokeSize ?? px(stroke[0.75])}
				ApplyStrokeMode={Enum.ApplyStrokeMode.Contextual}
				Color={props.textStrokeColor3 ?? textColors.primary.opposite}
			/>
			<uicorner CornerRadius={props.cornerRadius ?? new UDim(0, px(cornerRadius[2]))} />
		</textbutton>
	);
}
