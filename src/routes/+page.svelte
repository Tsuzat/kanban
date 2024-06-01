<script lang="ts">
	import GlowingButton from '$lib/components/custom/GlowingButton.svelte';
	import Logo from '$lib/components/custom/Logo.svelte';
	import Particles from '$lib/components/custom/Particles.svelte';
	import SpotLight from '$lib/components/custom/SpotLight.svelte';
	import ToggleTheme from '$lib/components/custom/ToggleTheme.svelte';
	import { Button } from '$lib/components/ui/button';
	import { MoveRight } from '$lib/icons';
	import { features } from './data';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';

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
	<Particles />
	<div class="fixed right-0 top-0">
		<ToggleTheme />
	</div>
	<SpotLight />
	<div class="logo relative"></div>
	<section
		class="flex flex-col items-center sm:w-[55%] w-[90%] h-[calc(100dvh)] justify-around m-auto py-4"
	>
		<Logo size={4} />
		<div class="between-lines">Introducing</div>
		<div class="title text-7xl sm:text-8xl font-extrabold text-center">Kanban</div>
		<div>
			<div class="text-3xl font-extrabold text-center my-2 sm:my-4 text-popover-foreground">
				An Effortless Kanban Boards
			</div>
			<div class="text-center text-muted-foreground">
				Streamline your workflow with suckless, minimal, powerful and feature rich kanban board app.
				Drag-and-drop tasks, write extensive notes on tasks, and stay on top of your projects.
			</div>
		</div>
		<div class="flex items-center">
			<GlowingButton>
				<Button variant="outline" class="z-20 relative" href="#features">Explore Features</Button>
			</GlowingButton>
			<Button class="group text-white ml-4" href="/boards"
				>Get Started <MoveRight class="ml-2" /></Button
			>
		</div>
	</section>
	<section
		class="h-[calc(100dvh)] w-[90%] flex flex-col items-center justify-around sm:w-[55%] m-auto"
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
								<svelte:component this={feature.icon} class="mr-4" />
								<span>{feature.name}</span>
							</Card.Title>
							<Card.Description class="text-start">{feature.description}</Card.Description>
						</Card.Header>
						<Card.Content></Card.Content>
					</Card.Root>
				</div>
			{/each}
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
