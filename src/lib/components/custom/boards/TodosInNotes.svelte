<script lang="ts">
	import { parseToDos } from '$lib/utils';
	import { Progress } from '$lib/components/ui/progress/index.js';

	interface Props {
		markdown: string;
	}

	let { markdown }: Props = $props();

	let [max, value] = $derived(parseToDos(markdown));
</script>

{#if max}
	<div class="flex items-center justify-between w-full">
		<Progress {value} {max} class="w-[70%]" />
		<span class="text-sm text-muted-foreground">{value} / {max}</span>
	</div>
{/if}
