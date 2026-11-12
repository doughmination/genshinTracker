<!-- src/routes/+error.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} · Genshin Tracker</title>
</svelte:head>

<h1>{page.status}</h1>

<p>{page.error?.message}</p>

<p><a href={resolve('/')}>Back home</a></p>
