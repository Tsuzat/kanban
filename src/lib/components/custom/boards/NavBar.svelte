<script lang="ts">
	import { run } from 'svelte/legacy';

	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

	import { cn } from '$lib/components/utils';
	import { Plus, ClosePanel, Menu, Cross } from '$lib/icons';

	import { writable, type Writable } from 'svelte/store';
	import ToggleTheme from '$lib/components/custom/ToggleTheme.svelte';
	import { KANBANS, isNavbarCollapsed } from '$lib/store';
	import { page } from '$app/stores';
	import { project_icons } from '$lib/project_icons';
	import { Folder } from 'lucide-svelte';
	import Logo from '$lib/components/custom/Logo.svelte';
	import NewKanban from './NewKanban.svelte';

	let isCollapsed;
	run(() => {
		isCollapsed = $isNavbarCollapsed;
	});

	// for mobile view
	let mobile = $state(false);

	let open: Writable<boolean> = writable<boolean>(false);

	function toggleOpen() {
		open.set(!$open);
	}

	let boards = $derived($KANBANS);

	const togglePanel = () => {
		isCollapsed = !isCollapsed;
		isNavbarCollapsed.set(isCollapsed);
	};
</script>

<NewKanban {open} />

<div class="mobile">
	<Button
		on:click={() => {
			if (isCollapsed) isCollapsed = false;
			mobile = !mobile;
		}}
		variant="outline"
		size="icon"
		class="m4"
	>
		<Menu class="size-4" aria-label="true" />
	</Button>
</div>

<nav
	data-collapsed={isCollapsed}
	class:navmobile={mobile}
	class="flex h-full flex-col justify-evenly bg-gray-200 p-4 transition-all dark:bg-black"
>
	<div
		data-collapsed={isCollapsed}
		class="flex items-center justify-between data-[collapsed=true]:flex-col data-[collapsed=true]:space-y-2"
	>
		<Logo href="/boards" />
		<ToggleTheme />

		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild >
				{#snippet children({ builder })}
								<Button
						builders={[builder]}
						variant="ghost"
						size="icon"
						data-collapsed={isCollapsed}
						class="hidden transition-all data-[collapsed=true]:rotate-180 md:inline-flex md:items-center md:justify-center"
						on:click={togglePanel}
					>
						<ClosePanel class="size-4" aria-hidden="true" />
						<span class="sr-only"> {isCollapsed ? 'Open' : 'Close'} Panel </span>
					</Button>
											{/snippet}
						</Tooltip.Trigger>
			<Tooltip.Content side="right" class="item-center flex gap-4"
				>{isCollapsed ? 'Open' : 'Close'} Panel
			</Tooltip.Content>
		</Tooltip.Root>

		<Button
			variant="outline"
			size="icon"
			data-collapsed={isCollapsed}
			class="md:hidden"
			on:click={() => {
				mobile = !mobile;
			}}
		>
			<Cross class="size-4" aria-hidden="true" />
			<span class="sr-only"> Close </span>
		</Button>
	</div>

	{#if !isCollapsed}
		<div class="mb-2 mt-4 text-sm text-muted-foreground">My Projects</div>
	{/if}

	<Separator />

	<ScrollArea class="mb-2 flex-1">
		<div
			data-collapsed={isCollapsed}
			class="group flex flex-col gap-2 py-2 data-[collapsed=false]:gap-4"
		>
			{#each boards as board}
				{#if isCollapsed}
					<Tooltip.Root openDelay={0}>
						<Tooltip.Trigger asChild >
							{#snippet children({ builder })}
														<Button
									href={`/boards/${board.id}`}
									builders={[builder]}
									variant="ghost"
									size="icon"
									class={cn(
										$page.url.pathname === `/boards/${board.id}` &&
											'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
									)}
								>
									<!-- <Home class="size-4" aria-hidden="true" /> -->
									{@const SvelteComponent = project_icons[board.icon] ?? Folder}
								<SvelteComponent
										class="size-4"
										aria-hidden="true"
									/>
									<span class="sr-only">{board.title}</span>
								</Button>
																				{/snippet}
												</Tooltip.Trigger>
						<Tooltip.Content side="right" class="item-center flex">{board.title}</Tooltip.Content>
					</Tooltip.Root>
				{:else}
					<Button
						href={`/boards/${board.id}`}
						variant="ghost"
						size="sm"
						class={cn('justify-start', {
							'bg-muted hover:bg-muted': $page.url.pathname === `/boards/${board.id}`
						})}
					>
						{@const SvelteComponent_1 = project_icons[board.icon] ?? Folder}
						<SvelteComponent_1
							class="mr-4 size-5"
							aria-hidden="true"
						/>
						<span class="w-full text-ellipsis">{board.title}</span>
					</Button>
				{/if}
			{/each}
		</div>
	</ScrollArea>
	<Separator />
	{#if isCollapsed}
		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild >
				{#snippet children({ builder })}
								<Button builders={[builder]} size="icon" on:click={toggleOpen} class="my-4">
						<Plus class="size-4" aria-hidden="true" />
						<span class="sr-only">Add New Project</span>
					</Button>
											{/snippet}
						</Tooltip.Trigger>
			<Tooltip.Content side="right" class="item-center flex gap-4">Add New Project</Tooltip.Content>
		</Tooltip.Root>
	{:else}
		<Button
			variant="ghost"
			on:click={toggleOpen}
			class="mb-2 mt-4 flex w-full justify-between hover:bg-transparent"
		>
			<span class="text-muted-foreground transition-all hover:text-foreground"> New Project </span>
			<Plus class="ml-4 size-4" />
		</Button>
	{/if}
</nav>

<style>
	.mobile {
		scale: 0;
		display: none;
	}
	@media (max-width: 768px) {
		.mobile {
			scale: 1;
			position: absolute;
			display: inline-flex;
			top: 1rem;
			left: 1rem;
		}

		nav {
			position: fixed;
			transform: translateX(-100%);
		}

		.navmobile {
			z-index: 10;
			transform: translateX(0%);
		}
	}
</style>
