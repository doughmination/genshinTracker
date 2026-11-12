<!-- src/lib/components/viewer/ModelScene.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import type { Object3D } from 'three';

	import { loadModel } from '#lib/scripts/modelLoader.js';

	let {
		modelUrl,
		accentColour,
		onload,
		onerror
	}: {
		modelUrl: string;
		accentColour: string;
		onload: () => void;
		onerror: () => void;
	} = $props();

	let model = $state.raw<Object3D | null>(null);

	$effect(() => {
		const request = loadModel(modelUrl);

		request.model
			.then((loaded) => {
				model = loaded;
				onload();
			})
			.catch(onerror);

		return request.cancel;
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 1.2, 4.2]} fov={35}>
	<OrbitControls
		enableDamping
		enablePan={false}
		minDistance={1.5}
		maxDistance={7}
		target={[0, 1, 0]}
	/>
</T.PerspectiveCamera>

<T.AmbientLight intensity={1.6} />
<T.DirectionalLight position={[2, 4, 3]} intensity={1.8} />

<!-- Rim light in the element colour -->
<T.DirectionalLight position={[-3, 2, -3]} intensity={2.5} color={accentColour} />

{#if model}
	<T is={model} />
{/if}
