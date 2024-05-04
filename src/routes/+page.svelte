<script lang="ts">
	import { KanBans } from '$lib/store';
	import * as Card from '$lib/components/ui/card';
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
</script>

<div class="m-2 max-h-full w-full overflow-y-auto overflow-x-hidden p-2">
	<div class="mobile topbar ml-12 items-center">
		<div><Logo /></div>
		<div class="ml-4 text-xl">KanBan</div>
	</div>
	{#if $KanBans.length === 0}
		<center>There is not Kanban. Please create one.</center>
	{/if}
	<div class="grid-container mt-4">
		{#each $KanBans as kanban}
			<div class="grid-item">
				<Card.Root
					class="h-[12rem] cursor-pointer transition-all hover:scale-[1.01]"
					on:click={() => {
						goto(`/board/${kanban.id}`);
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
	.grid-container {
		display: grid;
		grid-template-columns: auto auto auto;
		grid-gap: 2rem;
	}

	.grid-item {
		width: 85%;
	}

	@media screen and (max-width: 480px) {
		.grid-container {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.grid-item {
			width: 80%;
		}
	}
	@media (max-width: 768px) {
		.mobile {
			display: flex;
		}
		.grid-container {
			grid-template-columns: auto auto;
			grid-gap: 1.5rem;
		}
		.grid-item {
			width: 90%;
		}
	}
</style>
