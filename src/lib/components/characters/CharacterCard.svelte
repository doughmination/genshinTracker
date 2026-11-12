<!-- src/lib/components/characters/CharacterCard.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import { resolve } from '$app/paths';

	import ElementIcon from '#lib/components/ui/ElementIcon.svelte';
	import { elementLabel } from '#lib/scripts/format.js';
	import { characterSlug } from '#lib/scripts/roster.js';
	import type { RosterCharacter } from '#lib/types/api.js';

	let { character }: { character: RosterCharacter } = $props();
</script>

<a
	class="characterCard"
	class:unowned={!character.owned}
	class:fiveStar={character.rarity === 5}
	href={resolve('/characters/[slug]', { slug: characterSlug(character.name) })}
	data-element={character.element}
>
	<div class="portrait">
		<img src={character.icon_url} alt="" width="256" height="256" loading="lazy" />

		<span class="elementPip">
			<ElementIcon element={character.element} characterName={character.name} />
		</span>
	</div>

	<div class="plate">
		<h2>{character.name}</h2>

		<p class="cardLevel">
			<span class="visuallyHidden">{elementLabel(character.element)},</span>
			{character.owned ? `Lv. ${character.level}` : 'Not owned'}
		</p>
	</div>
</a>
