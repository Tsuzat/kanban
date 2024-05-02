<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

	import { cn } from '$lib/utils';
	import { Home, Plus, ClosePanel, OpenPanel } from '$lib/icons';

	import { writable, type Writable } from 'svelte/store';
	import ToggleTheme from './ToggleTheme.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import type KanbanBoard from '$lib/types/KanbanBoard';
	import NewProject from './NewProject.svelte';
	import { KanBans } from '$lib/store';
	import { page } from '$app/stores';
	import { project_icons } from '$lib/project_icons';
	import { Folder } from 'lucide-svelte';

	let isCollapsed: boolean;

	let open: Writable<boolean> = writable<boolean>(false);

	function toggleOpen() {
		open.set(!$open);
	}

	$: boards = $KanBans;

	const togglePanel = () => {
		isCollapsed = !isCollapsed;
	};
</script>

<NewProject {open} />

<nav
	data-collapsed={isCollapsed}
	class="flex h-full flex-col justify-evenly bg-gray-200 p-5 transition-all dark:bg-black"
>
	<div
		data-collapsed={isCollapsed}
		class="flex items-center justify-between data-[collapsed=true]:flex-col data-[collapsed=true]:space-y-2"
	>
		<a href="/">
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
		</a>
		<ToggleTheme />
		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="icon" on:click={togglePanel}>
					{#if isCollapsed}
						<OpenPanel class="size-4" aria-hidden="true" />
					{:else}
						<ClosePanel class="size-4" aria-hidden="true" />
					{/if}
					<span class="sr-only"> {isCollapsed ? 'Open' : 'Close'} Panel </span>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" class="item-center flex gap-4"
				>{isCollapsed ? 'Open' : 'Close'} Panel
			</Tooltip.Content>
		</Tooltip.Root>
	</div>

	<!-- {#if !isCollapsed}
		<Button href={`/`} variant="ghost" size="sm" class="my-2 justify-start hover:bg-muted">
			<Home class="mr-4 size-4" />
			<span>Home</span>
		</Button>
	{:else}
		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} href="/" variant="ghost" size="icon">
					<Home class="size-4" aria-hidden="true" />
					<span class="sr-only"> Home Page </span>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" class="item-center flex gap-4">Home Page</Tooltip.Content>
		</Tooltip.Root>
	{/if} -->

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
						<Tooltip.Trigger asChild let:builder>
							<Button
								href={`/board/${board.id}`}
								builders={[builder]}
								variant="ghost"
								size="icon"
								class={cn(
									$page.url.pathname === `/board/${board.id}` &&
										'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
								)}
							>
								<!-- <Home class="size-4" aria-hidden="true" /> -->
								<svelte:component
									this={project_icons[board.icon] ?? Folder}
									class="size-4"
									aria-hidden="true"
								/>
								<span class="sr-only">{board.title}</span>
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right" class="item-center flex">{board.title}</Tooltip.Content>
					</Tooltip.Root>
				{:else}
					<Button
						href={`/board/${board.id}`}
						variant="ghost"
						size="sm"
						class={cn('justify-start', {
							'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white':
								$page.url.pathname === `/board/${board.id}`
						})}
					>
						<svelte:component
							this={project_icons[board.icon] ?? Folder}
							class="mr-4 size-4"
							aria-hidden="true"
						/>
						{board.title}
					</Button>
				{/if}
			{/each}
		</div>
	</ScrollArea>
	<Separator />
	{#if isCollapsed}
		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} size="icon" on:click={toggleOpen} class="my-4">
					<Plus class="size-4" aria-hidden="true" />
					<span class="sr-only">Add New Project</span>
				</Button>
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
</style>
