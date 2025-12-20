import React, { Children } from "@rbxts/react";
import { ContainerFrameProps } from "./types";
import ContainerFrame from "./containerFrame";
import Frame from "../frame";

export default function WrappedChildrenContainer(props: ContainerFrameProps) {
	const newChildren = Children.map(props.children, (child) => {
		if (!React.isValidElement(child)) {
			return child;
		}

		const childProps = child.props as { visible?: boolean };

		return (
			<Frame
				backgroundTransparency={0.5}
				visible={childProps.visible ?? true}
			>
				{child}
			</Frame>
		);
	});

	return <ContainerFrame {...props}>{newChildren}</ContainerFrame>;
}
