import ExecutionState from "../../types/ExecutionState";

interface IPipelineExecution {
	endTimeUTC?: Date;
    id: number;
    pipelineId: number;
    startTimeUTC?: Date;
    state: ExecutionState;
}

export default IPipelineExecution;