/* src/lib/api/roster.ts
 * MIT — (c) Doughmination System®
 */

import { error } from '@sveltejs/kit';

import { apiBase, genshinUid } from '#lib';
import { withoutUnpickedTwins } from '#lib/scripts/roster.js';
import type { ApiResponse, CharacterDetail, Roster } from '#lib/types/api.js';

type Fetcher = typeof fetch;

async function request<Data>(fetcher: Fetcher, path: string): Promise<Data> {
	const response = await fetcher(`${apiBase}${path}`);
	const body = (await response.json().catch(() => null)) as ApiResponse<Data> | null;

	if (body?.success) {
		return body.data;
	}

	const status = response.status >= 400 ? response.status : 502;
	const message = body ? body.error.message : 'The Genshin API did not answer properly';

	error(status, message);
}

export async function getRoster(fetcher: Fetcher): Promise<Roster> {
	const roster = await request<Roster>(fetcher, `/v2/genshin/roster/${genshinUid}`);

	return withoutUnpickedTwins(roster);
}

export function getCharacter(fetcher: Fetcher, heroId: string): Promise<CharacterDetail> {
	return request<CharacterDetail>(
		fetcher,
		`/v2/genshin/roster/${genshinUid}/${encodeURIComponent(heroId)}`
	);
}
