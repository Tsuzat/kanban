<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import type KanbanBoard from '$lib/types/KanbanBoard';

	import { CirclePlus, VerticalDots, Delete, LoaderCircle } from '$lib/icons';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { cn } from '$lib/utils';
	import { KanBans } from '$lib/store';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data: PageData;

	let open = false;

	let alertTitle = 'Are you sure';
	let alertDescription =
		'Deleting this kanban will be ir-reversible. You will be redirected to home page';
	let isDestructive = false;
	let onClick = () => {};
	let continueText = 'Continue';

	function resetAlert() {
		alertTitle = 'Are you sure';
		alertDescription =
			'Deleting this kanban will be ir-reversible. You will be redirected to home page';
		isDestructive = false;
		onClick = () => {};
		continueText = 'Continue';
	}

	$: kanban = getKanban(data.id);

	function getKanban(id: string) {
		for (let k of $KanBans) {
			if (k.id === id) return k;
		}
		if (browser) goto('/');
		return null;
	}

	function deleteKanban() {
		// Delete the Kanban
		console.log('Delete Kanban');
		// remove this kanban from localStore
		kanban?.delete();
		let kanbans: KanbanBoard[] = [];
		for (let k of $KanBans) {
			if (k.id === kanban?.id) continue;
			kanbans.push(k);
		}
		KanBans.set(kanbans);
		goto('/');
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{alertTitle}</AlertDialog.Title>
			<AlertDialog.Description>{alertDescription}</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				class={cn(
					isDestructive
						? 'border bg-destructive text-destructive-foreground hover:border-destructive hover:bg-transparent'
						: ''
				)}
				on:click={() => {
					onClick();
					resetAlert();
				}}>{continueText}</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

{#if kanban !== null}
	<div class="m-4 w-full">
		<div class="topbar flex items-center justify-between">
			<h1 class="text-xl font-bold">
				{kanban?.title}
				<span class="text-sm text-muted-foreground">12</span>
			</h1>
			<div class="actions">
				<Button class="mr-2">
					<CirclePlus class="size-4 text-white" aria-hidden="true" />
					<span class="ml-2 text-white">Task</span>
				</Button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} variant="outline" size="icon">
							<VerticalDots class="size-4" aria-hidden="true" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-44">
						<DropdownMenu.Label>Quick Actions</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item
								on:click={() => {
									continueText = 'Delete Anyway';
									isDestructive = true;
									onClick = deleteKanban;
									open = true;
								}}
								class="text-red-600"
							>
								<Delete class="mr-2 size-4 " />
								<span>Delete</span>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
	</div>
{:else}
	<LoaderCircle class="size-10 animate-spin" />
{/if}
