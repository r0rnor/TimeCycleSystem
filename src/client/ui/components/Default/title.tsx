import React, { useContext } from "@rbxts/react";
import Frame from "./frame";
import TextLabel from "./textLabel";
import { ThemeContext } from "shared/themes/theme";

interface Props extends React.PropsWithChildren {
	text: string;
	textSize?: number;
	key?: string;
	uiStrokeSize?: number;
	position?: UDim2;
	anchorPoint?: Vector2;
	size?: UDim2;
	cornerRadius?: UDim;
	backgroundColor3?: Color3;
	layoutOrder?: number;
	zIndex?: number;
	textXAlignment?: Enum.TextXAlignment;

	uiTextStrokeSize?: number;
}

export default function Title(props: Props) {
	const zIndex = props.zIndex ?? 1;

	const { colors, cornerRadius, stroke } = useContext(ThemeContext);

	return (
		<Frame
			key="Title"
			backgroundColor3={props.backgroundColor3 ?? colors.primary.dark}
			anchorPoint={props.anchorPoint}
			position={props.position}
			size={props.size}
			layoutOrder={props.layoutOrder}
			zIndex={zIndex}
			cornerRadius={props.cornerRadius ?? new UDim(0, cornerRadius[3])}
			uiStrokeSize={props.uiStrokeSize ?? 0}
		>
			{props.children}

			<TextLabel
				key="Title"
				anchorPoint={new Vector2(0.5, 0.5)}
				position={new UDim2(0.5, 0, 0.5, 0)}
				size={new UDim2(1, 0, 1, 0)}
				text={props.text}
				textSize={props.textSize ?? 60}
				textXAlignment={props.textXAlignment ?? Enum.TextXAlignment.Center}
				uiStrokeSize={props.uiTextStrokeSize ?? stroke[1]}
			></TextLabel>
		</Frame>
	);
}
