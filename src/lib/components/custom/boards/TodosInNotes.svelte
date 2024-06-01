<script lang="ts">
	import { parseToDos } from '$lib/utils';
	import { Progress } from '$lib/components/ui/progress/index.js';

	export let markdown: string;

	$: [max, value] = parseToDos(markdown);
</script>

{#if max}
	<div class="flex items-center justify-between w-full">
		<Progress {value} {max} class="w-[70%]" />
		<span class="text-sm text-muted-foreground">{value} / {max}</span>
	</div>
{/if}
