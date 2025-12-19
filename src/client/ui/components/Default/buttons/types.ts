import { Binding, PropsWithChildren } from "@rbxts/react";

export type AnimatedTextButtonProps = TextButtonPropsInterface<UDim2>;
export type TextButtonProps = TextButtonPropsInterface<Binding<UDim2> | UDim2>;

interface TextButtonPropsInterface<POSITION_IMPLEMENTATION extends UDim2 | Binding<UDim2>> extends PropsWithChildren {
	key?: string;
	text?: string;
	textSize?: number;
	textScaled?: boolean;
	size?: UDim2;
	position?: POSITION_IMPLEMENTATION;
	anchorPoint?: Vector2;
	automaticSize?: Enum.AutomaticSize;
	textColor3?: Color3;
	textStrokeColor3?: Color3;
	textXAlignment?: Enum.TextXAlignment;
	textYAlignment?: Enum.TextYAlignment;
	backgroundColor3?: Color3;
	borderColor3?: Color3;
	backgroundTransparency?: number;
	layoutOrder?: number;
	textStrokeSize?: number;
	borderSize?: number;
	cornerRadius?: UDim;
	visible?: boolean;
	zIndex?: number;
	autoButtonColor?: boolean;

	onClick?: () => void;
	onClickEnd?: () => void;
	onEnter?: () => void;
	onLeave?: () => void;
}
