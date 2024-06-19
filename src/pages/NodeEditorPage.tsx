import { useParams } from "react-router-dom";
import NodeEditorContainer from "../features/node-editor/NodeEditorContainer";
import { isNumber } from "@mui/x-data-grid/internals";
import pipelineApi from "../features/pipelines/redux/pipelineApi";
import executionApi from "../features/executions/redux/executionApi";
import PageWithHeader from "../components/page/PageWithHeader";

function NodeEditorPage() {
	const { id, type } = useParams<{ id: string; type: string }>();

	const isIdCorrect = id !== undefined && isNumber(parseInt(id))
	const isTypeCorrect = type !== undefined && type === 'pipeline' || type === 'pipeline-execution'

	if (!isIdCorrect || !isTypeCorrect)
		return <h2>error</h2>

	// Use appropriate API hook based on the type
	const pipelineQuery = type === 'pipeline' ? pipelineApi.useGetItemsQuery(parseInt(id)) : null;
	const executionQuery = type === 'pipeline-execution' ? executionApi.useGetItemsByPipelineExecutionIdQuery(parseInt(id)) : null;

	// Handle loading and error states if needed
	const { data: pipelineData, error: pipelineError, isLoading: pipelineLoading } = pipelineQuery || {};
	const { data: executionData, error: executionError, isLoading: executionLoading } = executionQuery || {};

	if (pipelineLoading || executionLoading) {
		return <h2>Loading...</h2>;
	}

	if (pipelineError || executionError) {
		return <h2>Error: Unable to fetch data</h2>;
	}

	// Pass the fetched data to the NodeEditorContainer
	const data = type === 'pipeline' ? pipelineData! : executionData!;

	return <NodeEditorContainer data={data} />
}

export default NodeEditorPage;