import { getTargetUrl } from "@qwikdream/shared";
import { remotes } from "@qwikdream/shared";

export async function onRequest({ request }) {
	return await fetch(getTargetUrl(request, remotes.hero));
}
