<!-- src/lib/components/viewer/ModelViewer.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { onMount } from 'svelte';

	import { readAccentColour, toggleFullscreen } from '#lib/scripts/viewer.js';

	import ModelScene from './ModelScene.svelte';

	let {
		modelUrl,
		label,
		onload,
		onerror
	}: {
		modelUrl: string;
		label: string;
		onload: () => void;
		onerror: () => void;
	} = $props();

	let viewer: HTMLDivElement;
	let loading = $state(true);
	let accentColour = $state('#d3bc8e');

	onMount(() => {
		accentColour = readAccentColour(viewer, accentColour);
	});

	function handleLoad() {
		loading = false;
		onload();
	}
</script>

<div class="modelViewer" bind:this={viewer} role="img" aria-label={label}>
	<Canvas>
		<ModelScene {modelUrl} {accentColour} onload={handleLoad} {onerror} />
	</Canvas>

	{#if loading}
		<p class="status" role="status">Loading model…</p>
	{/if}

	<button class="button fullscreenButton" type="button" onclick={() => toggleFullscreen(viewer)}>
		Fullscreen
	</button>
</div>
