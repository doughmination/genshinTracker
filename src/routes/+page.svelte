<!-- src/routes/+page.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import { resolve } from '$app/paths';

	import type { PageProps } from './$types';

	import CharacterCard from '#lib/components/characters/CharacterCard.svelte';
	import Meta from '#lib/components/Meta.svelte';
	import { featuredCharacters } from '#lib/scripts/roster.js';

	let { data }: PageProps = $props();

	const roster = $derived(data.roster);
</script>

<Meta title="Genshin Tracker" description="Clove's personal Genshin Impact account tracker." />

<section class="homeHero">
	<p class="eyebrow">UID {roster.uid}</p>

	<h1>{roster.nickname}</h1>

	<dl class="ledger">
		<div class="card">
			<dt class="label">Adventure Rank</dt>
			<dd>{roster.player_level}</dd>
		</div>

		<div class="card">
			<dt class="label">Characters owned</dt>
			<dd>{roster.owned_count}<small> / {roster.total_count}</small></dd>
		</div>

		<div class="card">
			<dt class="label">Builds tracked</dt>
			<dd>{roster.tracked_count}</dd>
		</div>
	</dl>
</section>

<section class="homeFeatured">
	<h2>Featured builds</h2>

	<div class="cardGrid">
		{#each featuredCharacters(roster) as character (character.id)}
			<CharacterCard {character} />
		{:else}
			<p>No builds tracked yet.</p>
		{/each}
	</div>

	<p class="moreLink"><a href={resolve('/characters')}>All characters</a></p>
</section>
