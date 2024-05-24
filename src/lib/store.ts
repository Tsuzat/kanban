import { writable, type Writable } from 'svelte/store';
import KanbanBoard from './types/KanbanBoard';
import { browser } from '$app/environment';
import { toast } from 'svelte-sonner';
import type { KanbanBoardType } from './types/types';

export const KanBans: Writable<KanbanBoard[]> = writable([]);
export const isNavbarCollapsed: Writable<Boolean> = writable(false);

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
              onClick: () => { }
            }
          });
        }
      }
    }
  }
  KanBans.set(kanbans);

  let isNavBarCollapsed = localStorage.getItem("kanban-nav-isCollapsed") ?? "false";

  isNavbarCollapsed.set(isNavBarCollapsed === "true");
}

isNavbarCollapsed.subscribe((value) => {
  if (browser) {
    localStorage.setItem("kanban-nav-isCollapsed", value ? "true" : "false");
  }
})

