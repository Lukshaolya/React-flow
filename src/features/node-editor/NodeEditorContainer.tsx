import { ReactFlowProvider } from "reactflow";
import IItemExecution from "../executions/item-executions/types/IItemExecution";
import { IItem } from "../items/types";
import FlowContainer from "./FlowContainer";

import "reactflow/dist/style.css";
import { convertToNodes } from "./utils/flowExtensions";
import styled from "@emotion/styled";

interface NodeEditorContainerProps {
	data: IItem[] | IItemExecution[]
}

const Container = styled('div')({
	border: '3px solid',
	margin: '1% 0',
	height: '100%',
	width: '100%'
})

const NodeEditorContainer : React.FC<NodeEditorContainerProps> = ({ data }) => {
	return <Container>
		 <ReactFlowProvider>
			<FlowContainer nodes={convertToNodes(data)} edges={[]}/>
		</ReactFlowProvider> 
	</Container>
}

export default NodeEditorContainer;