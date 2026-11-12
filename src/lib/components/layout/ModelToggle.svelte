<!-- src/lib/components/layout/ModelToggle.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import {
		canUseModels,
		modelPreference,
		toggleModelChoice
	} from '#lib/scripts/modelPreference.svelte.js';
</script>

{#if canUseModels()}
	<button
		class="button"
		type="button"
		aria-pressed={modelPreference.choice === 'on'}
		onclick={toggleModelChoice}
	>
		3D models: {modelPreference.choice === 'on' ? 'On' : 'Off'}
	</button>
{/if}
