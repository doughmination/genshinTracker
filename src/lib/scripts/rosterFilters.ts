/* src/lib/scripts/rosterFilters.ts
 * MIT — (c) Doughmination System®
 */

import { sortRoster } from '#lib/scripts/roster.js';
import type { ElementName, Rarity, RosterCharacter } from '#lib/types/api.js';

export type RosterSort = 'level' | 'nameAscending' | 'nameDescending' | 'rarity';

export type RosterFilters = {
	search: string;
	ownedOnly: boolean;
	// null means any
	element: ElementName | null;
	rarity: Rarity | null;
	sort: RosterSort;
};

export function defaultRosterFilters(): RosterFilters {
	return {
		search: '',
		ownedOnly: false,
		element: null,
		rarity: null,
		sort: 'level'
	};
}

export const sortOptions: { value: RosterSort; label: string }[] = [
	{
		value: 'level',
		label: 'Level, highest first'
	},
	{
		value: 'rarity',
		label: 'Rarity, 5★ first'
	},
	{
		value: 'nameAscending',
		label: 'Name, A to Z'
	},
	{
		value: 'nameDescending',
		label: 'Name, Z to A'
	}
];

export const elementOptions: ElementName[] = [
	'Pyro',
	'Hydro',
	'Anemo',
	'Electro',
	'Dendro',
	'Cryo',
	'Geo'
];

export const rarityOptions: Rarity[] = [5, 4];

export function isDefaultFilters(filters: RosterFilters): boolean {
	const defaults = defaultRosterFilters();

	return (
		filters.search.trim() === defaults.search &&
		filters.ownedOnly === defaults.ownedOnly &&
		filters.element === defaults.element &&
		filters.rarity === defaults.rarity &&
		filters.sort === defaults.sort
	);
}

function matches(character: RosterCharacter, filters: RosterFilters): boolean {
	const search = filters.search.trim().toLowerCase();

	if (search && !character.name.toLowerCase().includes(search)) return false;
	if (filters.ownedOnly && !character.owned) return false;
	if (filters.element && character.element !== filters.element) return false;
	if (filters.rarity && character.rarity !== filters.rarity) return false;

	return true;
}

function sortBy(characters: RosterCharacter[], sort: RosterSort): RosterCharacter[] {
	// Owned first, then level, then A–Z
	const byLevel = sortRoster(characters);

	if (sort === 'nameAscending') {
		return byLevel.sort((first, second) => first.name.localeCompare(second.name));
	}

	if (sort === 'nameDescending') {
		return byLevel.sort((first, second) => second.name.localeCompare(first.name));
	}

	if (sort === 'rarity') {
		// The sort is stable, so the level order holds inside each rarity
		return byLevel.sort((first, second) => second.rarity - first.rarity);
	}

	return byLevel;
}

export function applyRosterFilters(
	characters: RosterCharacter[],
	filters: RosterFilters
): RosterCharacter[] {
	return sortBy(
		characters.filter((character) => matches(character, filters)),
		filters.sort
	);
}
