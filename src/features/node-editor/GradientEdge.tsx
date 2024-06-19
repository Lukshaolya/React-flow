import React from "react";
import { EdgeProps, EdgeText, getBezierPath } from "reactflow";

const GradientEdge : React.FC<EdgeProps> = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	data,
	markerEnd
}) => {
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
	});

	return <React.Fragment>
		<defs>
			<linearGradient
			id={`gradient-${id}`}
			gradientUnits="userSpaceOnUse"
			x1={sourceX}
			y1={sourceY}
			x2={targetX}
			y2={targetY}
			>
			<stop offset="0%" stopColor={data.color1} />
			<stop offset="100%" stopColor={data.color2} />
			</linearGradient>
		</defs>
		<path
			id={id}
			style={{ ...style, stroke: `url(#gradient-${id})`, strokeWidth: 6 }}
			className="react-flow__edge-path"
			d={edgePath}
			markerEnd={markerEnd}
			stroke={`url(#gradient-${id})`}
			strokeWidth={2}
			fill="none"
		/>
		{data.text && (
			<EdgeText
				x={labelX}
				y={labelY}
				label={data.text}
				labelStyle={{ fill: data.textColor || "#000" }}
				/>
      	)}
	</React.Fragment>
}

export default GradientEdge;