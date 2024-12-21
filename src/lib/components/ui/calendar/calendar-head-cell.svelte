<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/components/utils.js";

	type $$Props = CalendarPrimitive.HeadCellProps;

	interface Props {
		class?: $$Props["class"];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<CalendarPrimitive.HeadCell
	class={cn("w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground", className)}
	{...rest}
>
	{@render children?.()}
</CalendarPrimitive.HeadCell>
