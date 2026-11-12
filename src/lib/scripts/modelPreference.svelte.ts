/* src/lib/scripts/modelPreference.svelte.ts
 * MIT — (c) Doughmination System®
 */

// unset: the visitor has not been asked yet
export type ModelChoice = 'unset' | 'on' | 'off';

const storageKey = 'modelChoice';

// Phones and tablets never get 3D models, they lag
const mobileQuery = '(max-width: 48rem), (pointer: coarse)';

// Shared by every page. Only changed in the browser, never on the server.
export const modelPreference = $state({
	choice: 'unset' as ModelChoice,
	isMobile: false,
	ready: false
});

function readStoredChoice(): ModelChoice {
	try {
		const stored = localStorage.getItem(storageKey);

		return stored === 'on' || stored === 'off' ? stored : 'unset';
	} catch {
		// Storage can be blocked, then the visitor is simply asked again
		return 'unset';
	}
}

// Call once from the layout, in the browser. Returns the cleanup.
export function initModelPreference(): () => void {
	const media = matchMedia(mobileQuery);
	const updateMobile = () => (modelPreference.isMobile = media.matches);

	updateMobile();
	media.addEventListener('change', updateMobile);

	modelPreference.choice = readStoredChoice();
	modelPreference.ready = true;

	return () => media.removeEventListener('change', updateMobile);
}

export function setModelChoice(choice: ModelChoice): void {
	modelPreference.choice = choice;

	try {
		localStorage.setItem(storageKey, choice);
	} catch {
		// Choice still holds until the tab closes
	}
}

export function toggleModelChoice(): void {
	setModelChoice(modelPreference.choice === 'on' ? 'off' : 'on');
}

// False until the browser has loaded the stored choice
export function canUseModels(): boolean {
	return modelPreference.ready && !modelPreference.isMobile;
}

export function wantsModels(): boolean {
	return canUseModels() && modelPreference.choice === 'on';
}

export function shouldAskAboutModels(): boolean {
	return canUseModels() && modelPreference.choice === 'unset';
}
