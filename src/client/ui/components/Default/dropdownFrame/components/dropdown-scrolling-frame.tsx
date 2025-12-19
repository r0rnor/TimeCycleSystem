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
}

export default function DropdownScrollingFrame({ options, optionsHeight, maxHeight, value, onChange, backgroundColor3, borderColor, textColor3, selectedColor3, hoverColor3 }: DropdownScrollingFrameProps) {
	const { colors, stroke } = useContext(ThemeContext);
	const px = usePx();

	const mainBgColor = backgroundColor3 ?? colors.primary.main;
	const mainBorderColor = borderColor ?? colors.primary.opposite;

	const dropdownUi = (
		<Frame
			position={new UDim2(0, 0, 1.3, 0)}
			anchorPoint={new Vector2(0, 0)}
			size={new UDim2(1, 0, 0, px(math.min(options.size() * optionsHeight, maxHeight)))}
			backgroundColor3={mainBgColor}
			borderColor={mainBorderColor}
			borderSize={px(stroke[1.25])}
			zIndex={10}
		>
			<ContainerFrame
				size={UDim2.fromScale(1, 1)}
				backgroundTransparency={1}
				scrollBarThickness={px(stroke[3])}
				scrollBarImageColor3={mainBorderColor}
				cellSize={new UDim2(1, 0, 0, optionsHeight)}
			>
				<OptionsContainer
					optionsHeight={optionsHeight}
					options={options}
					value={value}
					onChange={onChange}
					backgroundColor3={backgroundColor3}
					textColor3={textColor3}
					selectedColor3={selectedColor3}
					hoverColor3={hoverColor3}
				/>
			</ContainerFrame>
		</Frame>
	);

	return <>{dropdownUi}</>;
}
