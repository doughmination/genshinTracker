<!-- src/lib/components/viewer/ModelPrompt.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import { setModelChoice } from '#lib/scripts/modelPreference.svelte.js';
</script>

<div class="modelPrompt" role="group" aria-label="3D models">
	<p class="label">3D models</p>
	<p class="question">Load 3D models?</p>

	<p class="advice">
		Each model is about 1 MB. On a slow connection, keep them off. You can change this any time at
		the top of the page.
	</p>

	<div class="actions">
		<button class="button primary" type="button" onclick={() => setModelChoice('on')}>
			Turn on 3D
		</button>

		<button class="button" type="button" onclick={() => setModelChoice('off')}>
			Keep artwork
		</button>
	</div>
</div>
