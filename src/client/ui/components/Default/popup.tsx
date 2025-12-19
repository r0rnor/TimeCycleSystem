import React, { useContext } from "@rbxts/react";
import { PropsWithChildren } from "@rbxts/react";
import { ThemeContext } from "shared/themes/theme";
import TextButton from "./buttons/textButton";

interface PopUpProps extends PropsWithChildren {
	isOpen: boolean;
	onBackgroundClick?: () => void;
}

export default function PopUp(props: PopUpProps) {
	if (!props.isOpen) return <></>;

	const { colors } = useContext(ThemeContext);

	return (
		<frame
			Size={UDim2.fromScale(1, 1)}
			BackgroundTransparency={1}
		>
			<TextButton
				size={UDim2.fromScale(1.2, 1.2)}
				position={UDim2.fromScale(0.5, 0.5)}
				anchorPoint={new Vector2(0.5, 0.5)}
				backgroundColor3={colors.primary.opposite}
				backgroundTransparency={0.5}
				zIndex={50}
				text={""}
				autoButtonColor={false}
				onClick={props.onBackgroundClick}
			/>

			<frame
				Size={UDim2.fromScale(1, 1)}
				BackgroundTransparency={1}
				ZIndex={100}
			>
				{props.children}
			</frame>
		</frame>
	);
}
