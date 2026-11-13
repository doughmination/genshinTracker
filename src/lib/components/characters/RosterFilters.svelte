<!-- src/lib/components/characters/RosterFilters.svelte
	 MIT — (c) Doughmination System®
-->

<script lang="ts">
	import ElementIcon from '#lib/components/ui/ElementIcon.svelte';
	import Toggle from '#lib/components/ui/Toggle.svelte';
	import {
		defaultRosterFilters,
		elementOptions,
		isDefaultFilters,
		rarityOptions,
		sortOptions,
		type RosterFilters
	} from '#lib/scripts/rosterFilters.js';

	let { filters = $bindable() }: { filters: RosterFilters } = $props();
</script>

<div class="rosterFilters" role="search">
	<div class="filterRow">
		<label class="searchBox">
			<span class="visuallyHidden">Search characters by name</span>
			<input type="search" placeholder="Search by name" bind:value={filters.search} />
		</label>

		<label class="sortBox">
			<span class="label">Sort</span>

			<select bind:value={filters.sort}>
				{#each sortOptions as option (option.value)}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="filterRow">
		<Toggle
			checked={filters.ownedOnly}
			label="Owned only"
			ontoggle={() => (filters.ownedOnly = !filters.ownedOnly)}
		/>

		<div class="filterGroup" role="group" aria-label="Rarity">
			{#each rarityOptions as rarity (rarity)}
				<button
					class="button"
					type="button"
					aria-pressed={filters.rarity === rarity}
					onclick={() => (filters.rarity = filters.rarity === rarity ? null : rarity)}
				>
					{rarity}★
				</button>
			{/each}
		</div>

		<div class="filterGroup" role="group" aria-label="Element">
			{#each elementOptions as element (element)}
				<button
					class="button elementButton"
					type="button"
					data-element={element}
					aria-pressed={filters.element === element}
					onclick={() => (filters.element = filters.element === element ? null : element)}
				>
					<ElementIcon {element} characterName="" />
					{element}
				</button>
			{/each}
		</div>

		{#if !isDefaultFilters(filters)}
			<button class="button" type="button" onclick={() => (filters = defaultRosterFilters())}>
				Reset
			</button>
		{/if}
	</div>
</div>
