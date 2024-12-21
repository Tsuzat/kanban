<script lang="ts">
	import type { Writable } from 'svelte/store';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { createEventDispatcher } from 'svelte';

	interface Props {
		open: Writable<boolean>;
	}

	let { open }: Props = $props();
	const dispatch = createEventDispatcher();

	let title: string = $state('To Do');
	let color: string = $state('00FF00');

	const randomColors: string[] = [
		'FF0000',
		'FF8000',
		'FF7000',
		'FFFF00',
		'FFFF80',
		'00FF00',
		'008000',
		'00C000',
		'80FF00',
		'C0FF00',
		'0000FF',
		'000080',
		'0000C0',
		'8000FF',
		'C000FF',
		'8FCF00',
		'808000',
		'C0C000',
		'FFFFA0',
		'FFFFC0'
	];

	function handleOnSubmit() {
		dispatch('callback', { title, color });
		open.set(false);
	}
</script>

<Dialog.Root bind:open={$open}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add New Section</Dialog.Title>
			<Dialog.Description>
				Fill All the information and click submit when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Title</Label>
				<Input id="name" bind:value={title} class="col-span-3" required />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="Color" class="0 text-right">Color</Label>
				<div class="size-4 rounded" style={`background-color: #${color};`}></div>
				<Input id="Color" type="text" bind:value={color} class="col-span-2" />
			</div>
			<span class="text-center text-sm text-muted-foreground">Or Select from here</span>
			<div class="mx-4 flex w-full flex-wrap gap-2">
				{#each randomColors as clr}
					<Button
						size="icon"
						data-selected={color === clr}
						variant="ghost"
						on:click={() => {
							color = clr;
						}}
						style={`background-color: #${clr};`}
						class="size-4 rounded data-[selected=true]:border-2 data-[selected=true]:border-white"
					></Button>
				{/each}
			</div>
		</div>
		<div class="flex gap-2"></div>
		<Dialog.Footer>
			<Button
				variant="outline"
				on:click={() => {
					open.set(false);
				}}>Cancel</Button
			>
			<Button
				type="submit"
				disabled={title.length === 0 || color.length === 0}
				on:click={handleOnSubmit}
				>Create Section
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
