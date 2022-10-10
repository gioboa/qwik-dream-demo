import { remotes } from '../../src/constants/remotes';

export async function onRequest({ request }) {
	const remoteTarget = remotes.menu;
	const newUrl = request.url.replace(
		'https://qwik-dream-demo.pages.dev/menu',
		remoteTarget
	);
	return await fetch(newUrl);
}
