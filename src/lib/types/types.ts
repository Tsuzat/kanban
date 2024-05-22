export type TaskType = {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	priority: string;
	notes: string;
};

export type TasksSectionType = {
	id: string;
	title: string;
	statusColor: string;
	tasks: TaskType[];
};

export type KanbanBoardType = {
	id: string;
	title: string;
	icon: string;
	sections: TasksSectionType[];
};

export enum TaskPriority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH'
}

export function isValidTaskPriority(priority: string): priority is TaskPriority {
	return Object.values(TaskPriority).includes(priority as TaskPriority);
}

export function isValidTask(task: TaskType): task is TaskType {
	return (
		typeof task.id === 'string' &&
		typeof task.title === 'string' &&
		typeof task.description === 'string' &&
		typeof task.dueDate === 'string' &&
		typeof task.priority === 'string' &&
		isValidTaskPriority(task.priority) &&
		typeof task.notes === 'string'
	);
}

export function isValidTasksSection(section: TasksSectionType): section is TasksSectionType {
	return (
		typeof section.id === 'string' &&
		typeof section.title === 'string' &&
		typeof section.statusColor === 'string' &&
		Array.isArray(section.tasks) &&
		section.tasks.every(isValidTask)
	);
}

export function isValidKanbanBoard(board: KanbanBoardType): board is KanbanBoardType {
	return (
		typeof board.id === 'string' &&
		typeof board.title === 'string' &&
		typeof board.icon === 'string' &&
		Array.isArray(board.sections) &&
		board.sections.every(isValidTasksSection)
	);
}

export function validateAndCleanKanbanBoard(input: KanbanBoardType): KanbanBoardType | null {
	if (!isValidKanbanBoard(input)) return null;

	const validBoard: KanbanBoardType = {
		id: input.id,
		title: input.title,
		icon: input.icon,
		sections: input.sections.filter(isValidTasksSection).map((section: TasksSectionType) => ({
			id: section.id,
			title: section.title,
			statusColor: section.statusColor,
			tasks: section.tasks.filter(isValidTask)
		}))
	};
	return validBoard;
}
