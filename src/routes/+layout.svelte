<script lang="ts">
	import '@fontsource-variable/dm-sans';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<svelte:head>
	<title>Kanban Board App - Organize Your Tasks Efficientl</title>
</svelte:head>

<ModeWatcher />
<Toaster />

<slot />
