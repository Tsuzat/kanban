<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { scale } from "svelte/transition";
	import { cn, flyAndScale } from "$lib/components/utils.js";

	type $$Props = SelectPrimitive.ContentProps;

	interface Props {
		class?: $$Props["class"];
		sideOffset?: $$Props["sideOffset"];
		inTransition?: $$Props["inTransition"];
		inTransitionConfig?: $$Props["inTransitionConfig"];
		outTransition?: $$Props["outTransition"];
		outTransitionConfig?: $$Props["outTransitionConfig"];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = undefined,
		sideOffset = 4,
		inTransition = flyAndScale,
		inTransitionConfig = undefined,
		outTransition = scale,
		outTransitionConfig = {
		start: 0.95,
		opacity: 0,
		duration: 50,
	},
		children,
		...rest
	}: Props = $props();
	
</script>

<SelectPrimitive.Content
	{inTransition}
	{inTransitionConfig}
	{outTransition}
	{outTransitionConfig}
	{sideOffset}
	class={cn(
		"relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md focus:outline-none",
		className
	)}
	{...rest}
>
	<div class="w-full p-1">
		{@render children?.()}
	</div>
</SelectPrimitive.Content>
