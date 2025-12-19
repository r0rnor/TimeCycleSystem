import React, { useContext, useState } from "@rbxts/react";
import TextButton from "../../buttons/textButton";
import { usePx } from "client/ui/utils/use-px";
import { ThemeContext } from "shared/themes/theme";

export interface DropdownOption {
	label: string;
	value: string;
}

interface Props {
	options: Array<DropdownOption>;
	optionsHeight: number;

	value?: string;
	onChange: (value: string) => void;
	placeholder?: string;

	backgroundColor3?: Color3;
	textColor3?: Color3;
	selectedColor3?: Color3;
	hoverColor3?: Color3;
}

export default function OptionsContainer(props: Props) {
	const { colors, textColors, textSize } = useContext(ThemeContext);
	const px = usePx();
	const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(undefined);

	const mainBgColor = props.backgroundColor3 ?? colors.primary.main;
	const mainTextColor = props.textColor3 ?? textColors.primary.main;
	const mainSelectedColor = props.selectedColor3 ?? colors.secondary.light;
	const mainHoverColor = props.hoverColor3 ?? colors.primary.light;

	const optionsUi = props.options.map((option, index) => {
		const isSelected = option.value === props.value;
		const isHovered = hoveredIndex === index;

		const optionBgColor = isSelected ? mainSelectedColor : isHovered ? mainHoverColor : mainBgColor;

		return (
			<TextButton
				size={new UDim2(0.98, 0, 0, props.optionsHeight)}
				backgroundColor3={optionBgColor}
				borderSize={0}
				text={option.label}
				textColor3={isSelected ? textColors.secondary.main : mainTextColor}
				textSize={px(textSize[1.25])}
				autoButtonColor={false}
				layoutOrder={index}
				onClick={() => props.onChange(option.value)}
				onEnter={() => setHoveredIndex(index)}
				onLeave={() => setHoveredIndex(undefined)}
			></TextButton>
		);
	});

	return <>{optionsUi}</>;
}
