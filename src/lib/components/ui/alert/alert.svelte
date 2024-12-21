<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { type Variant, alertVariants } from "./index.js";
	import { cn } from "$lib/components/utils.js";

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		variant?: Variant;
	};

	interface Props {
		class?: $$Props["class"];
		variant?: $$Props["variant"];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, variant = "default", children, ...rest }: Props = $props();
	
</script>

<div class={cn(alertVariants({ variant }), className)} {...rest} role="alert">
	{@render children?.()}
</div>
