<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { project_icons } from '$lib/project_icons';
	import { KanBans } from '$lib/store';
	import KanbanBoard from '$lib/types/KanbanBoard';
	import { generateRandomId } from '$lib/utils';
	import type { Writable } from 'svelte/store';
	import * as Select from '$lib/components/ui/select/index.js';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let open: Writable<boolean>;

	// Variables for new project
	let title = 'Untitled';
	let icon = 'folder';

	$: IconButton = project_icons[icon];

	let icons: string[] = [];

	for (let i in project_icons) {
		icons.push(i);
	}

	function onSubmit() {
		// Generate Random Id
		let id: string = generateRandomId(10);
		while (true) {
			let isAlreadyPresent = false;
			for (let k of $KanBans) {
				if (k.id === id) isAlreadyPresent = true;
			}
			if (isAlreadyPresent) {
				id = generateRandomId(10);
			} else {
				break;
			}
		}
		let newKanban: KanbanBoard = new KanbanBoard(title, id, icon);
		// Add this to Kanbans
		let kanbans = $KanBans;
		kanbans.push(newKanban);
		KanBans.set(kanbans);
		open.set(false);
		if (browser) {
			goto(`/board/${id}`);
		}
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
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Title</Label>
				<Input id="name" bind:value={title} class="col-span-3" />
			</div>
			<!-- <div class="grid grid-cols-4 items-center gap-4">
				<Label for="Icon" class="text-right">Icon</Label>
				<Input id="Icon" type="text" bind:value={icon} class="col-span-3" />
			</div> -->
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="Icon" class="text-right">Icon</Label>
				<!-- <Input id="Icon" type="text" bind:value={icon} class="col-span-3" /> -->
				<svelte:component this={project_icons[icon]} class="size-4" />
				<Select.Root>
					<Select.Trigger class="w-[10rem]">
						<Select.Value placeholder="Select Icon" />
					</Select.Trigger>
					<Select.Content>
						{#each icons as icn}
							<Select.Item
								on:click={() => {
									icon = icn;
									console.log(icon);
								}}
								value={icn}
								label={icn}
							>
								<svelte:component this={project_icons[icn]} class="size-4" />
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
			<Button type="submit" on:click={onSubmit}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
