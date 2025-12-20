import React, { useContext } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { Selector } from "@rbxts/reflex";
import Frame from "client/ui/components/Default/frame";
import TextLabel from "client/ui/components/Default/textLabel";
import { usePx } from "client/ui/utils/use-px";
import { SharedState } from "shared/store";
import { ThemeContext } from "shared/themes/theme";

interface Props<T> {
	selector: () => Selector<SharedState, T>;
	toText: (value: T) => string;
}

export default function TimeIndicator<T>(props: Props<T>) {
	const { textSize, stroke } = useContext(ThemeContext);
	const px = usePx();

	const value = useSelector(props.selector());

	return (
		<Frame>
			<TextLabel
				text={props.toText(value)}
				textSize={px(textSize[3])}
				uiStrokeSize={px(stroke[1.5])}
			/>
		</Frame>
	);
}
