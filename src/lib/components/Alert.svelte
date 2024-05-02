<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils';
	import { toast } from 'svelte-sonner';

	export let title: string = 'Are you absolutely sure?';
	// export let button: string = 'Show Dialog';
	export let description: string =
		'This action cannot be undone. This will permanently delete your kanban board from local storage';
	export let onConfirm = () => {};
	export let contentClass: string = '';
	export let isDestructive: boolean = false;
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">
			<slot />
		</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content class={contentClass}>
		<AlertDialog.Header>
			<AlertDialog.Title>{title}</AlertDialog.Title>
			<AlertDialog.Description>{description}</AlertDialog.Description>
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
					onConfirm();
				}}>Continue</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
