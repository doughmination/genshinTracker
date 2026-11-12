<!-- src/lib/components/characters/WeaponPanel.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import Panel from '#lib/components/ui/Panel.svelte';
	import { formatStat } from '#lib/scripts/format.js';
	import type { Weapon } from '#lib/types/api.js';

	let { weapon }: { weapon: Weapon } = $props();
</script>

<Panel title="Weapon">
	<div class="itemCard weaponPanel" data-rarity={weapon.rarity}>
		<div class="band">
			<p class="itemName">{weapon.name}</p>
			<p class="mainName">{weapon.base_stat.name}</p>
			<p class="mainValue">{formatStat(weapon.base_stat)}</p>

			<img class="bandIcon" src={weapon.icon_url} alt="" loading="lazy" />
		</div>

		<div class="body">
			<p class="levelTag">Lv. {weapon.level}</p>

			{#if weapon.sub_stat}
				<ul class="subStats">
					<li>
						<span>{weapon.sub_stat.name}</span>
						<span>{formatStat(weapon.sub_stat)}</span>
					</li>
				</ul>
			{/if}

			<p class="footnote">Refinement Rank {weapon.refinement}</p>
		</div>
	</div>
</Panel>
