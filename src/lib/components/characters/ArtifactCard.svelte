<!-- src/lib/components/characters/ArtifactCard.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import { critValue, slotLabels } from '#lib/scripts/build.js';
	import { formatStat } from '#lib/scripts/format.js';
	import type { Artifact } from '#lib/types/api.js';

	let { artifact }: { artifact: Artifact } = $props();

	const cardCritValue = $derived(critValue(artifact.sub_stats));
</script>

<li class="itemCard" data-rarity={artifact.rarity}>
	<div class="band">
		<p class="itemName">{slotLabels[artifact.slot]}</p>
		<p class="mainName">{artifact.main_stat.name}</p>
		<p class="mainValue">{formatStat(artifact.main_stat)}</p>

		<img class="bandIcon" src={artifact.icon_url} alt="" loading="lazy" />
	</div>

	<div class="body">
		<p class="tags">
			<span class="levelTag">+{artifact.level}</span>

			{#if cardCritValue > 0}
				<span class="critTag" title="Crit Value: CRIT Rate × 2 + CRIT DMG">
					CV {cardCritValue.toFixed(1)}
				</span>
			{/if}
		</p>

		<ul class="subStats">
			{#each artifact.sub_stats as subStat (subStat.name)}
				<li>
					<span>{subStat.name}</span>
					<span>{formatStat(subStat)}</span>
				</li>
			{/each}
		</ul>

		<p class="footnote">{artifact.set_name}</p>
	</div>
</li>
