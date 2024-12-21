<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="wrapper">
	{@render children?.()}
</div>

<style>
	.wrapper {
		position: relative;
		display: block;
		padding: 1.5px;
		overflow: hidden;
		z-index: 10;
		border-radius: 0.5rem;
	}
	.wrapper::before {
		content: '';
		width: 100%;
		height: 100%;
		z-index: 10;
		position: absolute;
		background: conic-gradient(#3b82f6 0deg, #3b82f6 0deg, transparent 80deg);
		animation: rotate 5s linear infinite;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg) scale(10);
		}
		100% {
			transform: rotate(-360deg) scale(10);
		}
	}
</style>
