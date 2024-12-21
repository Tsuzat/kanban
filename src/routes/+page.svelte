<script lang="ts">
	import { run } from 'svelte/legacy';

	import GlowingButton from '$lib/components/custom/GlowingButton.svelte';
	import Logo from '$lib/components/custom/Logo.svelte';
	// import Particles from '$lib/components/custom/Particles.svelte';
	import SpotLight from '$lib/components/custom/SpotLight.svelte';
	import ToggleTheme from '$lib/components/custom/ToggleTheme.svelte';
	import { Button } from '$lib/components/ui/button';
	import { GitHub, Moon, MoveRight, Sun } from '$lib/icons';
	import { features } from './data';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';
	import { Switch } from '$lib/components/ui/switch';

	import DemoImageDark from '$lib/demo_assets/demo_dark.webp?enhanced';
	import DemoImageLight from '$lib/demo_assets/demo_light.webp?enhanced';
	import DemoVideo from '$lib/demo_assets/demo_video.webm';

	let demoTheme;
	run(() => {
		demoTheme = $mode === 'dark';
	});

	onMount(() => {
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();
				document.querySelector(this.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
				});
			});
		});
	});
</script>

<div class="app">
	<div class="fixed right-0 top-0">
		<ToggleTheme />
	</div>
	<div class="fixed left-0 top-0">
		<Button
			size="icon"
			variant="link"
			class="text-white hover:bg-muted"
			href="https://github.com/jonellwood/kanban_new"
			target="_blank"
		>
			<GitHub class="size-5" />
		</Button>
	</div>
	<SpotLight />
	<div class="logo relative"></div>
	<section
		class="flex flex-col items-center sm:w-[55%] w-[90%] h-[calc(100dvh)] justify-around m-auto py-4"
	>
		<Logo size={4} />
		<div class="between-lines">Introducing</div>
		<div class="title text-7xl sm:text-8xl font-extrabold text-center">Jonbon</div>
		<div>
			<div class="text-3xl font-extrabold text-center my-2 sm:my-4 text-popover-foreground">
				Effortless Kanban Boards
			</div>
			<div class="text-center text-muted-foreground">
				Streamline your workflow with suckless, minimal, powerful and feature rich kanban board app.
				Drag-and-drop tasks, write extensive notes on tasks, and stay on top of your projects.
			</div>
		</div>
		<div class="flex items-center">
			<!-- <GlowingButton>
				<Button variant="outline" class="z-20 relative" href="#features">Explore Features</Button>
			</GlowingButton> -->
			<GlowingButton>
				<Button variant="outline" class="z-20 relative" href="/boards"
					>Get Started <MoveRight class="ml-2" /></Button
				>
			</GlowingButton>
		</div>
	</section>
	<!-- <section
		class="min-h-[calc(100dvh)] w-[90%] flex flex-col items-center justify-around sm:w-[55%] m-auto py-4"
		id="features"
	>
		<div class="between-lines">Features</div>
		<div class="text-3xl font-extrabold text-center">
			Streamline Your Workflow with Powerful Kanban Boards
		</div>
		<div class="text-center text-muted-foreground">
			Streamline Your Workflow with Powerful Kanban Boards Unlock your team's productivity with our
			feature-rich Kanban boards. Drag and drop tasks, customize views, collaborate in real-time,
			and automate your workflows.
		</div>
		<div class="mx-auto grid items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-2">
			{#each features as feature}
				<div class="hover:scale-105 group transition-all z-50">
					<Card.Root
						class="grid gap-1 group-hover:bg-muted z-30 relative bg-background transition-all"
					>
						<Card.Header>
							<Card.Title class="flex items-center">
								<feature.icon class="mr-4" />
								<span>{feature.name}</span>
							</Card.Title>
							<Card.Description class="text-start">{feature.description}</Card.Description>
						</Card.Header>
						<Card.Content></Card.Content>
					</Card.Root>
				</div>
			{/each}
		</div>
	</section> -->
	<!-- <section class="w-[90%] sm:w-[55%] m-auto py-4" id="demo">
		<div class="between-lines my-8">Demo</div>
		<div class="text-xl font-extrabold text-center text-muted-foreground my-8">
			A simple screenshot of the PWA (Progressive Web App)
		</div>
		<div class="demo-images my-8">
			<div class="toggle-demo-theme flex items-center justify-center w-full my-4">
				<Sun class="size-4 mr-4" />
				<Switch bind:checked={demoTheme} />
				<Moon class="size-4 ml-4" />
			</div>
			<enhanced:img
				src={DemoImageDark}
				data-dark={demoTheme}
				class="hidden data-[dark=true]:block border-muted border-2 rounded-lg"
				alt="Demo Image Dark"
			/>
			<enhanced:img
				src={DemoImageLight}
				data-dark={demoTheme}
				class="block data-[dark=true]:hidden border-muted border-2 rounded-lg"
				alt="Demo Image Light"
			/>
		</div>
		<div class="text-xl font-extrabold text-center text-muted-foreground my-8">
			A Demo Video of the PWA (Progressive Web App)
		</div>
		<div class="demo-video my-8">
			<video autoplay loop controls class="border-muted border-2 rounded-lg">
				<source src={DemoVideo} type="video/webm" />
				<track kind="captions" />
			</video>
		</div>
	</section> -->
	<div class="text-center text-sm">
		Made with 🧠 by <a class="text-primary" href="https://jonellwood.dev" target="_blank"
			>Jon Ellwood</a
		>
	</div>
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
