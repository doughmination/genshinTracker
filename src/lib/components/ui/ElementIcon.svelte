<!-- src/lib/components/ui/ElementIcon.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import { elementIconUrl, isLineArtIcon } from '#lib/scripts/elements.js';
	import type { ApiElement } from '#lib/types/api.js';

	let {
		element,
		characterName
	}: {
		element: ApiElement;
		characterName: string;
	} = $props();

	const iconUrl = $derived(elementIconUrl(element, characterName));
</script>

<span class="elementIcon">
	{#if iconUrl}
		<img class:lineArt={isLineArtIcon(element)} src={iconUrl} alt="" />
	{:else}
		<span class="diamond"></span>
	{/if}
</span>
