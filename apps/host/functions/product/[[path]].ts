import { remotes } from '../../src/constants/remotes';

export async function onRequest({ request }) {
	const remoteTarget = remotes.product;
	const newUrl = request.url.replace(
		'https://qwik-dream-demo.pages.dev/product',
		remoteTarget
	);
	return await fetch(newUrl);
}
