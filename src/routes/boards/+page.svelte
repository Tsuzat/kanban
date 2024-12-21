<script lang="ts">
	import { KANBANS } from '$lib/store';
	import * as Card from '$lib/components/ui/card';
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/custom/Logo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Delete, Edit } from '$lib/icons';
	import { deleteKanbanFromLocalStorage } from '$lib/localStore/utils';
	import GlobalPopUp from '$lib/components/custom/boards/GlobalPopUp.svelte';
	import { writable } from 'svelte/store';

	// Global PopUp Related
	let openGlobalPopUp = writable(false);
	let alertTitle = $state('');
	let alertDescription = $state('');
	let continueText = $state('');
	let isDestructive = $state(false);
	let onClick = $state(() => {});
</script>

<svelte:head>
	<title>My Kanban Boards</title>
</svelte:head>

<GlobalPopUp
	open={openGlobalPopUp}
	{alertTitle}
	{alertDescription}
	{continueText}
	{isDestructive}
	{onClick}
/>
<div class="m-2 max-h-full w-full overflow-y-auto overflow-x-hidden p-2">
	<div class="mobile topbar ml-12 items-center">
		<div><Logo /></div>
		<div class="ml-4 text-xl">KanBan</div>
	</div>
	{#if $KANBANS.length === 0}
		<center>There is not Kanban. Please create one.</center>
	{/if}
	<div class="mt-4 flex flex-wrap items-center">
		{#each $KANBANS as kanban}
			<div class="mx-4">
				<Card.Root
					class="group relative h-[12rem] w-[20rem] cursor-pointer overflow-hidden transition-all hover:scale-[1.01]"
				>
					<Card.Header>
						<Card.Title>
							<div class="flex items-center justify-between">
								<span>
									{kanban.title}
								</span>
								<div
									class="absolute right-0 top-0 z-10 opacity-80 hidden group-hover:inline-flex bg-muted bg-opacity-30 rounded-sm"
								>
									<Button size="icon" variant="ghost" on:click={() => goto(`/boards/${kanban.id}`)}>
										<Edit class="size-4 mr-2" />
									</Button>
									<Button
										size="icon"
										variant="ghost"
										on:click={() => {
											alertTitle = 'Are you sure?';
											alertDescription =
												'Deleting this Kanban will not be reversible. Do you still want to delete this?';
											continueText = 'Delete Anyway';
											isDestructive = true;
											onClick = () => {
												deleteKanbanFromLocalStorage(kanban);
											};
											openGlobalPopUp.set(true);
										}}
									>
										<Delete class="size-4" />
									</Button>
								</div>
							</div>
						</Card.Title>
						<Card.Description>
							<h1 class="text-[1rem] font-bold">Sections</h1>
							{#each kanban.sections as section}
								<div class="my-2">{section.title} : {section.tasks.length} Tasks</div>
							{/each}
						</Card.Description>
					</Card.Header>
				</Card.Root>
			</div>
		{/each}
	</div>
</div>

<style>
	.mobile {
		display: none;
	}

	@media (max-width: 768px) {
		.mobile {
			display: flex;
		}
	}
</style>
