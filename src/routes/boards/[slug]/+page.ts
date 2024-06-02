import type { Kanban } from '$lib/localStore/types';
import { kanbanFromJSON } from '$lib/localStore/utils.js';
import { redirect } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';
import { writable, type Writable } from 'svelte/store';

export const ssr = false;
export const csr = true;

export async function load({ params }) {
	// load the kanban from local storage
	let tmpKanban: Kanban;
	const kanban: Writable<Kanban> = writable<Kanban>();

	const rawKanban = localStorage.getItem(`kanban-board-${params.slug}`);

	if (rawKanban === null) {
		alert(
			`Kanban with id = ${params.slug} can not be found in local storage. You'll be redirected to /boards`
		);
		redirect(308, '/boards');
	}

	try {
		tmpKanban = kanbanFromJSON(rawKanban);
		kanban.set(tmpKanban);
	} catch (e) {
		console.error('Error loading kanban from local storage', e);
		toast.error('Error loading kanban from local storage', {
			description: 'Looks like kanban board does not exist in your local storage.'
		});
		redirect(308, '/boards');
	}

	return {
		kanban
	};
}
