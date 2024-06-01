<script lang="ts">
	import { KANBANS } from '$lib/store';
	import * as Card from '$lib/components/ui/card';
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/custom/Logo.svelte';
</script>

<svelte:head>
	<title>My Kanban Boards</title>
</svelte:head>

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
					class="h-[12rem] w-[20rem] cursor-pointer overflow-hidden transition-all hover:scale-[1.01]"
					on:click={() => {
						goto(`/boards/${kanban.id}`);
					}}
				>
					<Card.Header>
						<Card.Title>
							<div>{kanban.title}</div>
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
