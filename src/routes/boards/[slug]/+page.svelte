<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: kanban = data.kanban;
</script>

<p>{$kanban.id}</p>
