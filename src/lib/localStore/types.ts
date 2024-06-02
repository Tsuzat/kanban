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

export const sampleKanban: Kanban = {
	id: 'kanban-board-sample',
	title: 'Sample Kanban Board',
	icon: 'folder',
	sections: [
		{
			id: 'section-todo-1',
			title: 'To Do',
			color: 'FF6347',
			tasks: [
				{
					id: 'task-1',
					title: 'Task 1',
					description: 'This is the first task in To Do section.',
					dueDate: '2024-06-01',
					priority: TaskPriority.HIGH,
					notes: `- [ ] First todo\n- [x] Second todo`
				},
				{
					id: 'task-2',
					title: 'Task 2',
					description: 'This is the second task in To Do section.',
					dueDate: '2024-06-02',
					priority: TaskPriority.MEDIUM,
					notes: `\`\`\`javascript\nconsole.log('Hello, world!');\n\`\`\``
				}
			]
		},
		{
			id: 'section-in-progress-1',
			title: 'In Progress',
			color: 'FFD700',
			tasks: [
				{
					id: 'task-3',
					title: 'Task 3',
					description: 'This is the first task in In Progress section.',
					dueDate: '2024-06-03',
					priority: TaskPriority.LOW,
					notes: `**Bold Text**\n*Italic Text*\n[Link to Google](https://www.google.com)`
				},
				{
					id: 'task-4',
					title: 'Task 4',
					description: 'This is the second task in In Progress section.',
					dueDate: '2024-06-04',
					priority: TaskPriority.HIGH,
					notes: `- [ ] First todo\n- [ ] Second todo`
				}
			]
		},
		{
			id: 'section-done-1',
			title: 'Done',
			color: '32CD32',
			tasks: [
				{
					id: 'task-5',
					title: 'Task 5',
					description: 'This is the first task in Done section.',
					dueDate: '2024-06-05',
					priority: TaskPriority.MEDIUM,
					notes: `\`\`\`python\nprint('Hello, world!')\n\`\`\``
				},
				{
					id: 'task-6',
					title: 'Task 6',
					description: 'This is the second task in Done section.',
					dueDate: '2024-06-06',
					priority: TaskPriority.LOW,
					notes: `### Heading\n- List item\n- Another list item`
				}
			]
		}
	]
};
