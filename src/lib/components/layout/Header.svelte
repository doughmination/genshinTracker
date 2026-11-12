<!-- src/lib/components/layout/Header.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import ModelToggle from '#lib/components/layout/ModelToggle.svelte';
	import { isCurrentPath, navLinks } from '#lib/scripts/navigation.js';
</script>

<!-- Fixed-height page backdrop, so every page gets the same amount of background -->
<div class="backdrop" aria-hidden="true"></div>

<header class="siteHeader wrap">
	<a class="brand" href={resolve('/')}>
		<img src="/icon.svg" alt="" width="32" height="32" />
		<span class="brandName">Genshin Tracker</span>
	</a>

	<nav aria-label="Main">
		{#each navLinks as link (link.href)}
			<a
				href={resolve(link.href)}
				aria-current={isCurrentPath(link.href, page.url.pathname) ? 'page' : undefined}
			>
				{link.label}
			</a>
		{/each}
	</nav>

	<ModelToggle />
</header>
