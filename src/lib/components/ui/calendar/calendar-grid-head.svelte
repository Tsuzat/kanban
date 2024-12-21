<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/components/utils.js";

	type $$Props = CalendarPrimitive.GridHeadProps;

	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<CalendarPrimitive.GridHead class={cn(className)} {...rest}>
	{@render children?.()}
</CalendarPrimitive.GridHead>
