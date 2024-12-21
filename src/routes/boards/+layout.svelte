<script lang="ts">
	import NavBar from '$lib/components/custom/boards/NavBar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="app flex w-[calc(100dvw)] h-[calc(100dvh)]">
	<NavBar />
	{@render children?.()}
</div>
