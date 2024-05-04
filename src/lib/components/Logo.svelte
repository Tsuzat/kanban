<script lang="ts">
</script>

<a class="logo flex items-center" href="/">
	<div class="relative size-10">
		<div class="rect"></div>
		<div class="rect blur-rect z-10"></div>
	</div>
</a>

<style>
	.rect {
		position: absolute;
		width: 70%;
		height: 70%;
		z-index: 0;
		background: #3b82f6;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		transform: translate(10%, 10%);
		border-radius: 0.25rem;
		transition: all 500ms ease;
	}

	.blur-rect {
		z-index: 1;
		background: rgba(59, 130, 246, 0.5);
		transform: translate(30%, 30%);
		border: 0.5px solid #3b82f6;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		backdrop-filter: blur(0.25rem);
	}

	.logo:hover .rect {
		transform: translate(5%, 5%);
	}

	.logo:hover .blur-rect {
		transform: translate(35%, 35%);
	}

	.logo:active .rect {
		transform: translate(10%, 10%);
	}

	.logo:active .blur-rect {
		transform: translate(30%, 30%);
	}
</style>
