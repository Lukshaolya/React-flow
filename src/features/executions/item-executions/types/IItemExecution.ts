import { ItemType, RepartitionFormat } from "../../../items/types";
import ExecutionState from "../../types/ExecutionState";

interface IItemExecution {
    // Metrics
    bytesScanned?: number;
    bytesWritten?: number;
    calculatedPartitions: string[];
    endTimeUTC?: Date;
    generatedRepartitionDestinations: string[];
    id: number;
    itemType: ItemType;
    memoryUsageBytes?: number;

    /**
     * Output relative path
     * <example>
     * centauri/advertiser_id=1060/type=keywords/tag_id=118516/date=2024-04-26/
     * </example>
     */
    outputRelativePathTemplate: string;

    // Iteration
    parallelIterationsCount?: number;
    pipelineExecutionId: number;
    predefinedPartitions: { [key: string]: string[] };

    // Query and Repartition
    query: string;

    // Repartition
    repartitionFormat?: RepartitionFormat;
    repartitionTable: string;
    rowsScanned?: number;
    rowsWritten?: number;
    sourceItemId: number;
    startTimeUTC?: Date;

    // State
    state: ExecutionState;
    stateComment: string;
    step: number;
    timeoutSeconds?: number;
}

export default IItemExecution