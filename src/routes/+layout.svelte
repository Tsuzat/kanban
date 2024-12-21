<script lang="ts">
	import '@fontsource-variable/dm-sans';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import Footer from '$lib/components/custom/Footer.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Jonbon - Organize Your Stuff</title>
</svelte:head>

<ModeWatcher />
<Toaster />
{@render children?.()}
<Footer />
