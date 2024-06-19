interface IPipeline {
	id: number;
	name: string;
	enabled: boolean;
	cronSchedule: string;
	parameters: { [key: string]: string };
}

export default IPipeline;