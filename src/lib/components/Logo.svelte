<script lang="ts">
</script>

<a class="logo flex items-center" href="/">
	<div class="flex p-2">
		<div class="rect"></div>
		<div class="rect blur-rect"></div>
	</div>
	<div class="kanban text-xl font-bold">Kanban</div>
</a>

<style>
	.kanban {
		position: relative;
		transform: translate(-20%);
	}

	.rect {
		display: block;
		width: 1.5rem;
		height: 1.5rem;
		background: #3b82f6;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 0.25rem;
		transition: all 500ms ease;
	}

	.blur-rect {
		background: rgba(59, 130, 246, 0.5);
		transform: translate(-80%, 20%);
		border: 0.5px solid #3b82f6;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		backdrop-filter: blur(0.25rem);
	}

	.logo:hover .rect {
		transform: translate(-5%, -5%);
	}

	.logo:hover .blur-rect {
		transform: translate(-75%, 25%);
	}

	.logo:active .rect {
		transform: translate(0%, 0%);
	}

	.logo:active .blur-rect {
		transform: translate(-80%, 20%);
	}
</style>
