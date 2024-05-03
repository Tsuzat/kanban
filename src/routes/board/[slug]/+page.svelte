<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import KanbanBoard from '$lib/types/KanbanBoard';

	import {
		CirclePlus,
		VerticalDots,
		Delete,
		LoaderCircle,
		Download,
		Plus,
		CalendarIcon
	} from '$lib/icons';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Card from '$lib/components/ui/card';
	import { cn, downloadAsJson } from '$lib/utils';
	import { KanBans } from '$lib/store';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import NewSection from '$lib/components/NewSection.svelte';
	import { writable } from 'svelte/store';
	import TasksSection from '$lib/types/TasksSection';
	import NewTask from '$lib/components/NewTask.svelte';
	import type { TaskPriority } from '$lib/types/types';
	import Task from '$lib/types/Task';

	export let data: PageData;

	let open = false;
	let addNewSection = writable<boolean>(false);
	let addNewTask = writable<boolean>(false);

	let alertTitle = 'Are you sure';
	let alertDescription =
		'Deleting this kanban will be ir-reversible. You will be redirected to home page';
	let isDestructive = false;
	let onClick = () => {};
	let continueText = 'Continue';

	/**
	 * This holds the current task section context
	 * which can be usefull when creating a new task
	 * */
	let currentSectionContext: TasksSection | null = null;

	function resetAlert() {
		alertTitle = 'Are you sure?';
		alertDescription =
			'Deleting this kanban will be ir-reversible. You will be redirected to home page';
		isDestructive = false;
		onClick = () => {};
		continueText = 'Continue';
	}

	$: kanban = data.kanban;

	function deleteKanban() {
		// Delete the Kanban
		console.log('Delete Kanban');
		// remove this kanban from localStore
		$kanban.delete();
		let kanbans: KanbanBoard[] = [];
		for (let k of $KanBans) {
			if (k.id === $kanban.id) continue;
			kanbans.push(k);
		}
		KanBans.set(kanbans);
		goto('/');
		toast.success('Deleted Successfully', {
			description: `The board with id: ${$kanban.id} has been successfully deleted. You will be redirected to /`,
			action: {
				label: 'Ok',
				onClick: () => {}
			}
		});
	}

	function addSection(event: any) {
		if (kanban === null) return;
		let { title, color } = event.detail as { title: string; color: string };
		let newTasksSection: TasksSection = new TasksSection(title, color);
		let newKanban = $kanban;
		newKanban.sections.push(newTasksSection);
		console.log($kanban);
		newKanban.saveLocally();
		kanban.set(newKanban);
	}

	function addTask(event: any) {
		if (kanban === null) {
			console.log('Kanban is null');
			return;
		}
		let { title, description, dueDate, priority } = event.detail as {
			title: string;
			description: string;
			dueDate: string;
			priority: TaskPriority;
		};
		let tmpTask = new Task(title, description, dueDate, priority);
		if (currentSectionContext === null) {
			console.log(currentSectionContext);
			return;
		}
		// loop through all th elements in kanban
		let newKanban = $kanban;
		for (let section of newKanban.sections) {
			if (section === currentSectionContext) {
				section.tasks.push(tmpTask);
				break;
			}
		}
		console.log(newKanban);
		newKanban.saveLocally();
		kanban.set(newKanban);
	}

	function deleteTask(task: Task, section: TasksSection) {
		let newKanban = $kanban;
		// finding the section
		for (let s of newKanban.sections) {
			if (section === s) {
				// Delete the task
				let newTasks: Task[] = [];
				for (let t of s.tasks) {
					if (t === task) {
						toast.success('Tasks Delete successfully', {
							description: `Task with title ${task.title} is deleted successfully`,
							action: {
								label: 'Ok',
								onClick: () => {}
							}
						});
						continue;
					}
					newTasks.push(t);
				}
				// Update section
				s.tasks = newTasks;
			}
		}
		kanban.set(newKanban);
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

<NewSection open={addNewSection} on:callback={addSection} />
<NewTask open={addNewTask} on:callback={addTask} />

{#if kanban !== null}
	<div class="m-2 max-h-full w-full p-2">
		<div class="topbar flex items-center justify-between">
			<h1 class="text-xl font-bold">
				{$kanban.title}
				<span class="text-sm text-muted-foreground">12</span>
			</h1>
			<div class="actions">
				<Button
					class="mr-2"
					on:click={() => {
						addNewSection.set(true);
					}}
				>
					<CirclePlus class="size-4 text-white" aria-hidden="true" />
					<span class="ml-2 text-white">Section</span>
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
									downloadAsJson(kanban, $kanban.id);
									toast.success('Downloaded Successfully', {
										description: `${$kanban.id}.json has been downloaded successfully. You can now share or(and) import the file.`,
										action: {
											label: 'Ok',
											onClick: () => {}
										}
									});
								}}
							>
								<Download class="mr-2 size-4" />
								<span>Download as JSON</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item
								on:click={() => {
									continueText = 'Delete Anyway';
									isDestructive = true;
									onClick = deleteKanban;
									open = true;
								}}
								class="text-red-600 data-[highlighted]:bg-red-600 data-[highlighted]:text-foreground"
							>
								<Delete class="mr-2 size-4 " />
								<span>Delete</span>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
		<div class="grid-container mt-4">
			{#each $kanban.sections as section, idx (idx)}
				<div class="grid-item rounded">
					<div class="top flex items-center justify-between">
						<span class="text-sm font-bold">{section.title}</span>
						<Button
							variant="ghost"
							on:click={() => {
								addNewTask.set(true);
								currentSectionContext = section;
							}}
							size="icon"
							class="text-muted-foreground"
						>
							<Plus class="size-4" aria-label="true" />
						</Button>
					</div>
					<div class="tasks">
						{#each section.tasks as task, idx (idx)}
							<Card.Root class="transition-all">
								<Card.Header>
									<div class="card-top flex items-center justify-between">
										<div
											class={`tag ${task.priority} rounded-lg p-1 text-[0.6rem] font-bold text-white`}
										>
											{task.priority}
										</div>
										<DropdownMenu.Root>
											<DropdownMenu.Trigger asChild let:builder>
												<Button builders={[builder]} variant="ghost" size="icon">
													<VerticalDots class="size-4" aria-hidden="true" />
												</Button>
											</DropdownMenu.Trigger>
											<DropdownMenu.Content class="w-44">
												<DropdownMenu.Group>
													<DropdownMenu.Item on:click={() => {}}>
														<Download class="mr-2 size-4" />
														<span>Move Internally</span>
													</DropdownMenu.Item>
													<DropdownMenu.Item
														on:click={() => {
															alertDescription =
																'Deleting this Task will not be reversible. Do you still want to delete this?';
															continueText = 'Delete Anyway';
															isDestructive = true;
															onClick = () => {
																deleteTask(task, section);
															};
															open = true;
														}}
														class="text-red-600 data-[highlighted]:bg-red-600 data-[highlighted]:text-foreground"
													>
														<Delete class="mr-2 size-4 " />
														<span>Delete</span>
													</DropdownMenu.Item>
												</DropdownMenu.Group>
											</DropdownMenu.Content>
										</DropdownMenu.Root>
									</div>
									<Card.Title>{task.title}</Card.Title>
									<Card.Description>
										<span>Deploy your new project in one-click.</span>
										<div class="duedate mt-4 flex items-center">
											<CalendarIcon class="mr-4 size-4 text-foreground" aria-label="true" />
											<span class="text-sm">{task.dueDate}</span>
										</div>
									</Card.Description>
								</Card.Header>
							</Card.Root>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<LoaderCircle class="size-10 animate-spin" />
{/if}

<style>
	.tag {
		width: 3.5rem;
		border-radius: 3rem;
		text-align: center;
	}
	.LOW {
		background-color: rgb(2, 136, 0);
	}
	.MEDIUM {
		background-color: rgb(151, 83, 0);
	}
	.HIGH {
		background-color: rgb(174, 0, 0);
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
		.grid-container {
			grid-template-columns: auto auto;
			grid-gap: 1.5rem;
		}
		.grid-item {
			width: 90%;
		}
		.topbar h1 {
			margin-left: 4rem;
		}
	}
</style>
