import React, { useContext } from "@rbxts/react";
import TextLabel from "../../textLabel";
import { DropdownOption } from "./options-container";
import { usePx } from "client/ui/utils/use-px";
import { ThemeContext } from "shared/themes/theme";
import AnimatedHeightTextButton from "../../buttons/animatedHeightTextButton";

interface DropdownSelectButtonProps {
	options: Array<DropdownOption>;

	value?: string;
	onClick: () => void;
	placeholder?: string;

	isOpen: boolean;

	backgroundColor3?: Color3;
	borderColor?: Color3;
	textColor3?: Color3;
}

export default function DropdownSelectButton({ options, value, onClick, isOpen, placeholder = "Select...", backgroundColor3, borderColor, textColor3 }: DropdownSelectButtonProps) {
	const { colors, textColors, textSize } = useContext(ThemeContext);
	const px = usePx();

	const selectedOption = options.find((opt) => opt.value === value);
	const displayText = selectedOption ? selectedOption.label : placeholder;

	const mainBgColor = backgroundColor3 ?? colors.primary.main;
	const mainBorderColor = borderColor ?? colors.primary.opposite;
	const mainTextColor = textColor3 ?? textColors.primary.main;

	return (
		<AnimatedHeightTextButton
			size={UDim2.fromScale(1, 1)}
			position={new UDim2(0, 0, 0, 0)}
			anchorPoint={new Vector2(0, 0)}
			text={displayText}
			backgroundColor3={mainBgColor}
			borderColor3={mainBorderColor}
			textColor3={mainTextColor}
			textSize={px(textSize[1.25])}
			autoButtonColor={false}
			onClick={onClick}
		>
			<TextLabel
				size={UDim2.fromOffset(px(20), px(20))}
				position={UDim2.fromScale(1, 0.5)}
				anchorPoint={new Vector2(1, 0.5)}
				text={isOpen ? "▲" : "▼"}
				textColor3={mainBorderColor}
				textSize={px(textSize[0.75])}
				backgroundTransparency={1}
				uiStrokeSize={0}
			>
				<uipadding PaddingRight={new UDim(0, px(10))} />
			</TextLabel>
		</AnimatedHeightTextButton>
	);
}
