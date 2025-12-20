export interface ContainerFrameProps extends React.PropsWithChildren {
	anchorPoint?: Vector2;
	position?: UDim2;
	size: UDim2;
	scrollBarImageColor3?: Color3;
	scrollBarThickness?: number;
	automaticCanvasSize?: Enum.AutomaticSize;
	canvasSize?: UDim2;
	backgroundColor3?: Color3;
	borderColor3?: Color3;
	backgroundTransparency?: number;
	layoutOrder?: number;
	visible?: boolean;

	cellPadding?: UDim2;
	cellSize?: UDim2;
	horizontalAlignment?: Enum.HorizontalAlignment;
	verticalAlignment?: Enum.VerticalAlignment;

	paddingTop?: UDim;
	paddingBottom?: UDim;
	paddingLeft?: UDim;
	paddingRight?: UDim;
	allPadding?: UDim;
}
