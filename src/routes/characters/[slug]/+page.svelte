<!-- src/routes/characters/[slug]/+page.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import type { PageProps } from './$types';

	import ArtifactsPanel from '#lib/components/characters/ArtifactsPanel.svelte';
	import StatsPanel from '#lib/components/characters/StatsPanel.svelte';
	import TalentsPanel from '#lib/components/characters/TalentsPanel.svelte';
	import WeaponPanel from '#lib/components/characters/WeaponPanel.svelte';
	import Meta from '#lib/components/Meta.svelte';
	import ElementIcon from '#lib/components/ui/ElementIcon.svelte';
	import ModelPrompt from '#lib/components/viewer/ModelPrompt.svelte';
	import type ModelViewer from '#lib/components/viewer/ModelViewer.svelte';
	import { constellationSlots, formatDate, hasBuild } from '#lib/scripts/build.js';
	import { elementLabel } from '#lib/scripts/format.js';
	import { shouldAskAboutModels, wantsModels } from '#lib/scripts/modelPreference.svelte.js';
	import { loadModelViewer, modelUrl } from '#lib/scripts/viewer.js';

	let { data }: PageProps = $props();

	const character = $derived(data.character);

	let Viewer = $state<typeof ModelViewer | null>(null);

	// Id of the character whose model failed, so the next character gets a fresh try
	let failedId = $state<string | null>(null);

	// Id of the character whose model is on screen, the artwork fades out for it
	let loadedId = $state<string | null>(null);

	const showViewer = $derived(wantsModels() && Viewer !== null && failedId !== character.id);

	// The 3D code only downloads once the visitor has said yes
	$effect(() => {
		if (wantsModels() && !Viewer) {
			loadModelViewer().then((component) => (Viewer = component));
		}
	});
</script>

<Meta
	title={`${character.name} · Genshin Tracker`}
	description={`${character.name} on Clove's Genshin Impact account.`}
	image={character.icon_url}
/>

<article class="characterHero" data-element={character.element}>
	<div>
		<p class="eyebrow">
			<ElementIcon element={character.element} characterName={character.name} />
			{elementLabel(character.element)} · {character.rarity}★
		</p>

		<h1>{character.name}</h1>

		{#if character.owned}
			<p class="heroLevel">
				Lv. {character.level}

				{#if character.friendship !== null}
					<span class="friendship">Friendship {character.friendship}</span>
				{/if}
			</p>

			<p class="constellation">
				<span class="pips" aria-hidden="true">
					{#each constellationSlots as slot (slot)}
						<span class="pip" class:lit={slot <= character.constellation}></span>
					{/each}
				</span>
				Constellation {character.constellation}
			</p>
		{:else}
			<p class="heroLevel">Not owned</p>
		{/if}

		{#if character.talents}
			<div class="introPanel">
				<TalentsPanel talents={character.talents} />
			</div>
		{/if}
	</div>

	<!-- Fixed-size stage: artwork underneath, model on top once it has loaded -->
	<div class="stage">
		{#if character.art_url}
			<img
				class="art"
				class:hidden={showViewer && loadedId === character.id}
				src={character.art_url}
				alt={`${character.name} artwork`}
			/>
		{/if}

		{#if showViewer && Viewer}
			{#key character.id}
				<Viewer
					modelUrl={modelUrl(character.name)}
					label={`3D model of ${character.name}`}
					onload={() => (loadedId = character.id)}
					onerror={() => (failedId = character.id)}
				/>
			{/key}
		{:else if shouldAskAboutModels()}
			<ModelPrompt />
		{/if}
	</div>
</article>

{#if hasBuild(character)}
	{#if !character.tracked && character.build_saved_at}
		<p class="characterNotice card">
			Not in the showcase right now. This is the build saved on {formatDate(
				character.build_saved_at
			)}.
		</p>
	{/if}

	<div class="characterBuild" data-element={character.element}>
		{#if character.stats.length > 0}
			<StatsPanel stats={character.stats} />
		{/if}

		{#if character.weapon}
			<WeaponPanel weapon={character.weapon} />
		{/if}

		<div class="wide">
			<ArtifactsPanel artifacts={character.artifacts} sets={character.sets} />
		</div>
	</div>
{:else if character.owned}
	<p class="characterNotice card">
		No build data for {character.name} yet. It appears once the character is in the in-game Character
		Showcase.
	</p>
{/if}
