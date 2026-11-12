<!-- src/routes/characters/+page.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import type { PageProps } from './$types';

	import CharacterCard from '#lib/components/characters/CharacterCard.svelte';
	import Meta from '#lib/components/Meta.svelte';
	import { sortRoster } from '#lib/scripts/roster.js';

	let { data }: PageProps = $props();
</script>

<Meta title="Characters · Genshin Tracker" description="Every character on Clove's account." />

<section class="rosterHead">
	<p class="eyebrow">Collection</p>

	<h1>Characters</h1>

	<p class="subtitle">
		{data.roster.owned_count} owned of {data.roster.total_count}
	</p>
</section>

<!-- TODO: search, filters, sorting -->

<div class="cardGrid">
	{#each sortRoster(data.roster.characters) as character (character.id)}
		<CharacterCard {character} />
	{:else}
		<p>Nothing to show yet.</p>
	{/each}
</div>
