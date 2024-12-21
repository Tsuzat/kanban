<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import type { Writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select';
	import * as Sheet from '$lib/components/ui/sheet';
	import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/components/utils';
	import { Calendar as CalendarIcon } from '$lib/icons';
	import { Calendar } from '$lib/components/ui/calendar';
	import { Textarea } from '$lib/components/ui/textarea';
	import { TaskPriority, type Task } from '$lib/localStore/types';
	import { Carta, MarkdownEditor } from 'carta-md';
	import { code } from '@cartamd/plugin-code';
	import '@fontsource-variable/fira-code';

	import '$lib/styles/discord.css';

	const dispatch = createEventDispatcher();

	const carta = new Carta({
		sanitizer: false,
		extensions: [code()]
	});

	let priorities: TaskPriority[] = [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH];

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	interface Props {
		task: Task;
		open: Writable<boolean>;
	}

	let { task = $bindable(), open }: Props = $props();

	let dateArray = task.dueDate.split('-');

	let value = $state(new CalendarDate(
		parseInt(dateArray[0]),
		parseInt(dateArray[1]),
		parseInt(dateArray[2])
	));
	let dueDate = $derived(value.toString());

	function onChange() {
		task.dueDate = dueDate;
		dispatch('callback', { task });
		open.set(false);
	}
</script>

<Sheet.Root bind:open={$open}>
	<Sheet.Content class="min-w-[95vw] sm:min-w-[50vw]">
		<Sheet.Header>
			<Sheet.Title>
				<input
					class="bg-transparent text-xl outline-none focus:border-none focus:outline-none"
					bind:value={task.title}
				/>
			</Sheet.Title>
		</Sheet.Header>
		<div class="grid w-full gap-2 py-4">
			<div class="grid grid-cols-4 items-center">
				<Label for="priority" class="0 text-left">Priority</Label>
				<Select.Root>
					<Select.Trigger class="w-[10rem]">
						<Select.Value placeholder={task.priority} />
					</Select.Trigger>
					<Select.Content>
						{#each priorities as prt}
							<Select.Item
								on:click={() => {
									task.priority = prt;
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
			<div class="grid grid-cols-4 items-center">
				<Label for="date" class="0 text-left">Due Date</Label>
				<Popover.Root>
					<Popover.Trigger asChild >
						{#snippet children({ builder })}
												<Button
								variant="outline"
								class={cn(
									'w-[10rem] justify-start text-left font-normal',
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
			<div class="grid grid-cols-4 items-center">
				<Label for="description" class="0 text-left">Description</Label>
				<Textarea id="description" class="w-[15rem] sm:w-[20rem]" bind:value={task.description} />
			</div>
		</div>
		<div>
			<Label>Notes</Label>
			<MarkdownEditor
				placeholder="Write your notes here..."
				mode="tabs"
				theme="discord"
				{carta}
				bind:value={task.notes}
			/>
		</div>
		<Sheet.Footer class="mt-4">
			<Button on:click={onChange} size="lg" class="my-2 sm:my-0">Save Changes</Button>
			<Sheet.Close asChild >
				{#snippet children({ builder })}
								<Button builders={[builder]} variant="outline" size="lg">Cancel</Button>
											{/snippet}
						</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
