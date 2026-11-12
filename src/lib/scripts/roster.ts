/* src/lib/scripts/roster.ts
 * MIT — (c) Doughmination System®
 */

import type { Roster, RosterCharacter } from '#lib/types/api.js';

// Display order: owned first, then level desc, then A–Z
export function sortRoster(characters: RosterCharacter[]): RosterCharacter[] {
	return [...characters].sort(
		(first, second) =>
			Number(second.owned) - Number(first.owned) ||
			(second.level ?? 0) - (first.level ?? 0) ||
			first.name.localeCompare(second.name)
	);
}

// Tracked characters are the ones with a full build
export function featuredCharacters(roster: Roster): RosterCharacter[] {
	return sortRoster(roster.characters.filter((character) => character.tracked));
}

// 'Hu Tao' becomes 'hu-tao', used in page URLs
export function characterSlug(characterName: string): string {
	return characterName
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function findBySlug(roster: Roster, slug: string): RosterCharacter | undefined {
	return roster.characters.find((character) => characterSlug(character.name) === slug);
}

// The game gives you one of each pair, never both
const eitherOrPairs = [
	// Aether, Lumine
	['10000005', '10000007']
];

// Drops the twin you did not pick, and fixes the total to match
export function withoutUnpickedTwins(roster: Roster): Roster {
	const ownedIds = new Set(
		roster.characters.filter((character) => character.owned).map((character) => character.id)
	);

	const unpickedIds = new Set<string>();

	for (const [firstId, secondId] of eitherOrPairs) {
		if (ownedIds.has(firstId) && !ownedIds.has(secondId)) unpickedIds.add(secondId);
		if (ownedIds.has(secondId) && !ownedIds.has(firstId)) unpickedIds.add(firstId);
	}

	const characters = roster.characters.filter((character) => !unpickedIds.has(character.id));

	return {
		...roster,
		characters,
		total_count: characters.length
	};
}
