<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/components/utils.js";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	interface Props {
		class?: $$Props["class"];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
	{...rest}
	onclick={bubble('click')}
	onfocusin={bubble('focusin')}
	onfocusout={bubble('focusout')}
	onmouseenter={bubble('mouseenter')}
	onmouseleave={bubble('mouseleave')}
>
	{@render children?.()}
</div>
