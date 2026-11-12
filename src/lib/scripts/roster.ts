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
	[
		{
			id: '10000005',
			name: 'Aether'
		},
		{
			id: '10000007',
			name: 'Lumine'
		}
	]
];

// Drops the twin you did not pick, and fixes the total to match
export function withoutUnpickedTwins(roster: Roster): Roster {
	const ownedIds = new Set(
		roster.characters.filter((character) => character.owned).map((character) => character.id)
	);

	const unpickedIds = new Set<string>();

	for (const [first, second] of eitherOrPairs) {
		if (ownedIds.has(first.id) && !ownedIds.has(second.id)) unpickedIds.add(second.id);
		if (ownedIds.has(second.id) && !ownedIds.has(first.id)) unpickedIds.add(first.id);
	}

	const characters = roster.characters.filter((character) => !unpickedIds.has(character.id));

	return {
		...roster,
		characters,
		total_count: characters.length
	};
}

// For a URL that names the twin this account did not pick. Takes the roster after withoutUnpickedTwins.
export function unpickedTwinMessage(roster: Roster, slug: string): string | null {
	const rosterIds = new Set(roster.characters.map((character) => character.id));

	for (const [first, second] of eitherOrPairs) {
		for (const [asked, picked] of [
			[first, second],
			[second, first]
		]) {
			const askedIsMissing = characterSlug(asked.name) === slug && !rosterIds.has(asked.id);

			if (askedIsMissing && rosterIds.has(picked.id)) {
				return `${asked.name} is not enabled as you do not unlock both travellers, and the account uses ${picked.name}`;
			}
		}
	}

	return null;
}
