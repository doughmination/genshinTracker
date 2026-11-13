/* src/lib/types/api.ts
 * MIT — (c) Doughmination System®
 */

// Written from real responses of /v2/genshin/roster, field names match the API

export type ElementName = 'Pyro' | 'Hydro' | 'Anemo' | 'Electro' | 'Dendro' | 'Cryo' | 'Geo';

// The Traveler comes back as 'All'
export type ApiElement = ElementName | 'All';

export type Rarity = 4 | 5;

export type ApiSuccess<Data> = {
	success: true;
	data: Data;
};

export type ApiFailure = {
	success: false;
	error: {
		code: string;
		message: string;
	};
};

export type ApiResponse<Data> = ApiSuccess<Data> | ApiFailure;

// GET /v2/genshin/roster/{uid}

export type RosterCharacter = {
	id: string;
	name: string;
	element: ApiElement;
	rarity: Rarity;
	icon_url: string;
	owned: boolean;
	// null when not owned
	level: number | null;
	// true when the full build is available
	tracked: boolean;
	last_seen: number | null;
};

export type Roster = {
	uid: string;
	nickname: string;
	player_level: number;
	// true when only the showcase characters are visible
	partial: boolean;
	stale: boolean;
	owned_count: number;
	tracked_count: number;
	total_count: number;
	characters: RosterCharacter[];
	updated_at: number;
};

// GET /v2/genshin/roster/{uid}/{heroId}

export type Stat = {
	name: string;
	value: number;
	is_percent: boolean;
	base?: number;
	added?: number;
};

export type Talents = {
	normal: number;
	skill: number;
	burst: number;
};

export type Weapon = {
	id: string;
	name: string;
	rarity: number;
	level: number;
	ascension: number;
	refinement: number;
	base_stat: Stat;
	// Not confirmed for weapons without a secondary stat
	sub_stat?: Stat | null;
	icon_url: string;
};

export type ArtifactSlot = 'flower' | 'plume' | 'sands' | 'goblet' | 'circlet';

export type Artifact = {
	id: string;
	name: string;
	set_name: string;
	slot: ArtifactSlot;
	rarity: number;
	level: number;
	main_stat: Stat;
	sub_stats: Stat[];
	icon_url: string;
};

export type ArtifactSet = {
	name: string;
	count: number;
};

// tracked false with a build means it is the last one seen before leaving the showcase
export type CharacterDetail = {
	id: string;
	name: string;
	element: ApiElement;
	rarity: Rarity;
	icon_url: string;
	art_url: string;
	updated_at: number;
	owned: boolean;
	tracked: boolean;
	last_seen: number | null;
	level: number | null;
	constellation: number;
	friendship: number | null;
	talents: Talents | null;
	stats: Stat[];
	weapon: Weapon | null;
	artifacts: Artifact[];
	sets: ArtifactSet[];
	// When the build was stored, null when none was ever seen
	build_saved_at: number | null;
};
