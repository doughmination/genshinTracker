<!-- src/lib/components/characters/StatsPanel.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import Panel from '#lib/components/ui/Panel.svelte';
	import { formatNumber, formatStat } from '#lib/scripts/format.js';
	import type { Stat } from '#lib/types/api.js';

	let { stats }: { stats: Stat[] } = $props();
</script>

<Panel title="Stats">
	<dl class="statsPanel">
		{#each stats as stat (stat.name)}
			<div class="row">
				<dt>{stat.name}</dt>

				<dd>
					{#if stat.base !== undefined && stat.added !== undefined}
						<span class="split">
							{formatNumber(stat.base)}
							<span class="added">+{formatNumber(stat.added)}</span>
						</span>
					{/if}

					{formatStat(stat)}
				</dd>
			</div>
		{/each}
	</dl>
</Panel>
