import { remotes } from '../../../libs/shared/remotes';

export async function onRequest() {
	return await fetch(remotes.reviews.url);
}
