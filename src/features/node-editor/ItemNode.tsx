import { Handle, NodeProps, Position } from "reactflow";
import IItemNodeData from "./types/IITemNodeData";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { generateColor } from "./utils/colorExtensions";

const ItemNode : React.FC<NodeProps<IItemNodeData>> = ({ data }) => {
	const theme = useTheme();
	data.color = generateColor(data.step);
	
	return <Card
		variant="outlined"
		style={{
			width: '175px',
			height: '75px',
			backgroundColor: theme.palette.background.default,
			boxShadow: `inset 0 0 0 8px ${data.color}`
		}}>
		<CardContent color="white">
			<Typography style={{ color: theme.palette.primary.contrastText }}>
				{data.label && <div>{data.label}</div>}
				<div>Step# {data.step}</div>
			</Typography>
		</CardContent>
		{
		data.step > 1 
			? <Handle 
				position={Position.Top} 
				style={{
					backgroundColor: data.color,
					border: "none",
					width: "10px",
					height: "10px",
				}}
				type="target"/>
			: null
		}
		<Handle
			type="source"
			position={Position.Bottom}
			style={{
			backgroundColor: data.color,
			border: "none",
			width: "10px",
			height: "10px",
			}}
		/>
	</Card>
}

export default ItemNode;