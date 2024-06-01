import { browser } from '$app/environment';
import { KANBANS } from '$lib/store';
import { type Task, type Section, type Kanban, TaskPriority } from './types';

export function taskToJSON(task: Task): string {
	return JSON.stringify(task);
}

export function taskFromJSON(json: string): Task {
	const obj = JSON.parse(json);
	return {
		...obj,
		priority: TaskPriority[obj.priority as keyof typeof TaskPriority]
	};
}

export function sectionToJSON(section: Section): string {
	return JSON.stringify({
		...section,
		tasks: section.tasks.map(taskToJSON)
	});
}

export function sectionFromJSON(json: string): Section {
	const obj = JSON.parse(json);
	return {
		...obj,
		tasks: obj.tasks.map((taskJson: string) => taskFromJSON(taskJson))
	};
}

export function kanbanToJSON(kanban: Kanban): string {
	return JSON.stringify({
		...kanban,
		sections: kanban.sections.map(sectionToJSON)
	});
}

export function kanbanFromJSON(json: string): Kanban {
	const obj = JSON.parse(json);
	return {
		...obj,
		sections: obj.sections.map((sectionJson: string) => sectionFromJSON(sectionJson))
	};
}

export function generateRandomId(length: number = 20): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

/**
 * Generate a unique id for a kanban based on the current list of kanbans.
 * @returns a unique id for the kanban
 */
export function generateKanbanId(): string {
	const ids: string[] = [];
	KANBANS.subscribe((kanbans) => {
		for (const kanban of kanbans) {
			ids.push(kanban.id);
		}
	});
	let id = generateRandomId();
	while (ids.includes(id)) {
		id = generateRandomId();
	}
	return id;
}

/**
 * Generate a unique id for a section based on the current list of sections.
 * @param kanban kanban to generate a section id for
 * @returns unique id for the section
 */
export function generateSectionId(kanban: Kanban): string {
	const ids: string[] = [];
	kanban.sections.forEach((section) => {
		ids.push(section.id);
	});
	let id = generateRandomId();
	while (ids.includes(id)) {
		id = generateRandomId();
	}
	return id;
}

/**
 * Generate a unique id for a task based on the current list of tasks across all sections.
 * @param kanban kanban to generate a task id for
 * @returns unique id for the task
 */
export function generateTaskId(kanban: Kanban): string {
	const ids: string[] = [];
	kanban.sections.forEach((section) => {
		section.tasks.forEach((task) => {
			ids.push(task.id);
		});
	});
	let id = generateRandomId();
	while (ids.includes(id)) {
		id = generateRandomId();
	}
	return id;
}

/**
 * Save a kanban to local storage.
 * @param kanban kanban to save
 */
export function saveKanbanLocally(kanban: Kanban): void {
	if (browser) {
		const json = kanbanToJSON(kanban);
		localStorage.setItem(`kanban-board-${kanban.id}`, json);
	}
}

export function createNewKanban(kanban: Kanban): void {
	KANBANS.update((kanbans) => {
		kanbans.push(kanban);
		saveKanbanLocally(kanban);
		return kanbans;
	});
}
