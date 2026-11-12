/* src/lib/scripts/modelLoader.ts
 * MIT — (c) Doughmination System®
 */

import { Box3, type Object3D, Vector3 } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Every model is scaled to this height, feet on the ground
const targetHeight = 2;

export function fitToStage(object: Object3D): Object3D {
	const bounds = new Box3().setFromObject(object);
	const size = bounds.getSize(new Vector3());
	const centre = bounds.getCenter(new Vector3());
	const scale = targetHeight / (size.y || 1);

	object.scale.setScalar(scale);
	object.position.set(-centre.x * scale, -bounds.min.y * scale, -centre.z * scale);

	return object;
}

// Returns the fitted model, plus cancel() to call when the component goes away
export function loadModel(url: string) {
	let cancelled = false;

	const dracoLoader = new DRACOLoader().setDecoderPath('/draco/');
	const loader = new GLTFLoader().setDRACOLoader(dracoLoader);

	const model = new Promise<Object3D>((resolve, reject) => {
		loader.loadAsync(url).then(
			(gltf) => {
				if (!cancelled) resolve(fitToStage(gltf.scene));
			},
			(cause) => {
				if (!cancelled) reject(cause);
			}
		);
	});

	return {
		model,
		cancel() {
			cancelled = true;
			dracoLoader.dispose();
		}
	};
}
