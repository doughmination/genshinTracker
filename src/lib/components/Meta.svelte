<!-- src/lib/components/Meta.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import { page } from '$app/state';

	import { websiteUrl } from '#lib';
	import { buildEmbedTag, buildStructuredDataTag, defaultImageUrl } from '#lib/scripts/meta.js';

	let {
		title,
		description,
		image = defaultImageUrl
	}: {
		title: string;
		description: string;
		image?: string;
	} = $props();

	const pageUrl = $derived(websiteUrl + page.url.pathname);

	const metaInput = $derived({
		title,
		description,
		pageUrl,
		isHome: page.url.pathname === '/',
		imageUrl: image
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={pageUrl} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content={image} />

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- built from page props, '<' escaped -->
	{@html buildEmbedTag(metaInput)}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- built from page props, '<' escaped -->
	{@html buildStructuredDataTag(metaInput)}
</svelte:head>
