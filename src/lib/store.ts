import { writable, type Writable } from 'svelte/store';
import KanbanBoard from './types/KanbanBoard';
import { browser } from '$app/environment';

export const KanBans: Writable<KanbanBoard[]> = writable([]);

KanBans.subscribe((value) => {
	console.log('Updated KanBans');
	console.log(value);
});

if (browser) {
	const allItems = [];
	const prefix = 'kanban-board-';

	for (const key in localStorage) {
		if (key.startsWith(prefix)) {
			const value = localStorage.getItem(key);
			if (value) {
				allItems.push(JSON.parse(value));
			}
		}
	}
	let kanbans: KanbanBoard[] = [];
	for (let k of allItems) {
		kanbans.push(KanbanBoard.fromJSON(k));
	}
	KanBans.set(kanbans);
}
