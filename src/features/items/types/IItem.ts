import ItemIterationType from "./ItemIterationType";
import ItemType from "./ItemType";
import RepartitionFormat from "./RepartitionFormat";

interface IItem {
	id: number;
	pipelineId: number;
	itemType: ItemType;
	queryTemplateId?: number;
	step: number;
	enabled: boolean;
	parameters: { [key: string]: string };
	iterationType: ItemIterationType;
	iterationParameters: { [key: string]: string[] }[];
	repartitionFormat?: RepartitionFormat;
	repartitionTable?: string;
	calculatedPartitions?: string[];
	predefinedPartitions?: { [key: string]: string[] };
	outputRelativePathTemplate?: string;
}

export default IItem;