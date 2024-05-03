<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '@fontsource-variable/dm-sans';
	import '../app.pcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Menu } from '$lib/icons';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Kanban Board</title>
</svelte:head>

<ModeWatcher />
<Toaster />
<div class="flex h-screen w-screen">
	<Navbar />
	<slot />
</div>
