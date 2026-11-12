/* src/routes/characters/[slug]/+page.server.ts
 * MIT — (c) Doughmination System®
 */

import { error } from '@sveltejs/kit';

import { getCharacter, getRoster } from '#lib/api/roster.js';
import { findBySlug, unpickedTwinMessage } from '#lib/scripts/roster.js';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	// The API works with numeric ids, so the name in the URL is looked up in the roster first
	const roster = await getRoster(fetch);
	const rosterCharacter = findBySlug(roster, params.slug);

	if (!rosterCharacter) {
		const twinMessage = unpickedTwinMessage(roster, params.slug);

		// 418 for the Traveler twin this account did not pick, 404 for anything else
		error(twinMessage ? 418 : 404, twinMessage ?? 'Character not found');
	}

	return { character: await getCharacter(fetch, rosterCharacter.id) };
};
