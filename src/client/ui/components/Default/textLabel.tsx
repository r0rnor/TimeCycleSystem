import React, { Binding, useContext } from "@rbxts/react";
import { usePx } from "client/ui/utils/use-px";
import { ThemeContext } from "shared/themes/theme";

interface Props extends React.PropsWithChildren {
	key?: string;
	text: string | Binding<string>;
	textSize?: number;
	textScaled?: boolean;
	size?: UDim2;
	position?: UDim2;
	anchorPoint?: Vector2;
	automaticSize?: Enum.AutomaticSize;
	textColor3?: Color3;
	textStrokeColor3?: Color3;
	textXAlignment?: Enum.TextXAlignment;
	textYAlignment?: Enum.TextYAlignment;
	backgroundTransparency?: number;
	textWrap?: boolean;
	richText?: boolean;

	uiStrokeSize?: number;
	zIndex?: number;
}

export default function TextLabel(props: Props) {
	if (!props.automaticSize && !props.size) {
		props.automaticSize = props.size ? Enum.AutomaticSize.None : Enum.AutomaticSize.XY;
	}

	const { textColors, fonts, textSize, stroke } = useContext(ThemeContext);
	const px = usePx();

	return (
		<textlabel
			key={props.key}
			AutomaticSize={props.automaticSize}
			Position={props.position ?? new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={props.anchorPoint ?? new Vector2(0.5, 0.5)}
			Size={props.size}
			TextScaled={props.textScaled}
			Font={fonts.heading}
			TextColor3={props.textColor3 ?? textColors.primary.main}
			TextStrokeColor3={props.textStrokeColor3 ?? textColors.primary.opposite}
			TextXAlignment={props.textXAlignment}
			TextYAlignment={props.textYAlignment}
			Text={props.text}
			TextSize={props.textSize ?? px(textSize[1])}
			BackgroundTransparency={props.backgroundTransparency ?? 1}
			TextWrap={props.textWrap}
			RichText={props.richText}
			ZIndex={props.zIndex}
		>
			<uistroke
				Thickness={props.uiStrokeSize ?? px(stroke[0.75])}
				Color={props.textStrokeColor3 ?? textColors.primary.opposite}
			/>
		</textlabel>
	);
}
