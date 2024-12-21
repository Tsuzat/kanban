<script lang="ts">
	import { Progress as ProgressPrimitive } from "bits-ui";
	import { cn } from "$lib/components/utils.js";

	type $$Props = ProgressPrimitive.Props;

	interface Props {
		class?: $$Props["class"];
		max?: $$Props["max"];
		value?: $$Props["value"];
		[key: string]: any
	}

	let { class: className = undefined, max = 100, value = undefined, ...rest }: Props = $props();
	
</script>

<ProgressPrimitive.Root
	class={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
	{...rest}
>
	<div
		class="h-full w-full flex-1 bg-primary transition-all"
		style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
	></div>
</ProgressPrimitive.Root>
