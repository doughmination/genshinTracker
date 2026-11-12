<!-- src/lib/components/characters/ArtifactsPanel.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import ArtifactCard from '#lib/components/characters/ArtifactCard.svelte';
	import Panel from '#lib/components/ui/Panel.svelte';
	import { setLabel, sortArtifacts } from '#lib/scripts/build.js';
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

		<ul class="pieces">
			{#each sortArtifacts(artifacts) as artifact (artifact.id)}
				<ArtifactCard {artifact} />
			{:else}
				<li class="empty">No artifacts equipped.</li>
			{/each}
		</ul>
	</div>
</Panel>
