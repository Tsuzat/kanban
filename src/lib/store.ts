import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { sampleKanban, type Kanban } from './localStore/types';
import { kanbanFromJSON, saveKanbanLocally } from './localStore/utils';

export const isNavbarCollapsed = writable(false);

export const KANBANS = writable<Kanban[]>([]);

if (browser) {
	const tmpFirstTimeBootUp = localStorage.getItem('kanban-first-time-boot-up') ?? 'true';
	if (tmpFirstTimeBootUp === 'true') {
		localStorage.setItem('kanban-first-time-boot-up', 'false');
		saveKanbanLocally(sampleKanban);
	}
	// get the navbar collapsed
	const tmpCollapsed = localStorage.getItem('kanban-navbar-collapsed') ?? 'false';
	isNavbarCollapsed.set(tmpCollapsed === 'true');

	// Get all the local storage kanbans, the id needs to be started with 'kanban-board-'
	const localKanbans: Kanban[] = [];
	for (const key in localStorage) {
		if (key.startsWith('kanban-board-')) {
			const rawKanban = localStorage.getItem(key);
			if (rawKanban) {
				try {
					const newKanban = kanbanFromJSON(rawKanban);
					localKanbans.push(newKanban);
				} catch (e) {
					console.error('Error loading kanban from local storage', e);
					continue;
				}
			}
		}
	}
	KANBANS.set(localKanbans);
}

isNavbarCollapsed.subscribe((value) => {
	if (browser) localStorage.setItem('kanban-navbar-collapsed', value ? 'true' : 'false');
});
