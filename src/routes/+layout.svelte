<!-- src/routes/+layout.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import type { LayoutProps } from './$types';

	import { onMount } from 'svelte';

	import { onNavigate } from '$app/navigation';

	import '#lib/styles/index.css';

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
</svelte:head>

<Header />

<main class="wrap">
	{@render children()}
</main>

<Footer />
