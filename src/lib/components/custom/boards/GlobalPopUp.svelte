<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { cn } from '$lib/components/utils';
	import { type Writable } from 'svelte/store';
	export let alertTitle: string;
	export let alertDescription: string;
	export let continueText: string;
	export let isDestructive: boolean;
	export let onClick: () => void;

	export let open: Writable<boolean>;
</script>

<AlertDialog.Root bind:open={$open}>
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
					open.set(false);
				}}>{continueText}</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
