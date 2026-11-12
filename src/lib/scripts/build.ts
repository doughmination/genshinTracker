/* src/lib/scripts/build.ts
 * MIT — (c) Doughmination System®
 */

import type { Artifact, ArtifactSet, ArtifactSlot, Talents } from '#lib/types/api.js';

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
