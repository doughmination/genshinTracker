<!-- src/routes/+layout.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import type { LayoutProps } from './$types';

	import { onMount } from 'svelte';

	import { onNavigate } from '$app/navigation';

	import '#lib/styles/index.css';

	import { websiteUrl } from '#lib';

	import Footer from '#lib/components/layout/Footer.svelte';
	import Header from '#lib/components/layout/Header.svelte';
	import { initModelPreference } from '#lib/scripts/modelPreference.svelte.js';
	import { pageTransition } from '#lib/scripts/transitions.js';

	let { children }: LayoutProps = $props();

	onMount(initModelPreference);

	onNavigate(pageTransition);
</script>

<svelte:head>
	<link rel="icon" href="/icon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/favicon.png" />

	<!-- Embeds need a PNG, they do not accept SVG -->
	<meta property="og:site_name" content="Genshin Tracker" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{websiteUrl}/favicon.png" />
	<meta property="og:image:width" content="512" />
	<meta property="og:image:height" content="512" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<Header />

<main class="wrap">
	{@render children()}
</main>

<Footer />
