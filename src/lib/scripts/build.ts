/* src/lib/scripts/build.ts
 * MIT — (c) Doughmination System®
 */

import type {
	Artifact,
	ArtifactSet,
	ArtifactSlot,
	CharacterDetail,
	Stat,
	Talents
} from '#lib/types/api.js';

export const constellationSlots = [1, 2, 3, 4, 5, 6];

// In-game order
export const slotOrder: ArtifactSlot[] = ['flower', 'plume', 'sands', 'goblet', 'circlet'];

export const slotLabels: Record<ArtifactSlot, string> = {
	flower: 'Flower of Life',
	plume: 'Plume of Death',
	sands: 'Sands of Eon',
	goblet: 'Goblet of Eonothem',
	circlet: 'Circlet of Logos'
};

export function sortArtifacts(artifacts: Artifact[]): Artifact[] {
	return [...artifacts].sort(
		(first, second) => slotOrder.indexOf(first.slot) - slotOrder.indexOf(second.slot)
	);
}

// The API caps a set at 4, so the real pieces are counted here. All five matching is a complete set.
export function setLabel(set: ArtifactSet, artifacts: Artifact[]): string {
	const pieces = artifacts.filter((artifact) => artifact.set_name === set.name).length;

	return pieces === slotOrder.length ? 'Complete set' : `${set.count}-piece`;
}

// True when there is anything to show in the build panels
export function hasBuild(character: CharacterDetail): boolean {
	return character.stats.length > 0 || character.weapon !== null || character.artifacts.length > 0;
}

// 1794528178128 becomes '12 November 2026'
export function formatDate(timestamp: number): string {
	return new Date(timestamp).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}

// Crit Value: CRIT Rate counts double, plus CRIT DMG. Sub stats only, as players count it.
export function critValue(subStats: Stat[]): number {
	let total = 0;

	for (const stat of subStats) {
		if (stat.name === 'CRIT Rate') total += stat.value * 2;
		if (stat.name === 'CRIT DMG') total += stat.value;
	}

	return total;
}

export function totalCritValue(artifacts: Artifact[]): number {
	return artifacts.reduce((total, artifact) => total + critValue(artifact.sub_stats), 0);
}

export function talentRows(talents: Talents) {
	return [
		{
			label: 'Normal Attack',
			level: talents.normal
		},
		{
			label: 'Elemental Skill',
			level: talents.skill
		},
		{
			label: 'Elemental Burst',
			level: talents.burst
		}
	];
}
