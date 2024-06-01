import {
	Briefcase,
	Folder,
	FolderCog,
	FolderKanban,
	LightbulbIcon,
	LucidePenSquare,
	UserRound,
	NotebookText,
	CodeSquareIcon,
	Database,
	DatabaseBackup
} from 'lucide-svelte';

import { type ComponentType } from 'svelte';
import { type Icon } from 'lucide-svelte';

export const project_icons: Record<string, ComponentType<Icon>> = {
	folder: Folder as ComponentType<Icon>,
	foldercog: FolderCog as ComponentType<Icon>,
	briefcase: Briefcase as ComponentType<Icon>,
	folderkanban: FolderKanban as ComponentType<Icon>,
	lightbulb: LightbulbIcon as ComponentType<Icon>,
	pensquare: LucidePenSquare as ComponentType<Icon>,
	userround: UserRound as ComponentType<Icon>,
	notebook: NotebookText as ComponentType<Icon>,
	code: CodeSquareIcon as ComponentType<Icon>,
	database: Database as ComponentType<Icon>,
	databaseSync: DatabaseBackup as ComponentType<Icon>
};
