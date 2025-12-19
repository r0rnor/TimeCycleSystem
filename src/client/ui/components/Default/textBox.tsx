import React, { useContext } from "@rbxts/react";
import { usePx } from "client/ui/utils/use-px";
import { ThemeContext } from "shared/themes/theme";

interface Props extends React.PropsWithChildren {
	key?: string;
	backgroundColor3?: Color3;
	borderColor3?: Color3;
	borderSize?: number;
	backgroundTransparency?: number;
	defaultText: string;
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
	textWrap?: boolean;
	richText?: boolean;
	cornerRadius?: UDim;

	uiStrokeSize?: number;
	zIndex?: number;

	textChanged: (text: string) => void;
}

export default function TextBox(props: Props) {
	if (!props.automaticSize ?? !props.size) {
		props.automaticSize = props.size ? Enum.AutomaticSize.None : Enum.AutomaticSize.XY;
	}

	const [text, setText] = React.useState(props.defaultText);

	const { colors, stroke, fonts, textSize, textColors, cornerRadius } = useContext(ThemeContext);
	const px = usePx();

	return (
		<textbox
			key={props.key ?? props.defaultText}
			AutomaticSize={props.automaticSize}
			Position={props.position ?? new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={props.anchorPoint ?? new Vector2(0.5, 0.5)}
			Size={props.size}
			TextScaled={props.textScaled}
			Font={fonts.heading}
			TextColor3={props.textColor3 ?? textColors.primary.main}
			TextXAlignment={props.textXAlignment}
			TextYAlignment={props.textYAlignment}
			Text={text}
			TextSize={props.textSize ?? px(textSize[1])}
			BackgroundTransparency={props.backgroundTransparency ?? 0}
			BackgroundColor3={props.backgroundColor3 ?? colors.secondary.main}
			TextWrap={props.textWrap}
			RichText={props.richText}
			ZIndex={props.zIndex}
			Change={{
				Text: (textBox) => {
					const currentText = textBox.Text;

					setText(currentText);
					props.textChanged(currentText);
				},
			}}
		>
			<uistroke
				Thickness={props.uiStrokeSize ?? px(stroke[1])}
				Color={props.textStrokeColor3 ?? textColors.primary.opposite}
				ApplyStrokeMode={Enum.ApplyStrokeMode.Contextual}
			/>
			<uistroke
				Thickness={props.borderSize ?? px(stroke[1])}
				Color={props.borderColor3 ?? colors.primary.opposite}
				ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
			/>
			<uicorner CornerRadius={props.cornerRadius ?? new UDim(0, px(cornerRadius[2]))} />
		</textbox>
	);
}
