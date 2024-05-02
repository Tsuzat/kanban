<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '@fontsource-variable/dm-sans';
	import '../app.pcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<svelte:head>
	<title>Kanban Board</title>
</svelte:head>

<ModeWatcher />
<Toaster />
<div class="flex h-screen w-full">
	<Navbar />
	<slot />
</div>
