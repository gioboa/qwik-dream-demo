import { getTargetUrl } from "@qwikdream/shared";
import { remotes } from "@qwikdream/shared";
import type { RequestEvent } from '@builder.io/qwik-city';

export async function onRequest({ request }: {request: RequestEvent}) {
	return await fetch(getTargetUrl(request, remotes.menu));
}
