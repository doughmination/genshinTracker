<!-- src/lib/components/characters/ArtifactsPanel.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import ArtifactCard from '#lib/components/characters/ArtifactCard.svelte';
	import Panel from '#lib/components/ui/Panel.svelte';
	import { setLabel, sortArtifacts, totalCritValue } from '#lib/scripts/build.js';
	import type { Artifact, ArtifactSet } from '#lib/types/api.js';

	let {
		artifacts,
		sets
	}: {
		artifacts: Artifact[];
		sets: ArtifactSet[];
	} = $props();
</script>

<Panel title="Artifacts">
	<div class="artifactsPanel">
		<div class="summary">
			{#if sets.length > 0}
				<ul class="sets">
					{#each sets as set (set.name)}
						<li>
							<span class="count">{setLabel(set, artifacts)}</span>
							{set.name}
						</li>
					{/each}
				</ul>
			{/if}

			{#if artifacts.length > 0}
				<p class="critTotal" title="Crit Value: CRIT Rate × 2 + CRIT DMG, from sub stats">
					<span class="label">Crit Value</span>
					{totalCritValue(artifacts).toFixed(1)}
				</p>
			{/if}
		</div>

		<ul class="pieces">
			{#each sortArtifacts(artifacts) as artifact (artifact.id)}
				<ArtifactCard {artifact} />
			{:else}
				<li class="empty">No artifacts equipped.</li>
			{/each}
		</ul>
	</div>
</Panel>
