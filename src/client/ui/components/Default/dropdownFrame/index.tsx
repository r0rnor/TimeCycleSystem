import React, { useState } from "@rbxts/react";
import { usePx } from "client/ui/utils/use-px";
import { DropdownOption } from "./components/options-container";
import DropdownScrollingFrame from "./components/dropdown-scrolling-frame";
import DropdownSelectButton from "./components/dropdown-select-button";
import Frame, { FrameProps } from "../frame";

export interface DropdownFrameProps extends FrameProps {
	value?: string;
	onChange: (value: string) => void;
	placeholder?: string;

	options: Array<DropdownOption>;
	optionsHeight?: number;
	maxHeight?: number;

	backgroundColor3?: Color3;
	borderColor?: Color3;
	textColor3?: Color3;
	selectedColor3?: Color3;
	hoverColor3?: Color3;

	buttonBorderSize?: number;
	dropdownBorderSize?: number;
}

export default function DropdownFrame(props: DropdownFrameProps) {
	const px = usePx();
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (optionValue: string) => {
		props.onChange(optionValue);
		setIsOpen(false);
	};

	return (
		<Frame
			{...props}
			size={props.size ?? UDim2.fromOffset(px(200), px(30))}
			backgroundTransparency={props.backgroundTransparency ?? 1}
		>
			<DropdownSelectButton
				options={props.options}
				value={props.value}
				placeholder={props.placeholder}
				backgroundColor3={props.backgroundColor3}
				borderColor={props.borderColor}
				textColor3={props.textColor3}
				borderSize={props.buttonBorderSize}
				onClick={() => setIsOpen(!isOpen)}
				isOpen={isOpen}
			/>

			{isOpen && (
				<DropdownScrollingFrame
					options={props.options}
					optionsHeight={props.optionsHeight ?? px(40)}
					maxHeight={props.maxHeight ?? px(200)}
					value={props.value}
					backgroundColor3={props.backgroundColor3}
					borderColor={props.borderColor}
					textColor3={props.textColor3}
					selectedColor3={props.selectedColor3}
					hoverColor3={props.hoverColor3}
					borderSize={props.dropdownBorderSize}
					onChange={handleSelect}
				/>
			)}
		</Frame>
	);
}
