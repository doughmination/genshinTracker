/* src/lib/scripts/elements.ts
 * MIT — (c) Doughmination System®
 */

import type { ApiElement } from '#lib/types/api.js';

// The Traveler has no element symbol, each twin has its own shape instead
const travelerIcons: Record<string, string> = {
	Aether: '/elements/aether_all.webp',
	Lumine: '/elements/lumine_all.webp'
};

// Files live in static/elements. Returns null when there is no symbol to show.
// The Traveler shapes are thin line art and need thickening at small sizes
export function isLineArtIcon(element: ApiElement): boolean {
	return element === 'All';
}

export function elementIconUrl(element: ApiElement, characterName: string): string | null {
	if (element === 'All') {
		return travelerIcons[characterName] ?? null;
	}

	return `/elements/${element.toLowerCase()}.svg`;
}
