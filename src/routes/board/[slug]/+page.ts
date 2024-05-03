import KanbanBoard from '$lib/types/KanbanBoard';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { toast } from 'svelte-sonner';
import { writable, type Writable } from 'svelte/store';

export const ssr = false;

export const load: PageLoad = ({ params }) => {
	const slug = params.slug;
	const tmpkanban = KanbanBoard.getFromLocal(slug);
	if (tmpkanban === null) {
		toast.error('Error to find kanban', {
			description: `Kanban with id = ${slug} can not be found in local storage. You'll be redirected to /`,
			action: {
				label: 'Ok',
				onClick: () => {}
			}
		});
		redirect(404, '/');
	}

	const kanban: Writable<KanbanBoard> = writable<KanbanBoard>(tmpkanban);

	return {
		kanban: kanban
	};
};
