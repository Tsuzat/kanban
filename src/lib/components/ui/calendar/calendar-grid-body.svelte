<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/components/utils.js";

	type $$Props = CalendarPrimitive.GridBodyProps;

	interface Props {
		class?: $$Props["class"];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<CalendarPrimitive.GridBody class={cn(className)} {...rest}>
	{@render children?.()}
</CalendarPrimitive.GridBody>
