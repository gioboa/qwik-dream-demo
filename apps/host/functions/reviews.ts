import { remotes } from '../src/constants/remotes';
import { getTargetFromRemoteName } from '../src/utils';

export async function onRequest() {
	const res = await fetch(remotes.reviews);
	const rawHtml = await res.text();
	const withStyleWorkaround = rawHtml.replace(
		'<link rel="stylesheet" href="/',
		`<link rel="stylesheet" href="${getTargetFromRemoteName('reviews')}/`
	);
	return new Response(withStyleWorkaround);
}
