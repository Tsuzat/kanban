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

/**
 * Create a new kanban and save it to `localStorage`
 * @param kanban kanban to create
 */
export function createNewKanban(kanban: Kanban): void {
	saveKanbanLocally(kanban);
	KANBANS.update((kanbans) => {
		kanbans.push(kanban);
		return kanbans;
	});
}

/**
 * Move a task from one section to another
 * @param task task to move
 * @param sectionTo section to move the task to
 * @param sectionFrom section to move the task from
 */
export function moveTaskFromSectionTo(task: Task, sectionFrom: Section, sectionTo: Section): void {
	const taskIndex = sectionFrom.tasks.indexOf(task);
	sectionFrom.tasks.splice(taskIndex, 1);
	sectionTo.tasks.push(task);
}

/**
 * Remove a task from a section
 * @param task task to remove
 * @param section section to remove the task from
 */
export function deleteTask(task: Task, section: Section): void {
	const taskIndex = section.tasks.indexOf(task);
	section.tasks.splice(taskIndex, 1);
}

/**
 * Delete a section from a kanban
 * @param section section to delete
 * @param kanban kanban to delete the section from
 */
export function deleteSection(section: Section, kanban: Kanban): void {
	const sectionIndex = kanban.sections.indexOf(section);
	kanban.sections.splice(sectionIndex, 1);
	saveKanbanLocally(kanban);
}

/**
 * Remove a kanban from local storage
 * @param kanban kanban to remove
 */
export function deleteKanbanFromLocalStorage(kanban: Kanban): void {
	if (browser) {
		localStorage.removeItem(`kanban-board-${kanban.id}`);
	}
	KANBANS.update((kanbans) => {
		kanbans.splice(kanbans.indexOf(kanban), 1);
		return kanbans;
	});
}

/**
 * Add a section to a kanban
 * @param kanban kanban to add the section to
 * @param section section to add
 */
export function addSectionToKanban(kanban: Kanban, section: Section): void {
	kanban.sections.push(section);
	saveKanbanLocally(kanban);
}

/**
 * Add a task to a section
 * @param section section to add the task to
 * @param task task to add
 */
export function addTaskToSection(section: Section, task: Task): void {
	section.tasks.push(task);
}

/**
 * Move a task up in same section
 * @param task task to move
 * @param section section to move the task to
 */
export function moveTaskUpInSection(task: Task, section: Section): void {
	const taskIndex = section.tasks.indexOf(task);
	if (taskIndex === 0) return;
	const temp = section.tasks[taskIndex - 1];
	section.tasks[taskIndex - 1] = task;
	section.tasks[taskIndex] = temp;
}

/**
 * Move a task down in same section
 * @param task task to move
 * @param section section to move the task to
 */
export function moveTaskDownInSection(task: Task, section: Section): void {
	const taskIndex = section.tasks.indexOf(task);
	if (taskIndex === section.tasks.length - 1) return;
	const temp = section.tasks[taskIndex + 1];
	section.tasks[taskIndex + 1] = task;
	section.tasks[taskIndex] = temp;
}
