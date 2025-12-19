import React, { useEffect, useState } from "@rbxts/react";
import TextButton from "./textButton";
import { AnimatedTextButtonProps, TextButtonProps } from "./types";
import { useMotion } from "@rbxts/pretty-react-hooks";
import { springs } from "client/ui/utils/springs";
import { usePx } from "client/ui/utils/use-px";

const CLICK_AMPLITUDE = 1;
const HOVER_AMPLITUDE = 8;
const POWER = 1 / 6;

export default function AnimatedHeightTextButton(props: AnimatedTextButtonProps) {
	const px = usePx();

	const [pressed, setPressed] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [buttonPosition, buttonPositionMotion] = useMotion(0);

	const defaultPosition = props.position ?? new UDim2(0.5, 0, 0.5, 0);
	const position = buttonPosition.map((y) => defaultPosition.add(new UDim2(0, 0, 0, y)));

	useEffect(() => {
		if (pressed) {
			buttonPositionMotion.spring(px(HOVER_AMPLITUDE) * POWER, springs.responsive);
		} else if (hovered) {
			buttonPositionMotion.spring(-px(HOVER_AMPLITUDE) * POWER, springs.responsive);
		} else {
			buttonPositionMotion.spring(0, springs.responsive);
		}
	}, [pressed, hovered, px]);

	useEffect(() => {
		if (!pressed && hovered) {
			buttonPositionMotion.impulse(-px(CLICK_AMPLITUDE) * POWER);
			buttonPositionMotion.spring(-px(HOVER_AMPLITUDE) * POWER, springs.bubbly);
		}
	}, [pressed]);

	return (
		<TextButton
			{...props}
			position={position}
			onClick={() => {
				setPressed(true);
				props.onClick?.();
			}}
			onClickEnd={() => {
				setPressed(false);
				props.onClickEnd?.();
			}}
			onEnter={() => {
				setHovered(true);
				props.onEnter?.();
			}}
			onLeave={() => {
				setHovered(false);
				setPressed(false);
				props.onLeave?.();
			}}
		>
			{props.children}
		</TextButton>
	);
}
