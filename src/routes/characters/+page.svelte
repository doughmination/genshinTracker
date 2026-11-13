<!-- src/routes/characters/+page.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import type { PageProps } from './$types';

	import CharacterCard from '#lib/components/characters/CharacterCard.svelte';
	import Meta from '#lib/components/Meta.svelte';
	import RosterFilters from '#lib/components/characters/RosterFilters.svelte';
	import { applyRosterFilters, defaultRosterFilters } from '#lib/scripts/rosterFilters.js';

	let { data }: PageProps = $props();

	let filters = $state(defaultRosterFilters());

	const shown = $derived(applyRosterFilters(data.roster.characters, filters));
</script>

<Meta title="Characters · Genshin Tracker" description="Every character on Clove's account." />

<section class="rosterHead">
	<p class="eyebrow">Collection</p>

	<h1>Characters</h1>

	<p class="subtitle">
		{data.roster.owned_count} owned of {data.roster.total_count}
	</p>
</section>

<RosterFilters bind:filters />

<p class="eyebrow" aria-live="polite">
	Showing {shown.length} of {data.roster.total_count}
</p>

<div class="cardGrid">
	{#each shown as character (character.id)}
		<CharacterCard {character} />
	{:else}
		<p class="rosterEmpty">No characters match.</p>
	{/each}
</div>
