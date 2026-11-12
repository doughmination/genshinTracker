/* src/lib/scripts/viewer.ts
 * MIT — (c) Doughmination System®
 */

import { rawBase } from '#lib';

// No three.js imports here, so pages can use this without loading the 3D code

// 'Hu Tao' becomes hutao.glb. Not every character has a model, so callers need a fallback.
export function modelUrl(characterName: string): string {
	const fileName = characterName.toLowerCase().replace(/[^a-z]/g, '');

	return `${rawBase}/models/${fileName}.glb`;
}

// Three.js only loads when this is called, in the browser
export async function loadModelViewer() {
	const module = await import('#lib/components/viewer/ModelViewer.svelte');

	return module.default;
}

// Picks up the element colour from the CSS theme
export function readAccentColour(element: HTMLElement, fallback: string): string {
	return getComputedStyle(element).getPropertyValue('--accent').trim() || fallback;
}

export function toggleFullscreen(element: HTMLElement): void {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		element.requestFullscreen();
	}
}
