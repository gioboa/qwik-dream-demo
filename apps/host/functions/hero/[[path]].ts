import { remotes } from '../../src/constants/remotes';

export async function onRequest({ request }) {
	const remoteTarget = remotes.hero;
	const newUrl = request.url.replace(
		'https://qwik-dream-demo.pages.dev/hero',
		remoteTarget
	);
	return await fetch(newUrl);
}
