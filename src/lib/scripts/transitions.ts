/* src/lib/scripts/transitions.ts
 * MIT — (c) Doughmination System®
 */

import type { onNavigate } from '$app/navigation';

type PageNavigation = Parameters<Parameters<typeof onNavigate>[0]>[0];

// Cross-fade between pages where the browser supports view transitions.
// The animation itself lives in global.css.
export function pageTransition(navigation: PageNavigation): void | Promise<void> {
	if (!document.startViewTransition) return;

	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
}
