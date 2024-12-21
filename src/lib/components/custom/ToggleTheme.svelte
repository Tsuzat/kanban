<script lang="ts">
	import { Sun, Moon, Device } from '$lib/icons';
	import { resetMode, setMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild >
		{#snippet children({ builder })}
				<Button builders={[builder]} variant="ghost" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
					{/snippet}
		</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item on:click={() => setMode('light')}>
			<Sun class="mr-2 h-[1.2rem] w-[1.2rem]" /> <span>Light</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => setMode('dark')}>
			<Moon class="mr-2 h-[1.2rem] w-[1.2rem]" /> <span>Dark</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => resetMode()}>
			<Device class="mr-2 h-[1.2rem] w-[1.2rem]" /> <span>System</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
