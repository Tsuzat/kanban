import { browser } from '$app/environment';
import type { Kanban } from './localStore/types';

export const downloadAsJson = (data: object, filename: string) => {
	if (!browser) return;
	// Format JSON nicely with 2 spaces indentation
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
	const anchorElement = document.createElement('a');
	anchorElement.href = URL.createObjectURL(blob);
	anchorElement.download = filename;
	anchorElement.style.display = 'none'; // Hide the anchor element

	document.body.appendChild(anchorElement);
	anchorElement.click();

	document.body.removeChild(anchorElement); // Cleanup after download
};

/**
 * Returns the total tasks and completed tasks in a markdown string
 * @param markdown markdown string
 * @returns [totalTodos, completedTodos]
 */
export const parseToDos = (markdown: string): [number, number] => {
	let totalTodos = 0;
	let completedTodos = 0;

	const lines = markdown.split('\n');
	for (const line of lines) {
		if (line.startsWith('- [ ] ')) {
			totalTodos++;
		} else if (line.startsWith('- [x] ') || line.startsWith('- [X] ')) {
			totalTodos++;
			completedTodos++;
		}
	}
	return [totalTodos, completedTodos];
};

export const totalTasksInKanban = (kanban: Kanban): number => {
	let totalTasks = 0;
	for (const sec of kanban.sections) {
		totalTasks += sec.tasks.length;
	}
	return totalTasks;
};
