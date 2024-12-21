<script lang="ts">
	import type { Writable } from 'svelte/store';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { createEventDispatcher } from 'svelte';
	import { TaskPriority } from '$lib/localStore/types';
	import * as Popover from '$lib/components/ui/popover';
	import { Calendar as CalendarIcon } from '$lib/icons';
	import { cn } from '$lib/components/utils';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		type DateValue
	} from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Select from '$lib/components/ui/select';

	interface Props {
		open: Writable<boolean>;
	}

	let { open }: Props = $props();
	const dispatch = createEventDispatcher();

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();

	let title: string = $state('');
	let description: string = $state('');
	let value: DateValue = $state(new CalendarDate(year, month, day));
	let priority: TaskPriority = $state(TaskPriority.LOW);

	let dueDate = $derived(value?.toString());

	let priorities = [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH];

	function handleOnSubmit() {
		console.log(title, description, dueDate, priority);
		dispatch('callback', { title, description, dueDate, priority });
		open.set(false);
	}
</script>

<Dialog.Root bind:open={$open}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add New Task</Dialog.Title>
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
				<Label for="description" class="0 text-right">Description</Label>
				<Input id="description" type="text" bind:value={description} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="date" class="0 text-right">Due Date</Label>
				<Popover.Root>
					<Popover.Trigger asChild >
						{#snippet children({ builder })}
												<Button
								variant="outline"
								class={cn(
									'w-[280px] justify-start text-left font-normal',
									!dueDate && 'text-muted-foreground'
								)}
								builders={[builder]}
							>
								<CalendarIcon class="mr-2 h-4 w-4" />
								{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
							</Button>
																	{/snippet}
										</Popover.Trigger>
					<Popover.Content class="w-auto p-0">
						<Calendar bind:value initialFocus />
					</Popover.Content>
				</Popover.Root>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="priority" class="0 text-right">Priority</Label>
				<Select.Root>
					<Select.Trigger class="w-[10rem]">
						<Select.Value placeholder={priority} />
					</Select.Trigger>
					<Select.Content>
						{#each priorities as prt}
							<Select.Item
								on:click={() => {
									priority = prt;
								}}
								value={prt}
								label={prt}
							>
								<span>{prt}</span>
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
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
				disabled={title.length === 0 || description.length === 0 || value === undefined}
				on:click={handleOnSubmit}>Create Task</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
