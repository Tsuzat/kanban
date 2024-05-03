import Task from './Task';
import type { TaskType, TasksSectionType } from './types';

export default class TasksSection {
	title: string;
	statusColor: string;
	tasks: Task[];

	constructor(title: string, statusColor: string, tasks: Task[] = []) {
		this.title = title;
		this.statusColor = statusColor;
		this.tasks = tasks;
	}

	static fromJSON(json: TasksSectionType): TasksSection {
		const tasks = json.tasks.map((taskJson: TaskType) => Task.fromJSON(taskJson));
		return new TasksSection(json.title, json.statusColor, tasks);
	}

	toJSON(): TasksSectionType {
		return {
			title: this.title,
			statusColor: this.statusColor,
			tasks: this.tasks.map((task) => task.toJSON())
		};
	}
}
