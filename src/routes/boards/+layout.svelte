<script lang="ts">
	import NavBar from '$lib/components/custom/boards/NavBar.svelte';
	import { Toaster } from 'svelte-sonner';
</script>

<Toaster />
<div class="app flex w-[calc(100dvw)] h-[calc(100dvh)]">
	<NavBar />
	<slot />
</div>
