import { AppBar, Button, Toolbar } from "@mui/material";

interface ToolbarComponentProps {
	arrangeNodes: () => void;
	onLayout: (direction: string) => void;
	clearEdges: () => void;
	clearView: () => void;
	saveNodesAndEdges: () => void;
	loadNodesAndEdges: () => void;
}
  
const AppBarContainer: React.FC<ToolbarComponentProps> = ({ arrangeNodes, onLayout, clearEdges, clearView,	saveNodesAndEdges, loadNodesAndEdges }) =>
<AppBar position="static">
	<Toolbar>
		<Button color="inherit" onClick={arrangeNodes}>
			Arrange Nodes
		</Button>
		<Button color="inherit" onClick={() => onLayout("TB")}>
			Vertical Layout
		</Button>
		<Button color="inherit" onClick={clearEdges}>
			Clear Edges
		</Button>
		<Button color="inherit" onClick={clearView}>
			Clear View
		</Button>
		<Button color="inherit" onClick={saveNodesAndEdges}>
			Save
		</Button>
		<Button color="inherit" onClick={loadNodesAndEdges}>
			Load
		</Button>
	</Toolbar>
</AppBar>;
  
export default AppBarContainer;