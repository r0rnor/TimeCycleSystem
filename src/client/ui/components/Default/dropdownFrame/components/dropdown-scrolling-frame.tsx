import React, { useContext } from "@rbxts/react";
import ContainerFrame from "../../containerFrames/containerFrame";
import Frame from "../../frame";
import OptionsContainer, { DropdownOption } from "./options-container";
import { usePx } from "client/ui/utils/use-px";
import { ThemeContext } from "shared/themes/theme";

interface DropdownScrollingFrameProps {
	options: Array<DropdownOption>;
	optionsHeight: number;
	maxHeight: number;

	value?: string;
	onChange: (value: string) => void;
	placeholder?: string;

	backgroundColor3?: Color3;
	borderColor?: Color3;
	textColor3?: Color3;
	selectedColor3?: Color3;
	hoverColor3?: Color3;
	borderSize?: number;
}

export default function DropdownScrollingFrame(props: DropdownScrollingFrameProps) {
	const { colors, stroke } = useContext(ThemeContext);
	const px = usePx();

	const mainBgColor = props.backgroundColor3 ?? colors.primary.main;
	const mainBorderColor = props.borderColor ?? colors.primary.opposite;

	const scrollingFrameSize = new UDim2(1, 0, 0, math.min(props.options.size() * props.optionsHeight, props.maxHeight));

	const dropdownUi = (
		<Frame
			position={new UDim2(0, 0, 1.3, 0)}
			anchorPoint={new Vector2(0, 0)}
			size={scrollingFrameSize}
			backgroundColor3={mainBgColor}
			borderColor={mainBorderColor}
			borderSize={props.borderSize ?? px(stroke[1.25])}
			zIndex={10}
		>
			<ContainerFrame
				size={UDim2.fromScale(1, 1)}
				backgroundTransparency={1}
				scrollBarThickness={px(stroke[3])}
				scrollBarImageColor3={mainBorderColor}
				cellSize={new UDim2(1, 0, 0, props.optionsHeight)}
			>
				<OptionsContainer
					optionsHeight={props.optionsHeight}
					options={props.options}
					value={props.value}
					onChange={props.onChange}
					backgroundColor3={props.backgroundColor3}
					textColor3={props.textColor3}
					selectedColor3={props.selectedColor3}
					hoverColor3={props.hoverColor3}
				/>
			</ContainerFrame>
		</Frame>
	);

	return <>{dropdownUi}</>;
}
