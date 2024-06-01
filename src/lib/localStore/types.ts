export enum TaskPriority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH'
}

export type Task = {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	priority: TaskPriority;
	notes: string;
};

export type Section = {
	id: string;
	title: string;
	color: string;
	tasks: Task[];
};

export type Kanban = {
	id: string;
	title: string;
	icon: string;
	sections: Section[];
};
