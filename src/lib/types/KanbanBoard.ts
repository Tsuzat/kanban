import { browser } from '$app/environment';
import TasksSection from './TasksSection';
import type { KanbanBoardType, TasksSectionType } from './types';

export default class KanbanBoard {
	title: string;
	id: string;
	icon: string;
	sections: TasksSection[];

	constructor(title: string, id: string, icon: string, sections: TasksSection[] = []) {
		this.title = title;
		this.id = id;
		this.icon = icon;
		this.sections = sections;
		this.saveLocally();
	}

	toJSON(): KanbanBoardType {
		return {
			title: this.title,
			icon: this.icon,
			id: this.id,
			sections: this.sections.map((section) => section.toJSON())
		};
	}

	static fromJSON(json: KanbanBoardType): KanbanBoard {
		if (!json || typeof json !== 'object') {
			throw new Error('Invalid data provided for KanbanBoard.fromJSON');
		}

		const sections = json.sections.map((sectionJson: object) =>
			TasksSection.fromJSON(sectionJson as TasksSectionType)
		);
		return new KanbanBoard(json.title, json.id, json.icon, sections);
	}

	saveLocally() {
		if (browser) localStorage.setItem(`kanban-board-${this.id}`, JSON.stringify(this.toJSON()));
	}

	static getFromLocal(id: string) {
		if (!browser) return;
		const tmp = localStorage.getItem(`kanban-board-${id}`);
		if (tmp !== null) return KanbanBoard.fromJSON(JSON.parse(tmp));
		return null;
	}

	delete() {
		if (browser) localStorage.removeItem(`kanban-board-${this.id}`);
	}
}
