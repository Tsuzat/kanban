<script lang="ts">
	import { particlesInit } from '@tsparticles/svelte';
	import { onMount } from 'svelte';
	import { loadSlim } from '@tsparticles/slim';

	let ParticlesComponent: any;

	onMount(async () => {
		const module = await import('@tsparticles/svelte');
		ParticlesComponent = module.default;
	});

	let particlesConfig = {
		particles: {
			color: {
				value: '#3b82f6'
			},
			links: {
				enable: true,
				blink: true,
				distance: 150,
				color: '#3b82f6',
				opacity: 0.1,
				width: 1
			},
			move: {
				enable: true
			},
			number: {
				value: 50
			},
			opacity: {
				value: 0.1,
				random: false,
				anim: {
					enable: false,
					speed: 1,
					opacity_min: 0.1,
					sync: false
				}
			}
		},
		interactivity: {
			detect_on: 'canvas',
			events: {
				onHover: {
					enable: true,
					mode: 'grab'
				},
				onClick: {
					enable: false,
					mode: 'push'
				},
				resize: true
			},
			modes: {
				grab: {
					distance: 143.5830348667469,
					line_linked: {
						opacity: 1
					}
				},
				bubble: {
					distance: 400,
					size: 40,
					duration: 2,
					opacity: 8,
					speed: 3
				},
				repulse: {
					distance: 200,
					duration: 0.4
				},
				push: {
					particles_nb: 4
				},
				remove: {
					particles_nb: 2
				}
			}
		}
	};

	let onParticlesLoaded = (event: any) => {
		event.detail.particles;
	};

	void particlesInit(async (engine) => {
		await loadSlim(engine);
	});
</script>

<svelte:component
	this={ParticlesComponent}
	id="tsparticles"
	options={particlesConfig}
	on:particlesLoaded={onParticlesLoaded}
/>
