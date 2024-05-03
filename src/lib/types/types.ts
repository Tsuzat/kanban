export type TaskType = {
	title: string;
	description: string;
	dueDate: string;
	priority: string;
	notes: string;
};

export type TasksSectionType = {
	title: string;
	statusColor: string;
	tasks: {
		title: string;
		description: string;
		dueDate: string;
		priority: string;
		notes: string;
	}[];
};

export type KanbanBoardType = {
	title: string;
	icon: string;
	id: string;
	sections: {
		title: string;
		statusColor: string;
		tasks: {
			title: string;
			description: string;
			dueDate: string;
			priority: string;
			notes: string;
		}[];
	}[];
};

export enum TaskPriority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH'
}
