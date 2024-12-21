<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/components/utils.js";

	type $$Props = CalendarPrimitive.HeadingProps;

	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet<[any]>;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<CalendarPrimitive.Heading
	
	class={cn("text-sm font-medium", className)}
	{...rest}
>
	{#snippet children({ headingValue })}
		{#if children}{@render children({ headingValue, })}{:else}
			{headingValue}
		{/if}
	{/snippet}
</CalendarPrimitive.Heading>
