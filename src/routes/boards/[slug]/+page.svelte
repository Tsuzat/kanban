<script lang="ts">
	import type { PageData } from './$types';
	import {
		Edit,
		LoaderCircle,
		Plus,
		ArrowUpAndDown,
		ChevronsUp,
		ChevronsDown,
		ArrowLeftAndRight,
		Calendar
	} from '$lib/icons';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Card from '$lib/components/ui/card';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { Button } from '$lib/components/ui/button/index.js';
	import { CirclePlus, Delete, VerticalDots, Download, Upload } from '$lib/icons';
	import { toast } from 'svelte-sonner';
	import { DeviceIsMobile, downloadAsJson, totalTasksInKanban, uploadJson, validateKanban } from '$lib/utils';
	import {
		generateSectionId,
		generateTaskId,
		addSectionToKanban,
		saveKanbanLocally,
		deleteSection,
		addTaskToSection,
		deleteTask,
		moveTaskFromSectionTo,
		moveTaskUpInSection,
		moveTaskDownInSection,
		deleteKanbanFromLocalStorage
	} from '$lib/localStore/utils';
	import { type Section, type Task, TaskPriority } from '$lib/localStore/types';
	import { writable } from 'svelte/store';
	import NewSection from '$lib/components/custom/boards/NewSection.svelte';
	import TodosInNotes from '$lib/components/custom/boards/TodosInNotes.svelte';
	import TaskSheet from '$lib/components/custom/boards/TaskSheet.svelte';
	import NewTask from '$lib/components/custom/boards/NewTask.svelte';
	import GlobalPopUp from '$lib/components/custom/boards/GlobalPopUp.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Kanban } from 'lucide-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let kanban = $derived(data.kanban);
	let totalTasks = $derived(totalTasksInKanban($kanban));

	// Related to Open Different PopUps
	let openAddNewSection = writable(false);
	let openAddNewTask = writable(false);
	let openTaskSheet = writable(false);

	// To Update Current Section and Task
	let currentSectionContext: Section | null = $state(null);
	let currentTaskContext: Task | null = $state(null);

	// Related to Drag and Drop
	let flipDurationMs = 200;
	let dragDisabled = $state(false);

	// Global PopUp Related
	let openGlobalPopUp = writable(false);
	let alertTitle = $state('');
	let alertDescription = $state('');
	let continueText = $state('');
	let isDestructive = $state(false);
	let onClick = $state(() => {});

	onMount(() => {
		if (DeviceIsMobile()) {
			console.log('Mobile Device Detected');
			dragDisabled = true;
			toast.success('Mobile Device Detected', {
				description:
					'Drag and Drop is disabled for mobile devices. Use menu options to move tasks.',
				duration: 10000,
				action: {
					label: 'Ok',
					onClick: () => {}
				}
			});
		}
	});

	function createNewSection(e: any) {
		if (kanban === null) return;
		let { title, color } = e.detail as { title: string; color: string };
		let newSectionId = generateSectionId($kanban);
		let tasks: Task[] = [];
		let newSection: Section = {
			id: newSectionId,
			title,
			color,
			tasks
		};
		addSectionToKanban($kanban, newSection);
		kanban.set($kanban);
	}

	function transformDraggedElement(draggedEl: HTMLElement, data: any, index: any) {
		draggedEl.style.opacity = '0.5';
	}
	function handleDndConsiderTasks(cid: string, e: any) {
		const colIdx = $kanban.sections.findIndex((c) => c.id === cid);
		$kanban.sections[colIdx].tasks = e.detail.items;
		saveKanbanLocally($kanban);
		kanban.set($kanban);
	}
	function handleDndFinalizeTasks(cid: string, e: any) {
		console.log(typeof e);
		const colIdx = $kanban.sections.findIndex((c) => c.id === cid);
		$kanban.sections[colIdx].tasks = e.detail.items;
		saveKanbanLocally($kanban);
		kanban.set($kanban);
	}

	function deleteSectionFromKanban(section: Section) {
		deleteSection(section, $kanban);
		saveKanbanLocally($kanban);
		kanban.set($kanban);
		toast.success('Section Deleted Successfully', {
			description: `${section.title} has been deleted successfully.`,
			action: {
				label: 'Ok',
				onClick: () => {}
			}
		});
	}

	// TASK RELATED FUNCTIONS
	function createNewTask(e: any) {
		if (kanban === null || currentSectionContext === null) return;
		let { title, description, dueDate, priority } = e.detail as {
			title: string;
			description: string;
			dueDate: string;
			priority: TaskPriority;
		};
		let notes: string = '';
		let newTask: Task = {
			id: generateTaskId($kanban),
			title,
			description,
			dueDate,
			priority,
			notes
		};
		addTaskToSection(currentSectionContext, newTask);
		saveKanbanLocally($kanban);
		kanban.set($kanban);
	}

	function handleDeleteTask(task: Task, section: Section) {
		deleteTask(task, section);
		saveKanbanLocally($kanban);
		kanban.set($kanban);
		toast.success('Task Deleted Successfully', {
			description: `${task.title} has been deleted successfully.`,
			action: {
				label: 'Ok',
				onClick: () => {}
			}
		});
	}

	function moveTaskToSection(task: Task, section: Section, sec: Section) {
		moveTaskFromSectionTo(task, section, sec);
		saveKanbanLocally($kanban);
		kanban.set($kanban);
	}

	function moveTaskUp(task: Task, section: Section) {
		moveTaskUpInSection(task, section);
		saveKanbanLocally($kanban);
		kanban.set($kanban);
	}

	function moveTaskDown(task: Task, section: Section) {
		moveTaskDownInSection(task, section);
		saveKanbanLocally($kanban);
		kanban.set($kanban);
	}

	function handleTaskSheetCallback(e: any) {
		let { task } = e.detail as { task: Task };
		currentTaskContext = task;
		saveKanbanLocally($kanban);
		kanban.set($kanban);
	}
