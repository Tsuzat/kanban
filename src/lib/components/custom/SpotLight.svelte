<script lang="ts">
	import { mode } from 'mode-watcher';

	let dark = $derived($mode === 'dark');
</script>

<div class="spotlight" class:dark>
	<div></div>
	<div></div>
	<div></div>
</div>

<style>
	.spotlight {
		pointer-events: none;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		transition: filter 1s ease-in-out;
		height: 100%;
		width: 100vw;
		overflow: hidden;
	}
	.spotlight > div {
		border-radius: 0 0 50% 50%;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: 3rem;
		width: 100vw;
		height: 100%;
		background-image: conic-gradient(
			from 0deg at 50% -5%,
			transparent 45%,
			rgba(255, 104, 48, 0.3) 49%,
			rgba(73, 133, 236, 0.5) 50%,
			rgba(255, 115, 222, 0.3) 51%,
			transparent 55%
		);
		transform-origin: 50% 0;
		filter: blur(30px) opacity(1);
		z-index: -1;
		animation:
			load 2s ease-in-out forwards,
			loadrot 2s ease-in-out forwards,
			spotlight 21s ease-in-out infinite reverse;
	}
	.spotlight > div:nth-child(1) {
		rotate: 20deg;
		animation:
			load 2s ease-in-out forwards,
			loadrot 2s ease-in-out forwards,
			spotlight 17s ease-in-out infinite;
	}
	.spotlight > div:nth-child(2) {
		rotate: -20deg;
		animation:
			load 2s ease-in-out forwards,
			loadrot 2s ease-in-out forwards,
			spotlight 14s ease-in-out infinite;
	}
	@keyframes loadrot {
		0% {
			rotate: 0deg;
			scale: 0;
		}
		100% {
			scale: 1;
		}
	}
	@keyframes spotlight {
		0% {
			transform: rotateZ(0deg) scale(1);
			filter: blur(15px) opacity(0.5);
		}
		20% {
			transform: rotateZ(-1deg) scale(1.2);
			filter: blur(16px) opacity(0.6);
		}
		40% {
			transform: rotateZ(2deg) scale(1.3);
			filter: blur(14px) opacity(0.4);
		}
		60% {
			transform: rotateZ(-2deg) scale(1.2);
			filter: blur(15px) opacity(0.6);
		}
		80% {
			transform: rotateZ(1deg) scale(1.1);
			filter: blur(13px) opacity(0.4);
		}
		100% {
			transform: rotateZ(0deg) scale(1);
			filter: blur(15px) opacity(0.5);
		}
	}
	@keyframes load {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@media (max-width: 600px) {
		.spotlight > div {
			/* left: -3rem; */
			top: 4rem;
		}
	}

	.spotlight.dark > div {
		background-image: conic-gradient(
			from 0deg at 50% -5%,
			transparent 45%,
			rgba(124, 145, 182, 0.3) 49%,
			rgba(124, 145, 182, 0.5) 50%,
			rgba(124, 145, 182, 0.3) 51%,
			transparent 55%
		);
	}
</style>
