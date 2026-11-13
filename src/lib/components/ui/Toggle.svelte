<!-- src/lib/components/ui/Toggle.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	let {
		checked,
		label,
		ontoggle
	}: {
		checked: boolean;
		label: string;
		ontoggle: () => void;
	} = $props();
</script>

<button class="toggle" type="button" role="switch" aria-checked={checked} onclick={ontoggle}>
	<span class="track">
		<span class="thumb"></span>
	</span>

	{label}
</button>