</script>

<svelte:head>
	<title>Board | {$kanban.title}</title>
</svelte:head>

<NewSection open={openAddNewSection} on:callback={createNewSection} />
<NewTask open={openAddNewTask} on:callback={createNewTask} />

{#if currentTaskContext}
	<TaskSheet open={openTaskSheet} task={currentTaskContext} on:callback={handleTaskSheetCallback} />
{/if}
<GlobalPopUp
	open={openGlobalPopUp}
	{alertTitle}
	{alertDescription}
	{continueText}
	{isDestructive}
	{onClick}
/>
<div class="w-full h-full p-4">
	{#if kanban}
		<div class="topbar flex items-center justify-between">
			<h1 class="text-2xl font-bold">
				{$kanban.title}
				<span class="text-xl text-muted-foreground">{totalTasks}</span>
			</h1>
			<div class="actions">
				<Button
					class="mr-2 hidden sm:inline-flex"
					on:click={() => {
						openAddNewSection.set(true);
					}}
				>
					<CirclePlus class="size-4 text-white" aria-hidden="true" />
					<span class="ml-2 text-white">Section</span>
				</Button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild >
						{#snippet children({ builder })}
												<Button builders={[builder]} variant="outline" size="icon">
								<VerticalDots class="size-4" aria-hidden="true" />
							</Button>
																	{/snippet}
										</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-44">
						<DropdownMenu.Label>Quick Actions</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item on:click={() => {}} class="sm:hidden inline-flex">
								<CirclePlus class="mr-2 size-4" />
								<span>Add New Section</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item
								on:click={() => {
									downloadAsJson($kanban, $kanban.id);
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
									uploadJson().then((data) => {
										if (!data) {
											toast.error('Invalid JSON', {
												description: 'The JSON file is invalid or empty.',
												action: {
													label: 'Ok',
													onClick: () => {}
												}
											});
											return;
										}
										const kanbanObject = validateKanban(data);
										if (kanbanObject instanceof Error) {
											toast.error('Invalid JSON', {
												description: kanbanObject.message,
												action: {
													label: 'Ok',
													onClick: () => {}
												}
											});
											return;
										}
										alertTitle = 'Are you sure?';
										alertDescription =
											'Importing this JSON will overwrite the current Project.';
										continueText = 'Confirm overwrite';
										isDestructive = true;
										//modify kanbanObject to have the same id and title as the current kanban
										kanbanObject.id = $kanban.id;
										kanbanObject.title = $kanban.title;
										onClick = () => {
											saveKanbanLocally(kanbanObject);
											kanban.set(kanbanObject);
											toast.success('Imported Successfully', {
												description: 'The JSON file has been imported successfully.',
												action: {
													label: 'Ok',
													onClick: () => {}
												}
											});
										};
										openGlobalPopUp.set(true);
									});
								}}
							>
								<Upload class="mr-2 size-4" />
								<span>Import from JSON</span>
							</DropdownMenu.Item>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger
									class="text-red-600 data-[highlighted]:bg-red-600 data-[highlighted]:text-foreground"
								>
									<Delete class="mr-2 h-4 w-4" />
									<span>Delete Section</span>
								</DropdownMenu.SubTrigger>
								<DropdownMenu.SubContent>
									{#each $kanban.sections as section}
										<DropdownMenu.Item
											on:click={() => {
												deleteSectionFromKanban(section);
											}}
										>
											<span>{section.title}</span>
										</DropdownMenu.Item>
									{/each}
								</DropdownMenu.SubContent>
							</DropdownMenu.Sub>
							<DropdownMenu.Item
								on:click={() => {
									alertTitle = 'Are you sure?';
									alertDescription =
										'Deleting this Kanban will not be reversible. Do you still want to delete this?';
									continueText = 'Delete Anyway';
									isDestructive = true;
									onClick = () => {
										deleteKanbanFromLocalStorage($kanban);
										goto('/boards');
									};
									openGlobalPopUp.set(true);
								}}
								class="text-red-600 data-[highlighted]:bg-red-600 data-[highlighted]:text-foreground"
							>
								<Delete class="mr-2 size-4 " />
								<span>Delete Board</span>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
		<div class="grid-container mt-4">
			{#each $kanban.sections as section (section.id)}
				<div class="grid-item rounded">
					<div class="top mb-4 flex items-center justify-between">
						<span class="text-sm font-bold">
							{section.title}
							<span
								class="ml-2 rounded-full px-2 py-1 text-sm text-muted-foreground"
								style={`background-color: #${section.color + '20'}; color: #${section.color};`}
							>
								{section.tasks.length}
							</span>
						</span>
						<Button
							variant="ghost"
							on:click={() => {
								openAddNewTask.set(true);
								currentSectionContext = section;
							}}
							size="icon"
							class="text-muted-foreground"
						>
							<Plus class="size-4" aria-label="true" />
						</Button>
					</div>
					<div
						class="tasks min-h-[13rem] rounded-md p-2"
						use:dndzone={{
							items: section.tasks,
							flipDurationMs,
							dragDisabled,
							transformDraggedElement,
							dropTargetStyle: {
								outline: `#${section.color + '80'} dashed 1px`,
								borderRadius: '5px'
							}
						}}
						onconsider={(e) => handleDndConsiderTasks(section.id, e)}
						onfinalize={(e) => handleDndFinalizeTasks(section.id, e)}
					>
						{#each section.tasks as task (task.id)}
							<div animate:flip={{ duration: flipDurationMs }} class="outline-none">
								<Card.Root
									class="group my-2 transition-all hover:scale-[1.01]"
									style={`background-color: #${section.color + '10'}; border-color: #${section.color + '20'}`}
								>
									<Card.Header>
										<div class="card-top flex items-center justify-between">
											<div
												class={`tag ${task.priority} rounded-lg p-1 text-[0.6rem] font-bold text-white`}
											>
												{task.priority}
											</div>
											<div>
												<Button
													variant="ghost"
													size="icon"
													class="scale-100 transition-all group-hover:scale-100 sm:scale-0"
													on:click={() => {
														currentTaskContext = task;
														openTaskSheet.set(true);
													}}
												>
													<Edit class="size-4" />
												</Button>
												<DropdownMenu.Root>
													<DropdownMenu.Trigger asChild >
														{#snippet children({ builder })}
																												<Button builders={[builder]} variant="ghost" size="icon">
																<VerticalDots class="size-4" aria-hidden="true" />
															</Button>
																																									{/snippet}
																										</DropdownMenu.Trigger>
													<DropdownMenu.Content class="w-44">
														<DropdownMenu.Group>
															<DropdownMenu.Item
																on:click={() => {
																	downloadAsJson(task, task.title);
																}}
															>
																<Download class="mr-2 size-4" />
																<span>Download as JSON</span>
															</DropdownMenu.Item>
															<DropdownMenu.Sub>
																<DropdownMenu.SubTrigger>
																	<ArrowUpAndDown class="mr-2 h-4 w-4" />
																	<span>Move Internally</span>
																</DropdownMenu.SubTrigger>
																<DropdownMenu.SubContent>
																	<DropdownMenu.Item
																		on:click={() => {
																			moveTaskUp(task, section);
																		}}
																	>
																		<ChevronsUp class="mr-2 size-4" />
																		<span>Move Up</span>
																	</DropdownMenu.Item>
																	<DropdownMenu.Item
																		on:click={() => {
																			moveTaskDown(task, section);
																		}}
																	>
																		<ChevronsDown class="mr-2 size-4" />
																		<span>Move Down</span>
																	</DropdownMenu.Item>
																</DropdownMenu.SubContent>
															</DropdownMenu.Sub>
															<DropdownMenu.Sub>
																<DropdownMenu.SubTrigger>
																	<ArrowLeftAndRight class="mr-2 h-4 w-4" />
																	<span>Move to section</span>
																</DropdownMenu.SubTrigger>
																<DropdownMenu.SubContent>
																	{#each $kanban.sections as sec}
																		{#if sec !== section}
																			<DropdownMenu.Item
																				on:click={() => {
																					moveTaskToSection(task, section, sec);
																				}}
																			>
																				<span>{sec.title}</span>
																			</DropdownMenu.Item>
																		{/if}
																	{/each}
																</DropdownMenu.SubContent>
															</DropdownMenu.Sub>
															<DropdownMenu.Item
																on:click={() => {
																	alertTitle = 'Are you sure?';
																	alertDescription =
																		'Deleting this Task will not be reversible. Do you still want to delete this?';
																	continueText = 'Delete Anyway';
																	isDestructive = true;
																	onClick = () => {
																		handleDeleteTask(task, section);
																	};
																	openGlobalPopUp.set(true);
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
										<Card.Title>
											<div class="inline-flex items-center">
												<div>{task.title}</div>
												<div
													style={`background-color: #${section.color};`}
													class="ml-2 size-2 rounded-full"
												></div>
											</div>
										</Card.Title>
										<Card.Description>
											<span>{task.description}</span>
											<TodosInNotes markdown={task.notes} />
											<div class="duedate mt-4 flex items-center">
												<Calendar class="mr-4 size-4 text-foreground" aria-label="true" />
												<span class="text-sm">{task.dueDate}</span>
											</div>
										</Card.Description>
									</Card.Header>
								</Card.Root>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<center class="w-full h-full flex items-center justify-center">
			<LoaderCircle class="size-20 animate-spin" />
		</center>
	{/if}
</div>

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
		max-width: 100%;
		width: 100%;
		display: grid;
		/* grid-template-columns: auto auto auto; */
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		gap: 2rem;
	}

	@media (max-width: 768px) {
		.topbar h1 {
			margin-left: 3rem;
		}
	}
</style>
