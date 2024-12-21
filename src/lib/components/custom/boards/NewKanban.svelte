<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { project_icons } from '$lib/project_icons';
	import type { Writable } from 'svelte/store';
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto } from '$app/navigation';
	import { createNewKanban, generateKanbanId } from '$lib/localStore/utils';
	import type { Kanban, Section } from '$lib/localStore/types';

	interface Props {
		open: Writable<boolean>;
	}

	let { open }: Props = $props();

	// Variables for new project
	let title = $state('Untitled');
	let icon = $state('folder');

	let icons: string[] = [];

	for (let i in project_icons) {
		icons.push(i);
	}

	function onSubmit() {
		// Generate Random Id for new Kanban
		let id = generateKanbanId();
		let sections: Section[] = [];
		let newKanban: Kanban = {
			id,
			title,
			icon,
			sections
		};
		createNewKanban(newKanban);
		open.set(false);
		goto(`/boards/${id}`);
	}
</script>

<Dialog.Root bind:open={$open}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Project</Dialog.Title>
			<Dialog.Description>
				Fill All the information and click submit when you're done.
			</Dialog.Description>
		</Dialog.Header>
		{@const SvelteComponent = project_icons[icon]}
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Title</Label>
				<Input id="name" bind:value={title} class="col-span-3" required />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="Icon" class="text-right">Icon</Label>
				<SvelteComponent class="size-4" />
				<Select.Root>
					<Select.Trigger class="w-[10rem]">
						<Select.Value placeholder="Select Icon" />
					</Select.Trigger>
					<Select.Content>
						{#each icons as icn}
							<Select.Item
								on:click={() => {
									icon = icn;
								}}
								value={icn}
								label={icn}
							>
								{@const SvelteComponent_1 = project_icons[icn]}
								<SvelteComponent_1 class="size-4" />
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<Dialog.Footer>
			<Button
				variant="outline"
				on:click={() => {
					open.set(false);
				}}>Cancel</Button
			>
			<Button type="submit" disabled={title.length === 0} on:click={onSubmit}>Create Project</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
