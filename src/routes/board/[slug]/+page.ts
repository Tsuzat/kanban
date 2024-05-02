import KanbanBoard from '$lib/types/KanbanBoard';
import type { PageLoad } from './$types';
import { KanBans } from '$lib/store';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	let slug = params.slug;

	return {
		id: slug
	};
};
