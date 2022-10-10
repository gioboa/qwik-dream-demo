import { remotes } from '../src/constants/remotes';

export async function onRequest() {
	const remoteTarget = remotes.reviews;
	const res = await fetch(remoteTarget);
	const rawHtml = await res.text();
	const withStyleWorkaround = rawHtml.replace(
		'<link rel="stylesheet" href="/',
		`<link rel="stylesheet" href="${remoteTarget}/`
	);
	return new Response(withStyleWorkaround);
}
