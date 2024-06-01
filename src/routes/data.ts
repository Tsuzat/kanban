import { BookMarked, DropLets, Todos, Cookie } from '$lib/icons';
import type { Icon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export const features = [
	{
		name: 'Drag and Drop',
		icon: DropLets as ComponentType<Icon>,
		description:
			'Effortlessly move tasks between sections with an intuitive drag and drop functionality.',
		media: ''
	},
	{
		name: 'Privacy',
		icon: Cookie as ComponentType<Icon>,
		description: 'Your data is stored locally, ensuring your privacy and security.',
		media: ''
	},
	{
		name: 'Markdown Support',
		icon: BookMarked as ComponentType<Icon>,
		description: 'Use Markdown to format your task notes for better organization and readability.',
		media: ''
	},
	{
		name: 'Todos Parsing',
		icon: Todos as ComponentType<Icon>,
		description: 'Automatically parse and track todos mentioned in your task notes.',
		media: ''
	}
];
