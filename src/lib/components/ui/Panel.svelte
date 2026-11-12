<!-- src/lib/components/ui/Panel.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		children
	}: {
		title: string;
		children: Snippet;
	} = $props();
</script>

<section class="panel card">
	<h2 class="label">{title}</h2>

	{@render children()}
</section>
