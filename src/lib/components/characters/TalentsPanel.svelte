<!-- src/lib/components/characters/TalentsPanel.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import Panel from '#lib/components/ui/Panel.svelte';
	import { talentRows } from '#lib/scripts/build.js';
	import type { Talents } from '#lib/types/api.js';

	let { talents }: { talents: Talents } = $props();
</script>

<Panel title="Talents">
	<dl class="talentsPanel">
		{#each talentRows(talents) as row (row.label)}
			<div class="talent">
				<dd><span>{row.level}</span></dd>
				<dt>{row.label}</dt>
			</div>
		{/each}
	</dl>
</Panel>
