<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/components/utils.js";

	type $$Props = CalendarPrimitive.CellProps;

	interface Props {
		date: $$Props["date"];
		class?: $$Props["class"];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { date, class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<CalendarPrimitive.Cell
	{date}
	class={cn(
		"relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50",
		className
	)}
	{...rest}
>
	{@render children?.()}
</CalendarPrimitive.Cell>
