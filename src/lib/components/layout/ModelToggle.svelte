<!-- src/lib/components/layout/ModelToggle.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import Toggle from '#lib/components/ui/Toggle.svelte';
	import {
		canUseModels,
		modelPreference,
		toggleModelChoice
	} from '#lib/scripts/modelPreference.svelte.js';
</script>

{#if canUseModels()}
	<Toggle
		checked={modelPreference.choice === 'on'}
		label="3D models"
		ontoggle={toggleModelChoice}
	/>
{/if}
