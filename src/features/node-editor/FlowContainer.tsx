import ReactFlow, { Background, BackgroundVariant, Connection, Controls, Edge, MiniMap, Node, Panel, addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import AppBarContainer from "./AppBarContainer";
import { Snackbar } from "@mui/material";
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { arrangeNodesByStep, getLayoutedElements, loadNodes, nodeDrag, saveNodes, verifyConnection } from "./utils/flowExtensions";
import GradientEdge from "./GradientEdge";
import ItemNode from "./ItemNode";

interface FlowContainerProps {
	nodes: Node[],
	edges: Edge[]
}

const FlowContainer : React.FC<FlowContainerProps> = (props) => {
	const { fitView } = useReactFlow();
	const nodeTypes = useMemo(() => ({ "items-with-step": ItemNode }), []);
	const edgeTypes = useMemo(() => ({ "gradient-edge": GradientEdge }), []);
	const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);
	const [openSnackbar, setOpenSnackbar] = useState(false);
  
	useEffect(() => {
	  arrangeNodesCallback();
	}, []);
  
	const onNodeDrag = useCallback((event: SyntheticEvent, node: Node) => {
		const updatedNode = nodeDrag(node);
		setNodes((nodes) => nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node)));
	}, 
	[setNodes]);
  
	const onConnect = useCallback((connection: Connection) => {
	  const newEdge = verifyConnection(nodes, connection);
	  newEdge ? setEdges((edges) => addEdge(newEdge, edges)) : setOpenSnackbar(true);
	}, 
	[nodes, setEdges]);
  
	const onLayoutCallback = useCallback((direction: string) => {
	  const layouted = getLayoutedElements(nodes, edges, { direction });
	  setNodes([...layouted.nodes]);
	  setEdges([...layouted.edges]);
	  window.requestAnimationFrame(() => {
		fitView();});
	},
	[nodes, edges, fitView]);
  
	const arrangeNodesCallback = useCallback(() => {
	  setNodes(arrangeNodesByStep(nodes));
	  window.requestAnimationFrame(() => {
		fitView();});
	},
	[nodes, setNodes, fitView]);
  
	const clearEdgesCallback = useCallback(() => {
	  setEdges([]);
	  window.requestAnimationFrame(() => {
		fitView();});
	},
	[fitView]);
  
	const clearViewCallback = useCallback(() => {
	  setNodes([]);
	  setEdges([]);
	}, []);
  
	const saveNodesAndEdgesCallback = useCallback(() => {
	  saveNodes(nodes, edges);
	},
	[nodes, edges]);
  
	const loadNodesAndEdgesCallback = useCallback(() => {
	  const { parsedNodes, parsedEdges } = loadNodes();
	  setNodes(parsedNodes);
	  setEdges(parsedEdges);
	}, []);
  
	return <ReactFlow
		nodes={nodes}
		nodeTypes={nodeTypes}
		edgeTypes={edgeTypes}
		edges={edges}
		onNodesChange={onNodesChange}
		onEdgesChange={onEdgesChange}
		onNodeDrag={onNodeDrag}
		onConnect={onConnect}
		snapToGrid={false}
		snapGrid={[100, 100]}
		fitView
	>
		<Panel position="top-left">
		  <AppBarContainer
			arrangeNodes={arrangeNodesCallback}
			onLayout={onLayoutCallback}
			clearEdges={clearEdgesCallback}
			clearView={clearViewCallback}
			saveNodesAndEdges={saveNodesAndEdgesCallback}
			loadNodesAndEdges={loadNodesAndEdgesCallback}
		  />
		</Panel>
		<Snackbar
		  open={openSnackbar}
		  autoHideDuration={5000}
		  onClose={() => setOpenSnackbar(false)}
		  message="Items should be connected in the correct order"
		/>
		<Background
		  gap={[1000, 200]}
		  color={'#666'}
		  variant={BackgroundVariant.Lines}
		/>
		<MiniMap />
		<Controls />
	</ReactFlow>
}

export default FlowContainer;