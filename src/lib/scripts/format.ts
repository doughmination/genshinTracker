/* src/lib/scripts/format.ts
 * MIT — (c) Doughmination System®
 */

import type { ApiElement, Stat } from '#lib/types/api.js';

export function formatNumber(value: number): string {
	return Math.round(value).toLocaleString('en-GB');
}

// 39.0999 becomes '39.1%', 24894.18 becomes '24,894'
export function formatStat(stat: Stat): string {
	return stat.is_percent ? `${stat.value.toFixed(1)}%` : formatNumber(stat.value);
}

// The Traveler comes back as 'All'
export function elementLabel(element: ApiElement): string {
	return element === 'All' ? 'Traveler' : element;
}
