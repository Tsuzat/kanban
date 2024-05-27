<script lang="ts">
	import Logo from '$lib/components/custom/Logo.svelte';
	import Particles from '$lib/components/custom/Particles.svelte';
	import ToggleTheme from '$lib/components/custom/ToggleTheme.svelte';
	import { Button } from '$lib/components/ui/button';
	import { MoveRight } from '$lib/icons';
</script>

<Particles />
<div class="fixed right-0 top-0">
	<ToggleTheme />
</div>
<div class="app w-screen h-screen">
	<section
		class="flex flex-col items-center justify-center h-full sm:w-[55%] w-[90%] relative m-auto"
	>
		<Logo size={8} />
		<div class="text-3xl sm:text-5xl font-extrabold text-center">Effortless Kanban Boards</div>
		<div class="text-center">
			Streamline your team's workflow with our powerful kanban board app. Drag-and-drop tasks,
			collaborate in real-time, and stay on top of your projects.
		</div>
		<div>
			<Button variant="outline" class="mr-2">Explore Features</Button>
			<Button class="mt-4 text-white">Get Started <MoveRight class="ml-2" /></Button>
		</div>
	</section>
</div>

<style>
</style>
