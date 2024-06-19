import Dagre from "@dagrejs/dagre";
import { Connection, Edge, Node } from "reactflow";
import IItemNodeData from "../types/IITemNodeData";
import { IItem } from "../../items/types";
import IItemExecution from "../../executions/item-executions/types/IItemExecution";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

function arrangeNodesByStep(nodes: Node<IItemNodeData>[] | Node<{label: string, step: number}, string | undefined>[]) {
	// Sort nodes by step value
	const sortedNodes = [...nodes].sort((a, b) => a.data.step - b.data.step);

	// Create a map to keep track of nodes at each step level
	const stepMap: { [step: string]: Node<IItemNodeData>[] } = {};

	sortedNodes.forEach((node: Node) => {
	if (!stepMap[node.data.step]) {
		stepMap[node.data.step] = [];
	}
	stepMap[node.data.step].push(node);
	});

	// Calculate positions for each node
	Object.keys(stepMap).forEach((step) => {
		const stepNodes = stepMap[step];
		stepNodes.forEach((node: Node, index: number) => {
			node.position = {
			x: index * 200,
			y: parseInt(step) * 200,
			};
		});
	});

	return sortedNodes;
}

function getLayoutedElements(nodes: Node[], edges: any[], options: { direction: any; }) {
	g.setGraph({ rankdir: options.direction });

	edges.forEach((edge) => g.setEdge(edge.source, edge.target));
	nodes.forEach((node) => g.setNode(node.id, node.data));
  
	Dagre.layout(g);
  
	return {
		nodes: nodes.map((node) => {
			const position = g.node(node.id);
			// const x = Math.round((position.x - nodeSize.width / 2) / nodeSpacing.x) * nodeSpacing.x;
			const x = position.x * 5;
			const y = node.data.step * 200;
	
			return { ...node, position: { x, y } };
		}),
		edges
	};
}

function nodeDrag(node: Node) {
	let newY = node.position.y;
  
    const minY = node.data.step * 200;
    const maxY = node.data.step * 200 + 200 - 75;
  
    if (newY < minY) {
		newY = minY;
    } else if (newY > maxY) {
		newY = maxY;
    }
  
    return {
		...node,
		position: {
			x: node.position.x,
			y: newY,
		},
    };
};

function verifyConnection(nodes: any[], connection: Connection) {
	const sourceNode = nodes.find((node: { id: any; }) => node.id === connection.source);
	const targetNode = nodes.find((node: { id: any; }) => node.id === connection.target);
  
	if (
	  sourceNode?.data?.step < targetNode?.data?.step &&
	  isItemNodeData(sourceNode.data) &&
	  isItemNodeData(targetNode.data)
	){
		const newEdge = {
			...connection,
			type: "gradient-edge",
			data: {
			color1: sourceNode.data.color,
			color2: targetNode.data.color,
			},
		};
		return newEdge;
	}else{
		return null;
	}
}

function isItemNodeData(data: any): data is IItemNodeData {
	return typeof data.color === "string";
}

function edgesDataFromNodes(nodes : Node<IItemNodeData, string | undefined>[]) {
	const edges: Edge[] = [];
  
	nodes.forEach((node) => {
	  if (node.data.childNodes) {
		node.data.childNodes.forEach((childId) => {
		  const childNode = nodes.find((n) => n.id === childId);
		  const edge = {
			id: `e${node.id}${childId}`,
			source: node.id,
			target: childId,
			type: "gradient-edge",
			data: {
			  color1: node.data.color,
			  color2: childNode ? childNode.data.color : node.data.color,
			},
		  }
		  edges.push(edge);
		});
	  }
	});
  
	return edges;
}

interface NodeMap {
	[key: string]: Node;
}

function edgesDataToNodes(nodes : Node[], edges : Edge[]) {
	const nodeMap : NodeMap = {}; // Map node id to its corresponding node object
  
	// Build a map for faster lookup by node id
	nodes.forEach((node: Node) => {
		nodeMap[node.id] = node;
	});
	
	// Loop through edges and update parentNodes and childNodes
	edges.forEach((edge: Edge) => {
		const sourceNode = nodeMap[edge.source];
		const targetNode = nodeMap[edge.target];
	
		// Add target node as child to source node
		if (!sourceNode.data.childNodes) {
		  sourceNode.data.childNodes = [];
		}
		sourceNode.data.childNodes.push(targetNode.id);
	
		// Add source node as parent to target node
		if (!targetNode.data.parentNodes) {
		  targetNode.data.parentNodes = [];
		}
		targetNode.data.parentNodes.push(sourceNode.id);
	});
	
	return nodes;
}

function saveNodes(nodes : Node<IItemNodeData, string | undefined>[], edges : Edge[]) {
	edgesDataToNodes(nodes, edges);
	localStorage.setItem("nodes", JSON.stringify(nodes));
}

function loadNodes() {
	const savedNodes = localStorage.getItem("nodes");
	const parsedNodes = savedNodes ? JSON.parse(savedNodes) : [];
	const parsedEdges = edgesDataFromNodes(parsedNodes);

	return { parsedNodes, parsedEdges };
}

function convertToNodes(data: IItem[] | IItemExecution[]) : Node[] {
	const nodes : Node[] = data.map((x) => {
		return {
			id: x.id.toString(), 
			position: { x: 0, y: 0 },
			data: {
				label: x.id.toString(),
				step: x.step
			},
			type: "items-with-step",
		} as Node;
	});
	
	return nodes;
}


export { arrangeNodesByStep, convertToNodes, edgesDataFromNodes, getLayoutedElements, isItemNodeData, loadNodes, nodeDrag, saveNodes, verifyConnection}