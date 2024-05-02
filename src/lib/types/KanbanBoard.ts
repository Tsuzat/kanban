import { browser } from '$app/environment';

export default class KanbanBoard {
	title: string;
	id: string;
	icon: string;

	constructor(title: string, id: string, icon: string) {
		this.title = title;
		this.id = id;
		this.icon = icon;
		this.saveLocally();
	}

	toJSON(): object {
		return {
			title: this.title,
			id: this.id,
			icon: this.icon
		};
	}

	static fromJSON(data: object): KanbanBoard {
		if (!data || typeof data !== 'object') {
			throw new Error('Invalid data provided for KanbanBoard.fromJSON');
		}

		const { title, id, icon } = data as {
			title: string;
			id: string;
			icon: string;
			variant?: string;
		};

		return new KanbanBoard(title, id, icon); // Set default variant if missing
	}

	saveLocally() {
		if (browser) localStorage.setItem(`kanban-board-${this.id}`, JSON.stringify(this.toJSON()));
	}

	static getFromLocal(id: string) {
		let tmp = localStorage.getItem(`kanban-board-${id}`);
		if (tmp !== null) return KanbanBoard.fromJSON(JSON.parse(tmp));
		return null;
	}

	delete() {
		if (browser) localStorage.removeItem(`kanban-board-${this.id}`);
	}
}
