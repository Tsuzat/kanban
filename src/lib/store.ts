import { writable, type Writable } from 'svelte/store';
import KanbanBoard from './types/KanbanBoard';
import { browser } from '$app/environment';
import { toast } from 'svelte-sonner';
import type { KanbanBoardType } from './types/types';

export const KanBans: Writable<KanbanBoard[]> = writable([]);

// KanBans.subscribe((value) => {
// 	console.log('Updated KanBans');
// 	console.log(value);
// });

if (browser) {
	const prefix = 'kanban-board-';
	const kanbans: KanbanBoard[] = [];

	for (const key in localStorage) {
		if (key.startsWith(prefix)) {
			const value = localStorage.getItem(key);
			if (value) {
				try {
					const tmpKanBanJSON: KanbanBoardType = JSON.parse(value);
					const tmpKanBan: KanbanBoard = KanbanBoard.fromJSON(tmpKanBanJSON);
					kanbans.push(tmpKanBan);
				} catch (error) {
					toast.error('Error while parsing data', {
						description:
							'Kanban can not be parsed because of corrupted data. This will be automatically deleted ',
						action: {
							label: 'Ok',
							onClick: () => {}
						}
					});
				}
			}
		}
	}
	KanBans.set(kanbans);
}
