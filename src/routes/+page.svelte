<script lang="ts">
	import GlowingButton from '$lib/components/custom/GlowingButton.svelte';
	import Logo from '$lib/components/custom/Logo.svelte';
	import Particles from '$lib/components/custom/Particles.svelte';
	import SpotLight from '$lib/components/custom/SpotLight.svelte';
	import ToggleTheme from '$lib/components/custom/ToggleTheme.svelte';
	import { Button } from '$lib/components/ui/button';
	import { MoveRight } from '$lib/icons';
</script>

<div class="app w-screen overflow-x-hidden">
	<Particles />
	<div class="fixed right-0 top-0">
		<ToggleTheme />
	</div>

	<section
		class="flex flex-col items-center sm:w-[55%] w-[90%] h-screen justify-around m-auto py-4"
	>
		<SpotLight />
		<div class="logo relative">
			<Logo size={4} />
		</div>
		<div class="between-lines">Introducing</div>
		<div class="title text-7xl sm:text-8xl font-extrabold text-center">Kanban</div>
		<div>
			<div class="text-xl sm:text-3xl font-extrabold text-center my-4">
				An Effortless Kanban Boards
			</div>
			<div class="text-center text-muted-foreground">
				Streamline your workflow with suckless, minimul, powerful and feature rich kanban board app.
				Drag-and-drop tasks, write extensive notes on tasks, and stay on top of your projects.
			</div>
		</div>
		<div class="flex items-center">
			<GlowingButton>
				<Button variant="outline" class="z-20 relative" href="#">Explore Features</Button>
			</GlowingButton>
			<Button class="group text-white ml-4" href="#">Get Started <MoveRight class="ml-2" /></Button>
		</div>
	</section>
</div>

<style>
	.title {
		width: fit-content;
		background: radial-gradient(
				2em 2em at 50% 50%,
				transparent calc(var(--p) - 2em),
				#fff calc(var(--p) - 1em),
				#fff calc(var(--p) - 0.4em),
				transparent var(--p)
			),
			linear-gradient(0deg, #6c95d5 30%, #3b82f6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-shadow: 0 2px 16px rgba(174, 207, 242, 0.24);
		--p: 0%;
		transition: --p 3s linear;
		animation: pulse 2s linear 1.2s infinite;
	}

	@keyframes pulse {
		0% {
			--p: 0%;
		}
		50% {
			--p: 300%;
		}
		100% {
			--p: 300%;
		}
	}
	@property --p {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 0%;
	}
</style>
