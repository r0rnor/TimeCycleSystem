import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useContext, useEffect, useRef, useState } from "@rbxts/react";
import Frame, { FrameProps } from "client/ui/components/Default/frame";
import TextLabel from "client/ui/components/Default/textLabel";
import { springs } from "client/ui/utils/springs";
import { usePx } from "client/ui/utils/use-px";
import { ThemeContext } from "shared/themes/theme";

interface Props extends FrameProps {
	value: number;
	maxValue: number;

	text?: string;
	textSize?: number;

	emptyColor?: Color3;
	fillColor?: Color3;
}

export default function FillBar(props: Props) {
	const { textSize, colors } = useContext(ThemeContext);
	const px = usePx();

	const fillColor = props.fillColor ?? colors.success.main;
	const emptyColor = props.emptyColor ?? colors.error.main;
	const text = props.text ?? "%d / %d";
	const barTextSize = props.textSize ?? px(textSize[2]);

	const [motionValue, setMotionValue] = useMotion<number>(0);

	useEffect(() => {
		setMotionValue.spring(props.value / props.maxValue, springs.bubbly);
	}, [props.value, props.maxValue]);

	const gradient = motionValue.map((value) => {
		const point1 = math.clamp(value, 0, 0.999);
		const point2 = math.clamp(value + 0.001, 0.001, 1);

		return new ColorSequence([new ColorSequenceKeypoint(0, fillColor), new ColorSequenceKeypoint(point1, fillColor), new ColorSequenceKeypoint(point2, emptyColor), new ColorSequenceKeypoint(1, emptyColor)]);
	});

	return (
		<Frame {...props}>
			<TextLabel
				text={text.format(props.value, props.maxValue)}
				backgroundTransparency={1}
				size={new UDim2(1, 0, 1, 0)}
				textSize={barTextSize}
			/>

			<uigradient Color={gradient} />
		</Frame>
	);
}
