<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { cn } from '$lib/components/utils';
	import { type Writable } from 'svelte/store';

	interface Props {
		alertTitle: string;
		alertDescription: string;
		continueText: string;
		isDestructive: boolean;
		onClick: () => void;
		open: Writable<boolean>;
	}

	let {
		alertTitle,
		alertDescription,
		continueText,
		isDestructive,
		onClick,
		open
	}: Props = $props();
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
