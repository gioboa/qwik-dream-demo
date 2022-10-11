import { getTargetUrl } from '../../../../libs/shared/cloudflare.utils';
import { remotes } from '../../../../libs/shared/remotes';

export async function onRequest({ request }) {
	return await fetch(getTargetUrl(request, remotes.menu));
}
