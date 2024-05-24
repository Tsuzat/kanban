<script lang="ts">
	import { parseToDos } from '$lib/utils';
	import Progress from './ui/progress/progress.svelte';

	export let markdown: string;

	$: [max, value] = parseToDos(markdown);
</script>

{#if max}
	<div class="flex items-center justify-between">
		<Progress {value} {max} class="w-[70%]" />
		<span>{value} / {max} Tasks</span>
	</div>
{/if}
